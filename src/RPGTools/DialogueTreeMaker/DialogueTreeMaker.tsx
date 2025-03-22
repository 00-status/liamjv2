import { ReactElement, useState } from "react";
import { SigmaContainer } from "@react-sigma/core";

import './dialogue-tree-maker.css';
import { Page } from "../../SharedComponents/Page/Page";
import { Dialogue, UnknownObject } from "./domain/types";
import { DialogueTreeGraph } from "./DialogueTreeGraph";
import { TextInput } from "../../SharedComponents/TextInput/TextInput";
import { useDialogueTree } from "./useDialogueTree";
import { getDownloadLink } from "./domain/getDownloadLink";
import { TrashIcon } from "../../SharedComponents/Icons/TrashIcon";
import { DownloadIcon } from "../../SharedComponents/Icons/DownloadIcon";
import { Button, ButtonTheme } from "../../SharedComponents/Button/Button";
import { ButtonLink } from "../../SharedComponents/ButtonLink/ButtonLink";
import { PlusIcon } from "../../SharedComponents/Icons/PlusIcon";
import { JSONFileInput } from "../../SharedComponents/FileInput/JSONFileInput";
import { validateDialogueTree } from "./domain/validateDialogueTree";
import { DialogueMaker } from "./DialogueMaker/DialogueMaker";
import { RPGRoutes } from "../domain";

export const DialogueTreeMaker = (): ReactElement => {
    const {
        dialogueTreeID,
        dialogueTreeName,
        dialogues,
        nodeCoordinates,
        setDialogueTreeID,
        setDialogueTreeName,
        setDialogues,
        setDialogueCoordinates
    } = useDialogueTree();

    const [currentDialogue, setCurrentDialogue] = useState<Dialogue|null>(null);

    const uploadDialogueTree = (parsedTree: Array<any> | UnknownObject) => {
        const dialogueTree = validateDialogueTree(parsedTree);

        if (!dialogueTree) {
            return;
        }

        resetDialogueTree();

        setDialogueTreeID(dialogueTree.id);
        setDialogueTreeName(dialogueTree.name);
        setDialogues(dialogueTree.dialogues);
        setDialogueCoordinates(dialogueTree.nodeCoordinates);
    };

    const resetDialogueTree = () => {
        setDialogueTreeID('');
        setDialogueTreeName('');
        setDialogues([]);
        setDialogueCoordinates(new Map());
    };

    const onSave = (updatedDialogue: Dialogue) => {
        const dialoguesCopy = [...dialogues];

        const currentDialogueIndex = dialogues.findIndex((dialogue) => dialogue.id === updatedDialogue.id);

        if (currentDialogueIndex === -1) {
            return;
        }

        dialoguesCopy[currentDialogueIndex] = updatedDialogue;

        setCurrentDialogue(updatedDialogue);
        setDialogues(dialoguesCopy);
    };

    const deleteDialogue = () => {
        if (dialogues.length === 1 || !currentDialogue) {
            return;
        }

        const currentDialogueIndex = dialogues.findIndex((dialogue) => dialogue.id === currentDialogue.id);
        if (currentDialogueIndex === -1) {
            return;
        }

        const dialoguesCopy = [...dialogues];
        dialoguesCopy.splice(currentDialogueIndex, 1);

        setCurrentDialogue(null);
        setDialogues(dialoguesCopy);
    };

    const createNewDialogue = () => {
        const lastDialogueNumber = dialogues.length !== 0
            ? dialogues[dialogues.length - 1].id
            : 0;

        const newDialogue = {
            id: lastDialogueNumber + 1,
            name: 'Dialogue ' + (Number(lastDialogueNumber) + 1),
            character: null,
            description: '',
            hiddenInfo: [],
            choices: []
        };

        setDialogues([...dialogues, newDialogue]);
    };

    const onDialogueClick = (dialogueID: number) => {
        const newCurrentDialogue = dialogues.find((dialogue: Dialogue) => {
            return dialogue.id === dialogueID;
        });

        if (!newCurrentDialogue) {
            return;
        }

        setCurrentDialogue(newCurrentDialogue);
    };

    const onNodeMoveFinish = (id: number, x: number, y: number) => {
        setDialogueCoordinates(new Map(nodeCoordinates.set(id, { x, y })));
    };

    return <Page title="RPG Tools" routes={RPGRoutes} >
        <div className="dialogue-tree-maker">
            <div className="dialogue-tree-maker__title">
                <h1>Dialogue Tree Maker</h1>
                {dialogueTreeID &&
                    <ButtonLink
                        download={dialogueTreeID + ".json"}
                        href={getDownloadLink({
                            id: dialogueTreeID,
                            name: dialogueTreeName,
                            dialogues,
                            nodeCoordinates: nodeCoordinates
                        })}
                    >
                        <DownloadIcon /> Download tree
                    </ButtonLink>
                }
                <Button buttonTheme={ButtonTheme.Delete} onClick={resetDialogueTree}>
                    <TrashIcon /> Delete Tree
                </Button>
            </div>
            <div className="dialogue-tree-maker__form">
                <JSONFileInput id="dialogue-tree-upload" name="Upload Dialogue Tree" onChange={uploadDialogueTree}/>
                <TextInput
                    id="dialogue-tree-id"
                    label="Dialogue tree ID"
                    value={dialogueTreeID}
                    onChange={(newValue) => {
                        setDialogueTreeID(newValue ?? '');
                    }}
                />
                <TextInput
                    id="dialogue-tree-name"
                    label="Dialogue tree name"
                    value={dialogueTreeName}
                    onChange={(newValue) => {
                        setDialogueTreeName(newValue ?? '');
                    }}
                />
            </div>
            <div className="dialogue-tree-maker--content">
                <div>
                    <div className="dialogue-tree-maker__dialogue-tree-title">
                        <h2>Dialogue Tree</h2>
                        <Button onClick={createNewDialogue}>
                            <PlusIcon /> Create dialogue
                        </Button>
                    </div>
                    <SigmaContainer style={{ height: '350px', backgroundColor: '#3b3b40', color: '#FCFEFF' }}>
                        <DialogueTreeGraph
                            dialogues={dialogues}
                            dialogueCoordinates={nodeCoordinates}
                            onDialogueClick={onDialogueClick}
                            onDialogueMoveFinish={onNodeMoveFinish}
                        />
                    </SigmaContainer>
                </div>
                <hr className="divider" />
                {currentDialogue
                    ? <DialogueMaker dialogue={currentDialogue} onSave={onSave} onDelete={deleteDialogue} />
                    : null
                }
            </div>
        </div>
    </Page>;
};
