import { Card } from "../../SharedComponents/Card/Card";
import { Tile } from "./domain/types";

type Props = {
    tile: Tile;
};

export const TileDetails = (props: Props) => {
    const { tile } = props;

    return <Card title={tile.type}>
        <div>
            Terrain Traits
            {tile.traits.map(trait => <div key={trait}>{trait}</div>)}
        </div>
        <div>
            Buildings
        </div>
    </Card>;
};
