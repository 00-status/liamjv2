import { useMemo, useState } from 'react';

import './kingdom-overview-page.css';
import { Page } from "../../SharedComponents/Page/Page";
import { Tile } from './Tile';
import { extractCenterGrid, generateWeightedTerrain } from './util';
import { TileDetails } from './TileDetails';
import { Kingdom, Tile as TileType } from './domain/types';
import { addTerrainFeatures } from './domain/addTerrainFeatures';

const terrain = generateWeightedTerrain(15, 15);
const terrainWithFeatures = addTerrainFeatures(terrain);
const centerTerrain = extractCenterGrid(terrainWithFeatures, 3);

const kingdom: Kingdom = {
    name: "Camelot",
    terrain: centerTerrain
};

const KingdomOverviewPage = () => {
    const [orderedTiles, setOrderedTiles] = useState<Array<TileType>>([]);
    const [currentTile, setCurrentTile] = useState<TileType|null>(null);

    useMemo(() => {
        const tilesByCoords = kingdom.terrain.tiles.reduce((carry, tile) => {
            const key = `${tile.x}-${tile.y}`;
            carry[key] = tile;
    
            return carry;
        }, {} as {[key: string]: TileType} );

        const orderedTiles = [];
        for (let y = 0; y < kingdom.terrain.columnSize; y++) {
            for (let x = 0; x < kingdom.terrain.rowSize; x++) {
                const tile = tilesByCoords[`${x}-${y}`];
                if (tile) {
                    orderedTiles.push(tile);
                }
            }
        }

        setOrderedTiles(orderedTiles);
    }, [kingdom]);

    const styles = { "gridTemplateColumns": Array(kingdom.terrain.columnSize).fill("1fr").join(" ") };

    return <Page title="Kingdom" routes={[]}>
        <div className='kingdom-overview-page'>
            <h1>Overview</h1>
            <div className='kingdom-overview-page__content'>
                <div className='kingdom-overview-page__grid' style={styles}>
                    {orderedTiles.map(tile => {
                        return <Tile
                            key={tile.x + "-" + tile.y}
                            type={tile.type}
                            onClick={() => setCurrentTile({...tile})} />;
                    })}
                </div>
                <div className='kingdom-overview-page__tile-details'>
                    {currentTile && <TileDetails tile={currentTile} buildings={[]} />}
                </div>
            </div>
        </div>
    </Page>;
};

export default KingdomOverviewPage;
