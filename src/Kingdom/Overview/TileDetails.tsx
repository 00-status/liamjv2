import { useState } from "react";
import { Card } from "../../SharedComponents/Card/Card";
import { Tile } from "./domain/types";
import { Button } from "../../SharedComponents/Button/Button";
import { AddBuildingModal } from "./AddBuildingModal";

type Props = {
    tile: Tile;
    buildings: Array<string>;
};

export const TileDetails = (props: Props) => {
    const { tile, buildings } = props;

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModalButton = <Button onClick={() => setIsModalOpen(true)}>Construct buildings</Button>
    return <>
        <Card title={tile.type} button={openModalButton}>
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
        </Card>
        <AddBuildingModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={(buildingName) => console.log(buildingName)}
        />
    </>;
};
