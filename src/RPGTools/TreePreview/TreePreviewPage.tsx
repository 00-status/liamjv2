import { useEffect, useState } from "react";

import './tree-preview-page.css';
import { Page } from "../../SharedComponents/Page/Page";
import { useDialogueTree } from "../DialogueTreeMaker/useDialogueTree";
import { RPGRoutes } from "../domain";
import { ChoiceButton } from "./ChoiceButton";
import { convertChoiceToPreviewChoice } from "./util";
import { ConditionOutcome, Dialogue, SkillTest } from "../DialogueTreeMaker/domain/types";

// TODO:
//      Style component.
//      Display what character is talking (and their name colour) for the history.
//      Display hidden info in the history.

export type Condition = {
    id: string;
    name: string;
};

export type PreviewChoice = {
    id: string;
    name: string;
    nextNodeID: number;
    prerequisiteIDs: Array<string>;
    conditionOutcomes: Array<ConditionOutcome>;
};

export const TreePreviewPage = () => {
    const {
        dialogues,
        skillTests
    } = useDialogueTree();

    const [histories, setHistories] = useState<Array<string>>([]);
    const [currentChoices, setCurrentChoices] = useState<Array<PreviewChoice>>([]);

    const [conditions, setConditions] = useState<Array<Condition>>([]);

    useEffect(() => {
        if (histories.length > 0) {
            return;
        }

        const startingDialogue = dialogues.find(dialogue => dialogue.id === 1);

        if (!startingDialogue) {
            return;
        }

        setHistories([...histories, startingDialogue.description]);
        setCurrentChoices([...startingDialogue.choices.map(convertChoiceToPreviewChoice)]);
    }, [dialogues, histories]);

    const onChoiceClick = (nextDialogueID: number, description: string, conditionOutcomes: Array<ConditionOutcome>) => {
        const nextDialogue = findNextDialogue(dialogues, skillTests, nextDialogueID);

        if (!nextDialogue) {
            return;
        }

        const conditionsCopy = [...conditions];

        for (let index = 0; index < conditionOutcomes.length; index++) {
            if (conditionOutcomes[index].addingOrRemoving === "adding") {
                conditionsCopy.push({ id: conditionOutcomes[index].id, name: conditionOutcomes[index].conditionName });
                continue;
            }

            const conditionToRemoveID = conditionsCopy.findIndex(condition =>
                condition.id === conditionOutcomes[index].id);

            if (conditionToRemoveID === -1) {
                continue;
            }

            conditionsCopy.splice(conditionToRemoveID, 1);
        }

        setConditions(conditionsCopy);
        setHistories([...histories, description, nextDialogue.description]);
        setCurrentChoices([...nextDialogue.choices]);
    };

    return <Page routes={RPGRoutes} title="RPG Tools">
        <div className="tree-preview-page">
            <h1>Dialogue Tree Preview</h1>
            <div className="tree-preview-page__container">
                <div className="tree-preview-page__active-conditions">
                    <h3>Active Conditions</h3>
                    {conditions.map(condition => <div key={condition.id}>{condition.id} : {condition.name}</div>)}
                </div>
                <div className="tree-preview-page__content">
                    <div className="tree-preview-page__history">
                        {histories.map(history => <div key={history}>{history}</div>)}
                    </div>
                    <div className="tree-preview-page__choices">
                        {currentChoices.map(choice => <ChoiceButton
                            key={choice.id}
                            choice={choice}
                            currentConditions={conditions}
                            onClick={onChoiceClick}
                        />)}
                    </div>
                </div>
            </div>
        </div>
    </Page>;
};

const findNextDialogue = (
    dialogues: Array<Dialogue>,
    skillTests: Array<SkillTest>,
    nextDialogueID: number
): { description: string, choices: Array<PreviewChoice> } | null => {
    const nextDialogue = dialogues.find(dialogue => dialogue.id === nextDialogueID);

    if (nextDialogue) {
        return {
            description: nextDialogue.description,
            choices: nextDialogue.choices.map(convertChoiceToPreviewChoice),
        };
    }

    const nextSkillTest = skillTests.find(skillTest => skillTest.id === nextDialogueID);

    if (nextSkillTest) {
        const choices = nextSkillTest.difficulties.map((difficulty) => {
            return {
                id: String(difficulty.id),
                name: "Threshold: " + difficulty.threshold,
                prerequisiteIDs: [],
                nextNodeID: nextSkillTest.nextDialogueID ?? -1,
                conditionOutcomes: [...difficulty.conditionOutcomes]
            };
        });

        return {
            description: nextSkillTest.name + " | " + nextSkillTest.skillID,
            choices
        };
    }

    return null;
};
