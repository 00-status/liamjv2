import { useEffect, useState } from "react";

import { Page } from "../../SharedComponents/Page/Page";
import { useDialogueTree } from "../DialogueTreeMaker/useDialogueTree";
import { RPGRoutes } from "../domain";
import { ChoiceButton } from "./ChoiceButton";
import { convertChoiceToPreviewChoice } from "./util";
import { Dialogue, SkillTest } from "../DialogueTreeMaker/domain/types";

// TODO:
//      Allow Skill Tests to add (or remove) conditions.
//          For skill tests, treat each difficulty as a separate choice (they just add different conditions.)
//      disable choices based on conditions.
//      Style component.
//      Display what character is talking (and their name colour) for the history.
//      Display hidden info in the history.

export type PreviewChoice = {
    id: string;
    name: string;
    nextNodeID: number;
};

export const TreePreviewPage = () => {
    const {
        dialogues,
        skillTests
    } = useDialogueTree();

    const [histories, setHistories] = useState<Array<string>>([]);
    const [currentChoices, setCurrentChoices] = useState<Array<PreviewChoice>>([]);

    const [conditions, setConditions] = useState<Array<string>>([]);

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

    const onChoiceClick = (nextDialogueID: number, description: string) => {
        const nextDialogue = findNextDialogue(dialogues, skillTests, nextDialogueID);

        if (!nextDialogue) {
            return;
        }

        setHistories([...histories, description, nextDialogue.description]);
        setCurrentChoices([...nextDialogue.choices]);
    };

    return <Page routes={RPGRoutes} title="RPG Tools">
        <div>
            <div>
                Conditions
            </div>
            <div>
                <div>
                    {histories.map(history => <div key={history}>{history}</div>)}
                </div>
                <div>
                    {currentChoices.map(choice => <ChoiceButton
                        key={choice.id}
                        name={choice.name}
                        nextNodeID={choice.nextNodeID}
                        onClick={onChoiceClick}
                    />)}
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
            choices: nextDialogue.choices.map(convertChoiceToPreviewChoice)
        };
    }

    const nextSkillTest = skillTests.find(skillTest => skillTest.id === nextDialogueID);

    if (nextSkillTest) {
        const choices = nextSkillTest.difficulties.map((difficulty) => {
            return {
                id: String(difficulty.id),
                name: "Threshold: " + difficulty.threshold,
                nextNodeID: nextSkillTest.nextDialogueID ?? -1
            };
        });

        return {
            description: nextSkillTest.name + " | " + nextSkillTest.skillID,
            choices
        };
    }

    return null;
};
