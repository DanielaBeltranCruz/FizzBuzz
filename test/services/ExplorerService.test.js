const ExplorerService = require("./../../lib/services/ExplorerService");
const Reader = require("./../../lib/utils/Reader")

describe("Tests para ExplorerService", () => {
    const explorers = Reader.readJsonFile("./explorers.json");

    test("Requerimiento 1: Calcular todos los explorers en una misión", () => {
        const explorersInNode = ExplorerService.filterByMission(explorers, "node");
        expect(explorersInNode.length).toBe(10);
        expect(explorersInNode[0]).toMatchObject({mission: "node"});
    });

    test("Requerimiento 2: Cantidad de explorers en node", () => {
        const explorers = Reader.readJsonFile("./explorers.json");
        const explorersInMission = ExplorerService.getAmountOfExplorersByMission(explorers, "node");
        console.log(explorersInMission);
        expect(explorersInMission).toBe(10);
    })
});