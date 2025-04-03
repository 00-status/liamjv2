import { useEffect, useState, Fragment } from "react";

import './choice-modal.css';
import { Modal } from "../../../../SharedComponents/Modal/Modal";
import { TextInput } from "../../../../SharedComponents/TextInput/TextInput";
import { Choice, ConditionOutcome } from "../../domain/types";
import { Button } from "../../../../SharedComponents/Button/Button";

type Props = {
    choice: Choice|null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (choice: Choice) => void;
};

// ConditionOutcomes
//      Add ConditionOutcomes array to Choice ✅
//      update uploader
//      update local storage storer
//      add condition outcomes to choices modal
//      Update validator

export const ChoiceModal = (props: Props) => {
    const {choice, isOpen, onClose, onSave} = props;

    const [conditionID, setConditionID] = useState<string|null>(choice?.conditionID ?? null);
    const [nextDialogueID, setNextDialogueID] = useState<string|null>(choice?.nextDialogueID ?? null);
    const [shortDescription, setShortDescription] = useState<string|null>(choice?.shortDescription ?? null);
    const [conditionOutcomes, setConditionOutcomes] = useState<Array<ConditionOutcome>>(
        choice?.conditionOutcomes ?? []
    );

    const [conditionOutcomeID, setConditionOutcomeID] = useState<string|null>(null);
    const [conditionName, setConditionName] = useState<string|null>(null);
    const [addingOrRemoving, setAddingOrRemoving] = useState<string|null>(null);

    useEffect(() => {
        setConditionID(choice?.conditionID ?? null);
        setNextDialogueID(choice?.nextDialogueID ?? null);
        setShortDescription(choice?.shortDescription ?? null);
    }, [choice]);

    const addConditionOutcome = () => {
        if (!conditionOutcomeID || !conditionName || !addingOrRemoving) {
            return;
        }

        const conditionOutcomesCopy = [...conditionOutcomes];

        conditionOutcomesCopy.push({
            id: conditionOutcomeID,
            conditionName,
            addingOrRemoving
        });

        setConditionOutcomes(conditionOutcomesCopy);
    };

    const onSubmit = () => {
        if (!nextDialogueID || !shortDescription) {
            return;
        }

        const newChoice: Choice = {
            id: choice?.id ?? crypto.randomUUID(),
            conditionID,
            nextDialogueID,
            shortDescription,
            conditionOutcomes
        };

        onSave(newChoice);
        setConditionID(null);
        setNextDialogueID(null);
        setShortDescription(null);
        onClose();
    };

    const submitButton = <Button onClick={onSubmit}>Save</Button>

    return <Modal title="Choice" isOpen={isOpen} onClose={onClose} footer={submitButton}>
        <div className="choice-modal">
            <div className="choice-modal__inline-form">
                <TextInput
                    id="modal-condition-id"
                    label="Condition ID"
                    value={conditionID ?? ""}
                    onChange={(value) => {
                        setConditionID(value ?? null);
                    }}
                />
                <TextInput
                    id="modal-condition-next-dialogue-id"
                    label="Next Dialogue ID"
                    value={nextDialogueID ??""}
                    onChange={(value) => {
                        setNextDialogueID(value ?? null);
                    }}
                />
            </div>
            <TextInput
                id="modal-condition-short-description"
                label="Short Description"
                value={shortDescription ?? ""}
                onChange={(value) => {
                    setShortDescription(value ?? null);
                }}
            />
            <h3>Condition Outcomes</h3>
            <div className="choice-modal__condition-outcome-form">
                <TextInput
                    id="modal-condition-outcome-add-remove"
                    label="Add/Remove"
                    placeholder="Add/Remove"
                    value={addingOrRemoving ?? ""}
                    onChange={(value) => {
                        setAddingOrRemoving(value ?? null);
                    }}
                />
                <TextInput
                    id="modal-condition-outcome-id"
                    label="ID"
                    placeholder="ID"
                    value={conditionOutcomeID ?? ""}
                    onChange={(value) => {
                        setConditionOutcomeID(value ?? null);
                    }}
                />
                <TextInput
                    id="modal-condition-outcome-naem"
                    label="Name"
                    placeholder="Name"
                    value={conditionName ?? ""}
                    onChange={(value) => {
                        setConditionName(value ?? null);
                    }}
                />
                <div className="choice-modal__condition-outcome-form-button">
                    <Button onClick={addConditionOutcome}>
                        Add
                    </Button>
                </div>
            </div>
            <hr className="divider" />
            <div className="choice-modal__condition-outcome">
                <div className="choice-modal__condition-outcome-header">
                    Adding/Removing
                </div>
                <div className="choice-modal__condition-outcome-header">
                    ID
                </div>
                <div className="choice-modal__condition-outcome-header">
                    Name
                </div>
                {conditionOutcomes.map(outcome => <Fragment key={outcome.id}>
                    <div>
                        {outcome.addingOrRemoving}
                    </div>
                    <div>
                        {outcome.id}
                    </div>
                    <div>
                        {outcome.conditionName}
                    </div>
                </Fragment>)}
            </div>
        </div>
    </Modal>;
};
