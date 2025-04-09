import './die.css';
import { rollDie } from './util';
import { Icon, IconType } from '../../SharedComponents/Icon/Icon';

type Props = {
    diceType: number;
    callback: (generatedNumber: number, diceRolled: string, individualRolls: string[]) => void;
};

export const Die = (props: Props) => {
    const generateNumber = () => {
        const result = rollDie(props.diceType);

        props.callback(result, '1d' + props.diceType, ['1d' + props.diceType + '=' + result]);
    };

    return <button className='die' onClick={generateNumber}>
        <Icon iconType={getDieType(props.diceType)} />
    </button>;
};

const getDieType = (diceType: number): IconType => {
    switch (diceType) {
        case 4:
            return IconType.DICE4;
        default:
        case 6:
            return IconType.DICE6;
        case 8:
            return IconType.DICE8;
        case 10:
            return IconType.DICE10;
        case 12:
            return IconType.DICE12;
        case 20:
            return IconType.DICE20;
    }
};
