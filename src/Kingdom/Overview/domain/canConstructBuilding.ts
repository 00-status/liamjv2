import { Building, Tile } from "./types";

export const canConstructBuilding = (
    buildingToConstruct: Building,
    tile: Tile,
    alreadyConstructedBuildings: Array<Building>
): boolean => {
    const requirements = buildingToConstruct?.requirements ?? [];
    const constructedNames = new Set(alreadyConstructedBuildings.map(building => building.name));

    for (const requirement of requirements) {
        if (requirement.tileType && tile.type !== requirement.tileType) {
            return false;
        }

        if (requirement.buildingName && !constructedNames.has(requirement.buildingName)) {
            return false;
        }

        if (requirement.traitID && !tile.traits.includes(requirement.traitID)) {
            return false;
        }
    }

    return true;
};