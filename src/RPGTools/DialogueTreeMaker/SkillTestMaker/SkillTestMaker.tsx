import { useState } from "react";

import "./skill-test-maker.css";
import { TextInput } from "../../../SharedComponents/TextInput/TextInput";
import { SkillTest, SkillTestDifficulty } from "../domain/types";
import { Card } from "../../../SharedComponents/Card/Card";
import { SkillTestDifficultyModal } from "./SkillTestDifficultyModal";
import { PlusIcon } from "../../../SharedComponents/Icons/PlusIcon";
import { Button, ButtonTheme } from "../../../SharedComponents/Button/Button";
import { TrashIcon } from "../../../SharedComponents/Icons/TrashIcon";
import { PencilIcon } from "../../../SharedComponents/Icons/PencilIcon";

type Props = {
    currentSkillTest: SkillTest;
    onSave: (skillTest: SkillTest) => void;
    onDelete: () => void;
};

// TODO:
//      Delete the Skill Test ✅
//      Delete Difficulty ✅
//      Edit Difficulty ✅
//      Add description to modal.
//      Put focus on text field after adding outcome

export const SkillTestMaker = (props: Props) => {
    const { currentSkillTest, onSave, onDelete } = props;

    const [isDifficultyModalOpen, setIsDifficultyModalOpen] = useState<boolean>(false);
    const [currentDifficulty, setCurrentDifficulty] = useState<SkillTestDifficulty|null>(null);

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

    const deleteDifficulty = (difficultyId: number) => {
        const difficultiesCopy = [...currentSkillTest.difficulties];
        const index = difficultiesCopy.findIndex((difficulty) => difficulty.id === difficultyId);

        if (index === -1) {
            return;
        }

        difficultiesCopy.splice(index, 1);

        onSave({...currentSkillTest, difficulties: difficultiesCopy});
    };

    return <div>
        <div className="skill-test-maker__title">
            <h2>{currentSkillTest.name}</h2>
            <Button buttonTheme={ButtonTheme.Delete} onClick={() => onDelete()}>
                <TrashIcon /> Delete
            </Button>
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
            <div className="skill-test-maker__outcome-item">
                <div className="skill-test-maker__outcome-item-child">
                    Threshold
                </div>
                <div className="skill-test-maker__outcome-item-child">
                    Outcomes
                </div>
                <div className="skill-test-maker__outcome-item-child--controls" />
            </div>
            {currentSkillTest.difficulties.map((difficulty) => {
                return <div className="skill-test-maker__outcome-item" key={difficulty.id}>
                    <div className="skill-test-maker__outcome-item-child">
                        {difficulty.threshold}
                    </div>
                    <div className="skill-test-maker__outcome-item-child">
                        {difficulty.conditionOutcomes.map((outcome) =>
                            <div key={outcome.id}>
                                {"[" + outcome.addingOrRemoving + " : " + outcome.conditionName + "]"}
                            </div>
                        )}
                    </div>
                    <div className="skill-test-maker__outcome-item-child--controls">
                        <Button onClick={() => {
                            setCurrentDifficulty(difficulty);
                            setIsDifficultyModalOpen(true);
                        }}>
                            <PencilIcon />
                        </Button>
                        <Button buttonTheme={ButtonTheme.Delete} onClick={() => deleteDifficulty(difficulty.id)}>
                            <TrashIcon />
                        </Button>
                    </div>
                </div>;
            })}
        </Card>
        <SkillTestDifficultyModal
            isOpen={isDifficultyModalOpen}
            difficulty={currentDifficulty}
            updateDifficulty={updateDifficulty}
            onClose={() => setIsDifficultyModalOpen(false)}
        />
    </div>;
};
