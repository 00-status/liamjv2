import { useEffect, useState } from "react";

import "./skill-test-difficulty-modal.css"
import { Modal } from "../../../SharedComponents/Modal/Modal";
import { TextInput } from "../../../SharedComponents/TextInput/TextInput";
import { ConditionOutcome, SkillTestDifficulty } from "../domain/types";
import { Button, ButtonTheme } from "../../../SharedComponents/Button/Button";
import { Dropdown } from "../../../SharedComponents/Dropdown/Dropdown";
import { TrashIcon } from "../../../SharedComponents/Icons/TrashIcon";

type Props = {
    isOpen: boolean;
    difficulty: SkillTestDifficulty | null;
    updateDifficulty: (difficulty: SkillTestDifficulty) => void;
    onClose: () => void;
};

const conditionOutcomeOptions = [
    { label: "Adding", value: "adding"},
    { label: "Removing", value: "removing"},
];

export const SkillTestDifficultyModal = (props: Props) => {
    const {isOpen, difficulty, updateDifficulty, onClose} = props;

    const [threshold, setThreshold] = useState<number|null>(difficulty?.threshold ?? null);
    const [conditionOutcomes, setConditionOutcomes] = useState<Array<ConditionOutcome>>(
        difficulty?.conditionOutcomes ?? []
    );

    const [currentConditionID, setCurrentConditionID] = useState<string|null>(null);
    const [currentConditionName, setCurrentConditionName] = useState<string|null>(null);
    const [addingOrRemoving, setAddingOrRemoving] = useState<string>("adding");

    useEffect(() => {
        setThreshold(difficulty?.threshold ?? null);
        setConditionOutcomes(difficulty?.conditionOutcomes ?? []);
    }, [difficulty]);

    const onAddConditionOutcome = () => {
        if (!currentConditionID || !currentConditionName) {
            return;
        }

        setConditionOutcomes([
            ...conditionOutcomes,
            { id: currentConditionID, conditionName: currentConditionName, addingOrRemoving }
        ]);

        setCurrentConditionID(null);
        setCurrentConditionName(null);
        setAddingOrRemoving("adding");
    };

    const deleteConditionOutcome = (outcomeID: string) => {
        const conditionOutcomesCopy = [...conditionOutcomes];
        const indexToDelete = conditionOutcomesCopy.findIndex(outcome => outcome.id === outcomeID);

        if (indexToDelete === -1) {
            return;
        }

        conditionOutcomesCopy.splice(indexToDelete, 1);
        setConditionOutcomes(conditionOutcomesCopy);
    };

    // TODO: Ideally we would disable the submit button until the form is valid.
    const onSubmit = () => {
        if (threshold === null || threshold === undefined || conditionOutcomes.length < 1) {
            return;
        }

        updateDifficulty({
            id: difficulty?.id
                ? difficulty.id
                : Math.trunc(Date.now() + Math.random()),
            threshold,
            conditionOutcomes
        });
        setCurrentConditionID(null);
        setCurrentConditionName(null);
        setAddingOrRemoving("adding");
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
            <Dropdown
                defaultValue="adding"
                options={conditionOutcomeOptions}
                onOptionSelect={value => setAddingOrRemoving(value)}
            />
            <Button onClick={onAddConditionOutcome}>Add condition</Button>
        </div>
        <div>
            {conditionOutcomes.map(outcome =>
                <div key={outcome.id} className="skill-test-difficulty-modal__condition-outcome">
                    <div>{outcome.addingOrRemoving + " : " + outcome.conditionName}</div>
                    <div><Button onClick={() => deleteConditionOutcome(outcome.id)} buttonTheme={ButtonTheme.Delete}><TrashIcon /></Button></div>
                </div>
            )}
        </div>
    </Modal>;
};
