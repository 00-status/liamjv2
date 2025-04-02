import { Fragment } from 'react';

import "./choices-table.css";
import { Choice } from "../../domain/types";
import { Button, ButtonTheme } from "../../../../SharedComponents/Button/Button";
import { TrashIcon } from "../../../../SharedComponents/Icons/TrashIcon";
import { Card } from "../../../../SharedComponents/Card/Card";

type Props = {
    choices: Array<Choice>;
    onChange: (choices: Array<Choice>) => void;
};

export const ChoicesTable = (props: Props) => {

    const deleteChoice = (id: string) => {
        const choicesCopy = [...choices];
        const choiceToDeleteIndex = choicesCopy.findIndex(choice => choice.id === id);

        if (choiceToDeleteIndex === -1) {
            return;
        }
        
        choicesCopy.splice(choiceToDeleteIndex, 1);
        onChange(choicesCopy);
    };

    const {choices, onChange} = props;

    return <Card title="Choices">
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
    </Card>;
};
