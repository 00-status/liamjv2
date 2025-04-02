import { Fragment, useState } from 'react';

import "./choices-table.css";
import { Choice } from "../../domain/types";
import { Button, ButtonTheme } from "../../../../SharedComponents/Button/Button";
import { TrashIcon } from "../../../../SharedComponents/Icons/TrashIcon";
import { Card } from "../../../../SharedComponents/Card/Card";
import { ChoiceModal } from './ChoiceModal';
import { PlusIcon } from '../../../../SharedComponents/Icons/PlusIcon';

type Props = {
    choices: Array<Choice>;
    onChange: (choices: Array<Choice>) => void;
};

export const ChoicesTable = (props: Props) => {
    const {choices, onChange} = props;

    const [currentChoice, setCurrentChoice] = useState<Choice|null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const updateChoice = (newChoice: Choice) => {
        const choicesCopy = [...choices];
        const choiceIndex = choicesCopy.findIndex(choice => choice.id === newChoice.id);

        if (choiceIndex === -1) {
            choicesCopy.push(newChoice);
        } else {
            choicesCopy[choiceIndex] = newChoice;
        }

        onChange(choicesCopy);
    };

    const deleteChoice = (id: string) => {
        const choicesCopy = [...choices];
        const choiceToDeleteIndex = choicesCopy.findIndex(choice => choice.id === id);

        if (choiceToDeleteIndex === -1) {
            return;
        }
        
        choicesCopy.splice(choiceToDeleteIndex, 1);
        onChange(choicesCopy);
    };

    const newChoiceButton = <Button onClick={() => setIsModalOpen(true)}><PlusIcon />Add Choice</Button>;

    return <Card title="Choices" button={newChoiceButton}>
        <div className="choices-table">
            <div className="choices-table__header">
                Condition ID
            </div>
            <div className="choices-table__header">
                Short Description
            </div>
            <div className="choices-table__header">
                Next Dialogue ID
            </div>
            <div />
            {choices.map(choice => {
                return <Fragment key={choice.id}>
                    <div>{choice.conditionID}</div>
                    <div>{choice.shortDescription}</div>
                    <div>{choice.nextDialogueID}</div>
                    <div className='choices-table__item--actions'>
                        <Button onClick={() => deleteChoice(choice.id)} buttonTheme={ButtonTheme.Delete}>
                            <TrashIcon />
                        </Button>
                    </div>
                </Fragment>;
            })}
        </div>
        <ChoiceModal
            choice={currentChoice}
            isOpen={isModalOpen}
            onSave={updateChoice}
            onClose={() => {
                setCurrentChoice(null);
                setIsModalOpen(false);
            }}
        />
    </Card>;
};
