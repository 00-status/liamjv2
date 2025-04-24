import { useState } from "react";
import { Button } from "../../SharedComponents/Button/Button";
import { Dropdown } from "../../SharedComponents/Dropdown/Dropdown";
import { Modal } from "../../SharedComponents/Modal/Modal";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (buildingName: string) => void;
};

export const AddBuildingModal = (props: Props) => {
    const {isOpen, onClose, onSubmit} = props;

    const [buildingName, setBuildingName] = useState<string>("");

    const submitModal = () => {
        onSubmit(buildingName);
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

const buildingNames = [
    { label: "", value: "" },
    { label: "Farm", value: "farm" },
    { label: "Lumber Mill", value: "lumber_mill" },
    { label: "Mine", value: "mine" },
];
