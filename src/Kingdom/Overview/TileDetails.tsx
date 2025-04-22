import { Card } from "../../SharedComponents/Card/Card";
import { Tile } from "./KingdomOverviewPage";

type Props = {
    tile: Tile;
};

export const TileDetails = (props: Props) => {
    const { tile } = props;

    return <Card title={tile.type}>
        <div>
            Terrain features
        </div>
        <div>
            Buildings
        </div>
    </Card>;
};
