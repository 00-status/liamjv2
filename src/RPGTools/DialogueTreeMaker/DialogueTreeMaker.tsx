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
        dialogueCoordinates,
        setDialogueTreeID,
        setDialogueTreeName,
        setDialogues,
        setDialogueCoordinates
    } = useDialogueTree();

    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const uploadDialogueTree = (parsedTree: Array<any> | UnknownObject) => {
        const dialogueTree = validateDialogueTree(parsedTree);

        if (!dialogueTree) {
            return;
        }

        resetDialogueTree();

        setDialogueTreeID(dialogueTree.id);
        setDialogueTreeName(dialogueTree.name);
        setDialogues(dialogueTree.dialogues);
        setDialogueCoordinates(dialogueTree.dialogueCoordinates);
    };

    const resetDialogueTree = () => {
        setDialogueTreeID('');
        setDialogueTreeName('');
        setDialogues([]);
        setDialogueCoordinates(new Map());
    };

    const onSave = (updatedArea: Dialogue) => {
        const copiedAreas = [...dialogues];
        copiedAreas[currentIndex] = updatedArea;

        setDialogues(copiedAreas);
    };

    const deleteDialogue = () => {
        if (dialogues.length === 1) {
            return;
        }

        const areasCopy = [...dialogues];
        areasCopy.splice(currentIndex, 1);
        setCurrentIndex(0);
        setDialogues(areasCopy);
    };

    const createNewDialogue = () => {
        const lastDialogueNumber = dialogues.length !== 0
            ? dialogues[dialogues.length - 1].id
            : 0;

        const newArea = {
            id: lastDialogueNumber + 1,
            name: 'Dialogue ' + (Number(lastDialogueNumber) + 1),
            character: null,
            description: '',
            hiddenInfo: [],
            choices: []
        };

        setDialogues([...dialogues, newArea]);
    };

    const onDialogueClick = (areaID: number) => {
        const clickedAreaIndex = dialogues.findIndex((area: Dialogue) => {
            return area.id === areaID;
        });

        if (clickedAreaIndex === -1) {
            return;
        }

        setCurrentIndex(clickedAreaIndex);
    };

    const onDialogueMoveFinish = (id: number, x: number, y: number) => {
        setDialogueCoordinates(new Map(dialogueCoordinates.set(id, { x, y })));
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
                            dialogueCoordinates
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
                            dialogueCoordiantes={dialogueCoordinates}
                            onDialogueClick={onDialogueClick}
                            onDialogueMoveFinish={onDialogueMoveFinish}
                        />
                    </SigmaContainer>
                </div>
                <hr className="divider" />
                {dialogues.length > 0
                    ? <DialogueMaker dialogue={dialogues[currentIndex]} onSave={onSave} onDelete={deleteDialogue} />
                    : null
                }
            </div>
        </div>
    </Page>;
};
