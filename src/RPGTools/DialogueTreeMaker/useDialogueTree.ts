import { useEffect, useState } from "react";

import { Dialogue, NodeCoordinate, DialogueTree, SkillTest } from "./domain/types";

type UseDialogueTree = {
    dialogueTreeID: string;
    dialogueTreeName: string;
    dialogues: Array<Dialogue>;
    dialogueCoordinates: NodeCoordinate;
    setDialogueTreeID: (id: string) => void;
    setDialogueTreeName: (name: string) => void;
    setDialogues: (dialogues: Array<Dialogue>) => void;
    setDialogueCoordinates: (dialogueCoordinates: NodeCoordinate) => void;
};

export const useDialogueTree = (): UseDialogueTree => {
    const [dialogueTreeID, setDialogueTreeID] = useState<string>('tree_1');
    const [dialogueTreeName, setDialogueTreeName] = useState<string>('Tree 1');
    const [dialogues, setDialogues] = useState<Array<Dialogue>>([]);
    const [nodeCoordinates, setDialogueCoordinates] = useState<NodeCoordinate>(new Map());

    useEffect(() => {
        const dialogueTreeJson = localStorage.getItem('dialogueTree');

        if (dialogueTreeJson) {
            const dialogueTreeParsed: DialogueTree = JSON.parse(dialogueTreeJson);

            setDialogueTreeID(dialogueTreeParsed.id);
            setDialogueTreeName(dialogueTreeParsed.name);
            setDialogues(dialogueTreeParsed.dialogues);
            setDialogueCoordinates(new Map(dialogueTreeParsed.nodeCoordinates));
        }
    }, [setDialogueTreeID, setDialogueTreeName, setDialogues, setDialogueCoordinates]);

    useEffect(() => {
        const dialogueTree = {
            id: dialogueTreeID,
            name: dialogueTreeName,
            dialogues,
            nodeCoordinates: Array.from(nodeCoordinates.entries())
        };
        const serializedDialogueTree = JSON.stringify(dialogueTree);
        
        localStorage.setItem('dialogueTree', serializedDialogueTree);
    }, [dialogueTreeID, dialogueTreeName, dialogues, nodeCoordinates]);

    return {
        dialogueTreeID,
        dialogueTreeName,
        dialogues,
        dialogueCoordinates: nodeCoordinates,
        setDialogues,
        setDialogueTreeID,
        setDialogueTreeName,
        setDialogueCoordinates
    };
};
