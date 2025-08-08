import { Building } from "./types";

export const buildings: Array<Building> = [
    {
        id: "mine",
        name: "Mine",
        requirements: [
            { tileType: "Mountain", traitID: null, buildingName: null }
        ]
    },
    {
        id: "farm",
        name: "Farm",
        requirements: [
            { tileType: "Prairie", traitID: null, buildingName: null }
        ]
    },
    {
        id: "lumber_mill",
        name: "Lumber Mill",
        requirements: [
            { tileType: "Forest", traitID: null, buildingName: null }
        ]
    },
];
