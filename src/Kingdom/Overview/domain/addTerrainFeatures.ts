import { getNeighboringTiles } from "../util";
import { Terrain, Tile } from "./types";

export const addTerrainFeatures = (terrain: Terrain): Terrain => {
    const tilesWithFeatures: Array<Tile> = terrain.tiles.map((tile) => {
        const neighboringTiles = getNeighboringTiles(tile.x, tile.y, terrain.tiles);

        return { ...tile };
    });

    return {...terrain, tiles: tilesWithFeatures};
};

// Adding terrain features
//      criteria:
//          surrounding tile types.
//          percent chance to happen.
//          current tile type.
// If the criteria is true, then the trait is applied.
// Example:
//      If there are three surrounding Prairie tiles, and the current tile is a prairie, and we "rolled" over 70% then
//          the Prairie has the "Rich Soil" trait. 
