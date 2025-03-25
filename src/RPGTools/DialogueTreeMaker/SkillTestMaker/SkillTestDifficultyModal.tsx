import { useState } from "react";

import "./skill-test-difficulty-modal.css"
import { Modal } from "../../../SharedComponents/Modal/Modal";
import { TextInput } from "../../../SharedComponents/TextInput/TextInput";
import { ConditionOutcome, SkillTestDifficulty } from "../domain/types";
import { Button } from "../../../SharedComponents/Button/Button";

type Props = {
    isOpen: boolean;
    updateDifficulty: (difficulty: SkillTestDifficulty) => void;
    onClose: () => void;
};

export const SkillTestDifficultyModal = (props: Props) => {
    const {isOpen, updateDifficulty, onClose} = props;

    const [threshold, setThreshold] = useState<number|null>(null);
    const [conditionOutcomes, setConditionOutcomes] = useState<Array<ConditionOutcome>>([]);

    const [currentConditionID, setCurrentConditionID] = useState<string|null>(null);
    const [currentConditionName, setCurrentConditionName] = useState<string|null>(null);
    const [addingOrRemoving, setAddingOrRemoving] = useState<string|null>("adding");

    const onAddConditionOutcome = () => {
        if (!currentConditionID || !currentConditionName || !addingOrRemoving) {
            return;
        }

        setConditionOutcomes([
            ...conditionOutcomes,
            { id: currentConditionID, conditionName: currentConditionName, addingOrRemoving }
        ]);

        setCurrentConditionID(null);
        setCurrentConditionName(null);
        setAddingOrRemoving(null);
    };

    // TODO: Ideally we would disable the submit button until the form is valid.
    const onSubmit = () => {
        if (!threshold || conditionOutcomes.length < 1) {
            return;
        }

        updateDifficulty({ id: 1, threshold, conditionOutcomes });
        onClose();
    };

    const submitButton = <Button onClick={onSubmit}>Submit</Button>

    return <Modal isOpen={isOpen} title="Difficulty" onClose={onClose} footer={submitButton}>
        <div>
            <TextInput
                id={"skill-test-difficulty-threshold-modal"}
                placeholder="Condition threshold"
                value={threshold ?? ""}
                onChange={(value) => setThreshold(value ? Number(value) : null)}
                numbersOnly
            />
        </div>
        <hr className="divider" />
        <div className="skill-test-difficulty-modal-outcome__form">
            <TextInput
                id={"skill-test-difficulty-condition-id"}
                placeholder="Condition ID"
                value={currentConditionID ?? ""}
                onChange={(value) => setCurrentConditionID(value ?? null)}
            />
            <TextInput
                id={"skill-test-difficulty-condition-name"}
                placeholder="Condition name"
                value={currentConditionName ?? ""}
                onChange={(value) => setCurrentConditionName(value ?? null)}
            />
            <TextInput
                id={"skill-test-difficulty-condition-add-or-remove"}
                placeholder="adding or removing"
                value={addingOrRemoving ?? ""}
                onChange={(value) => setAddingOrRemoving(value ?? null)}
            />
            <Button onClick={onAddConditionOutcome}>Add condition</Button>
        </div>
        <div>
            {conditionOutcomes.map(outcome =>
                <div key={outcome.id}>{outcome.addingOrRemoving + " : " + outcome.conditionName}</div>)}
        </div>
    </Modal>;
};
