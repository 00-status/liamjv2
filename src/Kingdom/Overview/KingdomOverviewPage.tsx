
import './kingdom-overview-page.css';
import { Page } from "../../SharedComponents/Page/Page";
import { useMemo, useState } from 'react';
import { Tile } from './Tile';
import { extractCenterGrid, generateWeightedTerrain } from './utli';

type Kingdom = { name: String, terrain: Terrain };
export type Terrain = { rowSize: number, columnSize: number, tiles: Array<Tile> };
export type Tile = { x: number, y: number, type: string };

const terrain = generateWeightedTerrain(11, 11);
const centerTerrain = extractCenterGrid(terrain, 3);

const kingdom: Kingdom = {
    name: "Camelot",
    terrain: centerTerrain
};

const KingdomOverviewPage = () => {
    const [orderedTiles, setOrderedTiles] = useState<Array<Tile>>([]);

    useMemo(() => {
        const tilesByCoords = kingdom.terrain.tiles.reduce((carry, tile) => {
            const key = `${tile.x}-${tile.y}`;
            carry[key] = tile;
    
            return carry;
        }, {} as {[key: string]: Tile} );

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
            <div className='kingdom-overview-page__grid' style={styles}>
                {orderedTiles.map(tile => <Tile key={tile.x + "-" + tile.y} type={tile.type} />)}
            </div>
        </div>
    </Page>;
};

export default KingdomOverviewPage;
