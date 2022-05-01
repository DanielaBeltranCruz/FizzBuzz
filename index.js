const Reader = require("./lib/utils/Reader");
const ExplorerService = require("./lib/services/ExplorerService");
const FizzbuzzService = require("./lib/services/FizzbuzzService");

const explorers = Reader.readJsonFile("explorers.json"); // esto regresa la lista de explorers del archivo

//console.log(explorers)

// Aplicación del ExplorerService sobre la lista de explorers
console.log(ExplorerService.filterByMission(explorers, "node"));
console.log(ExplorerService.getAmountOfExplorersByMission(explorers, "node"));
console.log(ExplorerService.getExplorersUsernamesByMission(explorers, "node"));

// Validaciones
const explorer = {score: 15};
console.log(FizzbuzzService.applyValidationInExplorer(explorer));