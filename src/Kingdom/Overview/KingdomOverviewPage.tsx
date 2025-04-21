
import './kingdom-overview-page.css';
import { Page } from "../../SharedComponents/Page/Page";
import { useMemo, useState } from 'react';
import { Tile } from './Tile';

type Kingdom = { name: String, terrain: Terrain };
type Terrain = { rowSize: number, columnSize: number, tiles: Array<Tile> };
export type Tile = { x: number, y: number, type: string };

// TODO: Instead of expanding the kingdom's terrain when the kingdom grows
// we could instead generate a larger 7x7 grid and only display necessary tiles.

const kingdom: Kingdom = {
    name: "Camelot",
    terrain: {
        rowSize: 3,
        columnSize: 3,
        tiles: [
            { x: 1, y: 1, type: "Prairie" },
            { x: 2, y: 1, type: "Prairie" },
            { x: 3, y: 1, type: "Prairie" },
            { x: 1, y: 2, type: "Forest" },
            { x: 2, y: 2, type: "Forest" },
            { x: 3, y: 2, type: "Forest" },
            { x: 1, y: 3, type: "Mountain" },
            { x: 2, y: 3, type: "Mountain" },
            { x: 3, y: 3, type: "Mountain" },
        ]
    }
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
        for (let y = 1; y <= kingdom.terrain.columnSize; y++) {
            for (let x = 1; x <= kingdom.terrain.rowSize; x++) {
                const tile = tilesByCoords[`${x}-${y}`];
                if (tile) {
                    orderedTiles.push(tile);
                }
            }
        }

        setOrderedTiles(orderedTiles);
    }, [kingdom]);

    return <Page title="Kingdom" routes={[]}>
        <div className='kingdom-overview-page'>
            <div className='kingdom-overview-page__grid'>
                {orderedTiles.map(tile => <Tile key={tile.x + "-" + tile.y} type={tile.type} />)}
            </div>
        </div>
    </Page>;
};

export default KingdomOverviewPage;
