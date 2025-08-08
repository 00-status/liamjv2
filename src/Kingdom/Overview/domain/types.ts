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
