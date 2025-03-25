import { useState } from "react";
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

    const [currentConditionName, setCurrentConditionName] = useState<string|null>(null);
    const [addingOrRemoving, setAddingOrRemoving] = useState<string|null>("adding");

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
                value={threshold ?? ""}
                onChange={(value) => setThreshold(value ? Number(value) : null)}
                numbersOnly
            />
        </div>
        <div>
            <TextInput
                id={"skill-test-difficulty-condition-name"}
                value={currentConditionName ?? ""}
                onChange={(value) => setCurrentConditionName(value ?? null)}
            />
            <TextInput
                id={"skill-test-difficulty-condition-add-or-remove"}
                value={addingOrRemoving ?? ""}
                onChange={(value) => setAddingOrRemoving(value ?? null)}
            />
            <Button>Add condition</Button>
        </div>
        <div>
            {conditionOutcomes.map(outcome => <div>{outcome.conditionName + " : " + outcome.addingOrRemoving}</div>)}
        </div>
    </Modal>;
};
