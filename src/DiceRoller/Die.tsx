
import './die.css';

type Props = {
    diceType: number;
    callback: (generatedNumber: number) => void;
};

export const Die = (props: Props) => {
    const generateNumber = () => {
        const min = Math.ceil(1);
        const max = Math.floor(props.diceType);

        const result = Math.floor(Math.random() * (max - min + 1)) + min;

        props.callback(result);
    };

    return <button className='die' onClick={generateNumber}>{props.diceType}</button>;
};
