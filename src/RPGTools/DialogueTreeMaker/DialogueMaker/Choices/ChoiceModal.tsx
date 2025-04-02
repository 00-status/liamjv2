import { useEffect, useState } from "react";

import { Modal } from "../../../../SharedComponents/Modal/Modal";
import { TextInput } from "../../../../SharedComponents/TextInput/TextInput";
import { Choice } from "../../domain/types";
import { Button } from "../../../../SharedComponents/Button/Button";

type Props = {
    choice: Choice|null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (choice: Choice) => void;
};

export const ChoiceModal = (props: Props) => {
    const {choice, isOpen, onClose, onSave} = props;

    const [conditionID, setConditionID] = useState<string|null>(choice?.conditionID ?? null);
    const [nextDialogueID, setNextDialogueID] = useState<string|null>(choice?.nextDialogueID ?? null);
    const [shortDescription, setShortDescription] = useState<string|null>(choice?.shortDescription ?? null);

    useEffect(() => {
        setConditionID(choice?.id ?? null);
        setNextDialogueID(choice?.nextDialogueID ?? null);
        setShortDescription(choice?.shortDescription ?? null);
    }, [choice]);

    const onSubmit = () => {
        if (!nextDialogueID || !shortDescription) {
            return;
        }

        const newChoice: Choice = {
            id: choice?.id ?? crypto.randomUUID(),
            conditionID,
            nextDialogueID,
            shortDescription
        };

        onSave(newChoice);
        setConditionID(null);
        setNextDialogueID(null);
        setShortDescription(null);
        onClose();
    };

    const submitButton = <Button onClick={onSubmit}>Save</Button>

    return <Modal title="Choice" isOpen={isOpen} onClose={onClose} footer={submitButton}>
        <div>
            <div>
                <TextInput
                    id="modal-condition-id"
                    label="Condition ID"
                    value={conditionID ?? ""}
                />
                <TextInput
                    id="modal-condition-next-dialogue-id"
                    label="Next Dialogue ID"
                    value={nextDialogueID ??""}
                />
            </div>
            <TextInput
                id="modal-condition-short-description"
                label="Short Description"
                value={shortDescription ?? ""}
            />
            <hr className="divider" />
        </div>
    </Modal>;
};
