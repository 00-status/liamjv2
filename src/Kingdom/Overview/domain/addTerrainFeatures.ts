import { getNeighboringTiles } from "../util";
import { Terrain, Tile, Trait } from "./types";

export const addTerrainFeatures = (terrain: Terrain): Terrain => {
    const tilesWithFeatures: Array<Tile> = terrain.tiles.map((tile) => {
        const neighboringTiles = getNeighboringTiles(tile.x, tile.y, terrain.tiles);

        const neighboringTilesTotals = neighboringTiles.reduce((carry, tile) => {
            const currentTile = carry[tile.type];
            if (currentTile) {
                carry[tile.type] = currentTile + 1;
            } else {
                carry[tile.type] = 1;
            }

            return carry;
        }, {} as {[key: string]: number|undefined});

        const traitsToAssign = traits.filter((trait) => {
            const { criteria } = trait;

            if (tile.type !== criteria.currentTileType && criteria.currentTileType !== null) {
                return false;
            }

            if ((Math.random() * 100) > criteria.percentChance) {
                return false;
            }

            const surroundingTileCriteria = trait.criteria.surroundingTileTypeCount;
            if (surroundingTileCriteria === null) {
                return true;
            }

            const total = neighboringTilesTotals[surroundingTileCriteria.type];

            if (!total) {
                return false;
            }

            return total >= surroundingTileCriteria.threshold;
        }).map(trait => trait.traitName);

        return { ...tile, traits: [...traitsToAssign] };
    });

    return {...terrain, tiles: tilesWithFeatures};
};

const traits: Array<Trait> = [
    {
        traitName: "Rich Soil",
        criteria: {
            currentTileType: "Prairie",
            surroundingTileTypeCount: {type: "Prairie", threshold: 3 },
            percentChance: 50
        },
    },
    {
        traitName: "Poor Soil",
        criteria: {
            currentTileType: "Mountain",
            surroundingTileTypeCount: null,
            percentChance: 100
        },
    },
    {
        traitName: "Resource Rich",
        criteria: {
            currentTileType: "Mountain",
            surroundingTileTypeCount: null,
            percentChance: 100
        },
    },
    {
        traitName: "Dense Woodland",
        criteria: {
            currentTileType: "Forest",
            surroundingTileTypeCount: {type: "Forest", threshold: 4 },
            percentChance: 50
        },
    },
];
