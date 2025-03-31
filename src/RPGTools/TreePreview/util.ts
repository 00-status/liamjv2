import { Choice } from "../DialogueTreeMaker/domain/types";
import { PreviewChoice } from "./TreePreviewPage";

export const convertChoiceToPreviewChoice = (choice: Choice): PreviewChoice => {
    return {
        id: choice.id,
        name: choice.shortDescription,
        nextNodeID: Number(choice.nextDialogueID),
        conditionOutcomes: []
    };
};
