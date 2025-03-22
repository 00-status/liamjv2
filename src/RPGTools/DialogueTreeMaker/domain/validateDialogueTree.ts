import { Dialogue, DialogueTree, UnknownObject } from "./types";
import { SerializedMap } from "./validateDialogueTree.test";

// TOOD: We should really check the sub-properties as well here.
// At the moment, if a dialogue or dialoguecoordinate is typed incorrectly, we won't catch it here.
export const validateDialogueTree = (dialogueTree: Array<any> | UnknownObject): DialogueTree|null => {
    if (Array.isArray(dialogueTree)) {
        return null;
    }

    const hasDialogues = Array.isArray(dialogueTree.dialogues);
    const hasNodeCoordinates = Array.isArray(dialogueTree.nodeCoordinates);

    if (typeof dialogueTree.id === 'string'
        && typeof dialogueTree.name === 'string'
        && hasDialogues
        && hasNodeCoordinates
    ) {
        const dialogues: Array<Dialogue> = dialogueTree.dialogues as Array<Dialogue>;
        const nodeCoordinatesMap = new Map(dialogueTree.nodeCoordinates as SerializedMap);

        const dialogueTreeTyped: DialogueTree = {
            id: dialogueTree.id,
            name: dialogueTree.name,
            dialogues: dialogues,
            nodeCoordinates: nodeCoordinatesMap
        };

        return dialogueTreeTyped;
    }

    return null;
};
