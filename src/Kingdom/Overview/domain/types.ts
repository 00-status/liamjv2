export type Kingdom = { name: String, terrain: Terrain };
export type Terrain = { rowSize: number, columnSize: number, tiles: Array<Tile> };
export type Tile = {
    id: string;
    x: number;
    y: number;
    type: string;
    traits: Array<string>;
};

export type Trait = {
    criteria: Criteria;
    traitName: string;
}
export type Criteria = {
    currentTileType: string|null;
    surroundingTileTypeCount: { type: string, threshold: number } | null;
    percentChance: number;
};

// TODO: Add resource production cadence.
// For example, a Stone Mine produces 2 Stone every 1 turn. We'll have to keep track of turns since the Stone Mine was created somehow.
// Tiles have Traits; Buildings produce Resources.
export type Building = {
    id: string;
    name: string;
    assignedTile?: string;
    requirements: Array<BuildingRequirements>;
};
type BuildingRequirements = {
    tileType: string | null;
    traitID: string | null;
    buildingName: string | null;
};

export type Resource = {
    id: string;
    label: string;
    count: number;
};
