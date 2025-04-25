export type Kingdom = { name: String, terrain: Terrain };
export type Terrain = { rowSize: number, columnSize: number, tiles: Array<Tile> };
export type Tile = {
    id: string;
    x: number;
    y: number;
    type: string;
    traits: Array<string>;
};

export type Criteria = {
    currentTileType: string|null;
    surroundingTileTypeCount: { type: string, threshold: number } | null;
    percentChance: number;
};

export type Trait = {
    criteria: Criteria;
    traitName: string;
}

export type Building = {
    name: string;
    assignedTile: string;
};

export type Resource = {
    id: string;
    label: string;
    count: number;
};
