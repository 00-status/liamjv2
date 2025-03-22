import { SerializedEdge, SerializedNode } from "graphology-types";
import { Choice, Dialogue, SkillTest } from "./types";

type DialogueMap = Map<number, { x: number, y: number }>;

export const convertDialoguesToNodes = (
    dialogues: Array<Dialogue | SkillTest>,
    existingDialogues: DialogueMap
): Array<SerializedNode> => {
    const nodes = dialogues.map((dialogue: Dialogue | SkillTest) => {
        const graphDialogue = existingDialogues.get(dialogue.id);

        return {
            key: String(dialogue.id),
            node: dialogue.id,
            attributes: {
                x: graphDialogue ? graphDialogue.x : 0,
                y: graphDialogue ? graphDialogue.y : 0,
                label: dialogue.name,
                size: 20,
                color: '#d6a840'
            }
        }
    });

    return nodes;
};

export const convertDialoguesToEdges = (
    dialogues: Array<Dialogue>,
    skillTests: Array<SkillTest>
): Array<SerializedEdge> => {
    const nodes: Array<Dialogue | SkillTest> = [...dialogues, ...skillTests];

    const nodeIDsById = nodes.reduce((acc, node) => {
        acc[node.id] = node.id;
        return acc;
    }, {} as {[key: number]: number|undefined});

    const mappedEdges = dialogues.reduce<Array<SerializedEdge>>((acc, dialogue) => {
        const edges: Array<SerializedEdge> = dialogue.choices
            .filter((choice, position) => {
                // TODO: Make this more efficient
                const firstChoiceOccurance = dialogue.choices.findIndex((innerChoice) =>
                    innerChoice.nextDialogueID == choice.nextDialogueID
                );

                const isUniqueChoice = firstChoiceOccurance === position;
                const doesNextNodeExist = nodeIDsById[Number(choice.nextDialogueID)];

                return doesNextNodeExist && isUniqueChoice;
            })
            .map((choice) => {
                return {
                    key: dialogue.id + '-' + choice.nextDialogueID,
                    source: String(dialogue.id),
                    target: choice.nextDialogueID,
                    attributes: { type: 'arrow', size: 4, undirected: false }
                };
            });

        return [...acc, ...edges];
    }, []);

    const skillTestEdges: Array<SerializedEdge> = skillTests
        .filter(skillTest => nodeIDsById[skillTest.nextDialogueID])
        .map((skillTest) => {
            return {
                key: skillTest.id + '-' + skillTest.nextDialogueID,
                source: String(skillTest.id),
                target: String(skillTest.nextDialogueID),
                attributes: { type: 'arrow', size: 4, undirected: false }
            };
        });

    return [...mappedEdges, ...skillTestEdges];
};

export const convertSkillTestsToEdges = (
    skillTests: Array<SkillTest>,
    dialogues: Array<Dialogue>
): Array<SerializedEdge> => {



    return [];
};
