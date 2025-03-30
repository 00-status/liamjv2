import { Page } from "../../SharedComponents/Page/Page";
import { RPGRoutes } from "../domain";

export const TreePreviewPage = () => {
    // list of dialogues
    // current conditions
    // current choices

    // On start
    //      Find dialogue with ID 1
    //      Add dialogue 1's description to dialogueHistory
    //      Display choices

    // When a choice is clicked,
    //      Find next node via ID.
    //      If node is dialogue
    //          Add new dialogue's description to history.
    //          load new choices.
    //      if node is Skill Test
    //          Add skill test details to history
    //          display difficulties as though they were choices

    return <Page routes={RPGRoutes} title="RPG Tools">
        <div>
            <div>
                Conditions
            </div>
            <div>
                <div>
                    Dialogue History
                </div>
                <div>
                    Choice List
                </div>
            </div>
        </div>
    </Page>;
};
