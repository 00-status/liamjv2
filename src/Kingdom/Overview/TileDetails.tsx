import { Card } from "../../SharedComponents/Card/Card";
import { Tile } from "./domain/types";

type Props = {
    tile: Tile;
    buildings: Array<string>;
};

export const TileDetails = (props: Props) => {
    const { tile, buildings } = props;

    return <Card title={tile.type}>
        {tile.traits.length > 0 &&
            <div>
                <h4>Terrain Traits</h4>
                <ul>
                    {tile.traits.map(trait => <li key={trait}>{trait}</li>)}
                </ul>
            </div>
        }
        {buildings.length > 0 &&
            <div>
                <h4>Buildings</h4>
                <ul>
                    {buildings.map(building => <li key={building}>{building}</li>)}
                </ul>
            </div>
        }
    </Card>;
};
