import { useEffect, useState } from "react";

import { Page } from "../../SharedComponents/Page/Page";
import { useDialogueTree } from "../DialogueTreeMaker/useDialogueTree";
import { RPGRoutes } from "../domain";
import { Choice } from "../DialogueTreeMaker/domain/types";
import { ChoiceButton } from "./ChoiceButton";

export const TreePreviewPage = () => {
    // list of dialogues

    // Dialogue History
    // current conditions
    // current choices

    // On start
    //      Find dialogue with ID 1
    //      Add dialogue 1's description to dialogueHistory
    //      Display choices

    // When a choice is clicked,
    //      Add choice description to history.
    //      Find next node via ID.
    //      If node is dialogue
    //          Add new dialogue's description to history.
    //          load new choices.
    //      if node is Skill Test
    //          Add skill test details to history
    //          display difficulties as though they were choices

    const {
        dialogues,
        skillTests
    } = useDialogueTree();

    const [histories, setHistories] = useState<Array<string>>([]);
    const [currentChoices, setCurrentChoices] = useState<Array<Choice>>([]);

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
        setCurrentChoices([...startingDialogue.choices]);
    }, [dialogues, histories]);

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
                        name={choice.shortDescription}
                        nextNodeID={Number(choice.nextDialogueID)}
                        type=""
                    />)}
                </div>
            </div>
        </div>
    </Page>;
};
