import { useEffect, useRef, useState } from "react";

import './tree-preview-page.css';
import { Page } from "../../SharedComponents/Page/Page";
import { useDialogueTree } from "../DialogueTreeMaker/useDialogueTree";
import { RPGRoutes } from "../domain";
import { ChoiceButton } from "./ChoiceButton";
import { convertChoiceToPreviewChoice } from "./util";
import { ConditionOutcome, Dialogue, SkillTest } from "../DialogueTreeMaker/domain/types";
import { HistoryItem } from "./HistoryItem";

// TODO:
//      Display hidden info in the history. ✅
//      Make this file more concise where possible.
//      Consider indenting choices instead of centering them. ✅
//      Scroll to end of container when adding to history.

type PreviewCharacter = { name: string, nameColor: string };
export type DialogueHistory = {
    description: string,
    character: PreviewCharacter | null;
    isChoice: boolean;
};

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

    const [histories, setHistories] = useState<Array<DialogueHistory>>([]);
    const [currentChoices, setCurrentChoices] = useState<Array<PreviewChoice>>([]);

    const [conditions, setConditions] = useState<Array<Condition>>([]);

    const historyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (histories.length > 0) {
            return;
        }

        const startingDialogue = dialogues.find(dialogue => dialogue.id === 1);

        if (!startingDialogue) {
            return;
        }

        const character = startingDialogue.character
            ? { name: startingDialogue.character.name, nameColor: startingDialogue.character.nameColor }
            : null;

        setHistories([
            ...histories,
            { description: startingDialogue.description, character, isChoice: false }]
        );
        setCurrentChoices([...startingDialogue.choices.map(convertChoiceToPreviewChoice)]);
    }, [dialogues, histories]);

    const onChoiceClick = (nextDialogueID: number, description: string, conditionOutcomes: Array<ConditionOutcome>) => {
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

        const nextDialogue = findNextDialogue(dialogues, skillTests, nextDialogueID, conditionsCopy);

        if (!nextDialogue) {
            return;
        }

        const choiceHistory = { description, character: null, isChoice: true };
        const nextDialogueHistory = {
            description: nextDialogue.description,
            character: nextDialogue.character,
            isChoice: false
        };

        setConditions(conditionsCopy);
        setHistories([...histories, choiceHistory, nextDialogueHistory]);
        setCurrentChoices([...nextDialogue.choices]);
    };

    useEffect(() => {
        if (historyRef.current) {
            historyRef.current.scrollTop = historyRef.current.scrollHeight;
        }
    }, [historyRef, histories]);

    return <Page routes={RPGRoutes} title="RPG Tools">
        <div className="tree-preview-page">
            <h1>Dialogue Tree Preview</h1>
            <div className="tree-preview-page__container">
                <div className="tree-preview-page__active-conditions">
                    <h3>Active Conditions</h3>
                    {conditions.map(condition => <div key={condition.id}>{condition.id} : {condition.name}</div>)}
                </div>
                <div className="tree-preview-page__content">
                    <div ref={historyRef} className="tree-preview-page__history">
                        {histories.map(history => <HistoryItem key={history.description} history={history} />)}
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
    nextDialogueID: number,
    conditions: Array<Condition>
): { description: string, choices: Array<PreviewChoice>, character: PreviewCharacter|null } | null => {
    const nextDialogue = dialogues.find(dialogue => dialogue.id === nextDialogueID);

    if (nextDialogue) {
        const conditionsByID = conditions.reduce((acc, condition) => {
            acc[condition.id] = condition;

            return acc;
        }, {} as {[key: string]: Condition});

        const filteredHiddenInfos = nextDialogue.hiddenInfo.filter((hiddenInfo) => {
            return hiddenInfo.conditionIDs.every(conditionID => conditionsByID[conditionID.id]);
        });

        const description = nextDialogue.description + "\n"
            + filteredHiddenInfos.map(hiddenInfo => hiddenInfo.description + "\n");

        return {
            description: description,
            choices: nextDialogue.choices.map(convertChoiceToPreviewChoice),
            character: nextDialogue.character
                ? { name: nextDialogue.character.name, nameColor: nextDialogue.character.nameColor }
                : { name: "Unknown", nameColor: "#FCFEFF" }
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
                conditionOutcomes: [...difficulty.conditionOutcomes],
            };
        });

        return {
            description: nextSkillTest.name + " | " + nextSkillTest.skillID,
            choices,
            character: { name: "Skill Test", nameColor: "#FCFEFF" }
        };
    }

    return null;
};
