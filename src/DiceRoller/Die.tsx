
import { ReactElement } from 'react';

import './die.css';
import { Dice4 } from '../SharedComponents/Icons/Dice4';
import { rollDie } from './util';
import { Dice6 } from '../SharedComponents/Icons/Dice6';
import { Dice8 } from '../SharedComponents/Icons/Dice8';
import { Dice10 } from '../SharedComponents/Icons/Dice10';
import { Dice12 } from '../SharedComponents/Icons/Dice12';
import { Dice20 } from '../SharedComponents/Icons/Dice20';

type Props = {
    diceType: number;
    callback: (generatedNumber: number, diceRolled: string, individualRolls: string[]) => void;
};

export const Die = (props: Props) => {
    const generateNumber = () => {
        const result = rollDie(props.diceType);

        props.callback(result, '1d' + props.diceType, ['1d' + props.diceType + '=' + result]);
    };

    return <button className='die' onClick={generateNumber}>{getDiceComponent(props.diceType)}</button>;
};

const getDiceComponent = (diceType: number): ReactElement => {
    switch (diceType) {
        case 4:
            return <Dice4 className='die--icon' />
        default:
        case 6:
            return <Dice6 className='die--icon' />
        case 8:
            return <Dice8 className='die--icon' />
        case 10:
            return <Dice10 className='die--icon' />
        case 12:
            return <Dice12 className='die--icon' />
        case 20:
            return <Dice20 className='die--icon' />
    }
};
