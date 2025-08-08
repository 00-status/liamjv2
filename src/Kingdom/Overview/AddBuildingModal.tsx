import { useState } from "react";

import { Button } from "../../SharedComponents/Button/Button";
import { Dropdown } from "../../SharedComponents/Dropdown/Dropdown";
import { Modal } from "../../SharedComponents/Modal/Modal";
import { Building, Tile } from "./domain/types";
import { canConstructBuilding } from "./domain/canConstructBuilding";
import { buildings } from "./domain/constants";

type Props = {
    isOpen: boolean;
    tile: Tile;
    alreadyConstructedBuildings: Array<Building>;
    onClose: () => void;
    onSubmit: (building: Building) => void;
};

export const AddBuildingModal = (props: Props) => {
    const {isOpen, tile, alreadyConstructedBuildings, onClose, onSubmit} = props;

    const [buildingName, setBuildingName] = useState<string>("");

    const buildingNames = buildings
        .filter(building => canConstructBuilding(building, tile, alreadyConstructedBuildings))
        .map(building => ({label: building.name, value: building.id}));
    buildingNames.unshift({ label: "", value: "" });

    const submitModal = () => {
        const buildingToConstruct = buildings.find((building) => building.id === buildingName);

        if (!buildingToConstruct) {
            throw new Error("Unable to find building!");
        }

        onSubmit(buildingToConstruct);
        setBuildingName("");
        onClose();
    };

    const submitButton = <Button disabled={!Boolean(buildingName)} onClick={submitModal}>Submit</Button>;
    return <Modal isOpen={isOpen} title={"Add Building"} onClose={onClose} footer={submitButton}>
        <Dropdown
            id="modal-building-construct"
            label="Construct Buildings"
            defaultValue={buildingName}
            options={buildingNames}
            onOptionSelect={(value) => setBuildingName(value)}
        />
    </Modal>
};
