
import './die.css';
import { rollDie } from './util';

type Props = {
    diceType: number;
    callback: (generatedNumber: number, diceRolled: string, individualRolls: string[]) => void;
};

export const Die = (props: Props) => {
    const generateNumber = () => {
        const result = rollDie(props.diceType);

        props.callback(result, '1d' + props.diceType, ['1d' + props.diceType + '=' + result]);
    };

    return <button className='die' onClick={generateNumber}>{props.diceType}</button>;
};
