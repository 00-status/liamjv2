import { Character } from "../../CharacterMaker";

export type DialogueTreeNode = {
    id: string;
    name: string;
};

export interface DialogueTree extends DialogueTreeNode {
    dialogues: Array<Dialogue>;
    nodeCoordinates: NodeCoordinate;
};

export type NodeCoordinate = Map<number, {x: number, y: number}>;

export type Dialogue = {
    id: number;
    name: string;
    character: Character | null;
    description: string;
    hiddenInfo: Array<HiddenInfo>;
    choices: Array<Choice>;
};

export type HiddenInfo = {
    id: string;
    conditionIDs: Array<HiddenInfoCondition>;
    description: string;
};

export type HiddenInfoCondition = {
    id: string;
    name: string;
};

export type Choice = {
    id: string;
    conditionID: string | null;
    nextDialogueID: string;
    shortDescription: string;
};

export interface SkillTest extends DialogueTreeNode {
    skillID: string;
    // TODO: Add skill test array
    nextDialogueID: number;
};

export type UnknownObject = {
    [key: string]: unknown;
};
