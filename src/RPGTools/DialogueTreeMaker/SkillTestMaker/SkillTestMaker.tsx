
import "./skill-test-maker.css";
import { TextInput } from "../../../SharedComponents/TextInput/TextInput";
import { SkillTest, SkillTestDifficulty } from "../domain/types";
import { Card } from "../../../SharedComponents/Card/Card";
import { Pill } from "../../../SharedComponents/Pill/Pill";
import { SkillTestDifficultyModal } from "./SkillTestDifficultyModal";
import { useState } from "react";
import { PlusIcon } from "../../../SharedComponents/Icons/PlusIcon";
import { Button } from "../../../SharedComponents/Button/Button";

type Props = {
    currentSkillTest: SkillTest;
    onSave: (skillTest: SkillTest) => void;
    onDelete: () => void;
};

export const SkillTestMaker = (props: Props) => {
    const { currentSkillTest, onSave, onDelete } = props;

    const [isDifficultyModalOpen, setIsDifficultyModalOpen] = useState<boolean>(false);

    const updateDifficulty = (updatedDifficulty: SkillTestDifficulty) => {
        const difficultiesCopy = [...currentSkillTest.difficulties];
        const index = difficultiesCopy.findIndex((difficulty) => difficulty.id === updatedDifficulty.id);

        if (index === -1) {
            difficultiesCopy.push(updatedDifficulty);
        } else {
            difficultiesCopy[index] = updatedDifficulty;
        }
        
        onSave({...currentSkillTest, difficulties: difficultiesCopy});
    };

    return <div>
        <div>
            <h2>{currentSkillTest.name}</h2>
        </div>
        <div className="skill-test-maker__form">
            <TextInput
                id="skill-test-id"
                label="ID"
                value={currentSkillTest.id}
                readonly
            />
            <TextInput
                id="skill-test-name"
                label="Name"
                value={currentSkillTest.name}
                onChange={(value) => value ? onSave({...currentSkillTest, name: value}) : null}
            />
            <TextInput
                id="skill-test-skill-id"
                label="Skill ID"
                value={currentSkillTest.skillID}
                onChange={(value) => value ? onSave({...currentSkillTest, skillID: value}) : null}
            />
            <TextInput
                id="skill-test-next-dialogue-id"
                label="Next Dialogue ID"
                value={currentSkillTest.nextDialogueID ?? ""}
                onChange={(value) => onSave({...currentSkillTest, nextDialogueID: value ? Number(value) : null})}
                numbersOnly={true}
            />
        </div>
        <Card
            title="Difficulties"
            button={<Button onClick={() => setIsDifficultyModalOpen(true)}><PlusIcon />Add difficulty</Button>}
        >
            {currentSkillTest.difficulties.map((difficulty) => {
                return <div key={difficulty.id}>
                    <TextInput
                        id={"skill-test-difficulty-" + difficulty.id}
                        placeholder="threshold"
                        value={difficulty.threshold}
                        onChange={() => updateDifficulty({...difficulty, threshold: difficulty.threshold})}
                        numbersOnly
                    />
                    Outcomes: {difficulty.conditionOutcomes.map((outcome) =>
                        <div key={outcome.id}>{outcome.addingOrRemoving} : {outcome.conditionName}</div>
                    )}
                </div>;
            })}
        </Card>
        <SkillTestDifficultyModal
            isOpen={isDifficultyModalOpen}
            updateDifficulty={updateDifficulty}
            onClose={() => setIsDifficultyModalOpen(false)}
        />
    </div>;
};
