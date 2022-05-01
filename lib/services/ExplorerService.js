class ExplorerService {
    static filterByMission(explorers, mission) {
        const explorersByMission = explorers.filter((explorer) => explorer.mission === mission);
        return explorersByMission;
    }

    static getAmountOfExplorersByMission(explorers, mission) {
        const AmountOfExplorersByMission = explorers.filter((explorer) => explorer.mission === mission);
        return AmountOfExplorersByMission.length;
    }

    static getExplorersUsernamesByMission(explorers, mission) {
        const ExplorersUsernamesByMission = explorers.filter((explorer) => explorer.mission === mission);
        const usernamesByMission = ExplorersUsernamesByMission.map((explorer) =>  explorer.githubUsername);
        return usernamesByMission;
    }
}

module.exports = ExplorerService;