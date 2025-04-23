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
                Terrain Traits
                {tile.traits.map(trait => <div key={trait}>{trait}</div>)}
            </div>
        }
        {buildings.length > 0 &&
            <div>
                Buildings
                {buildings.map(building => <div>{building}</div>)}
            </div>
        }
    </Card>;
};
