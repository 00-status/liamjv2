import { ReactElement, useState } from "react";

import './custom-dice-roller.css';
import { rollDie } from "./util";

type Props = {
    callback: (diceResult: number, diceRolled: string, diceLog: string[]) => void;
};

type DiceRollResults = {
    total: number,
    diceRollResults: string[]
};

export const CustomDiceRoller = (props: Props): ReactElement => {
    const [diceCount, setDiceCount] = useState<number|null>(2);
    const [diceType, setDiceType] = useState<number>(6);

    const rollDice = () => {
        const diceTotals = [...Array(diceCount)].reduce<DiceRollResults>((acc) => {
            const rollResult = rollDie(diceType);

            return {
                total: acc.total + rollResult,
                diceRollResults: [...acc.diceRollResults, "1d" + diceType + "=" + rollResult]
            };
        }, { total: 0, diceRollResults: [] });

        props.callback(
            diceTotals.total,
            diceCount + 'd' + diceType,
            [
                '-- ' + diceCount + 'd' + diceType + '=' + diceTotals.total + ' --',
                ...diceTotals.diceRollResults,
                ''
            ]
        );
    };

    return <div className="custom-dice-roller">
        <div className="custom-dice-roller--form">
            <input
                className="custom-dice-roller--input"
                type="number"
                value={diceCount ? diceCount : ''}
                onChange={(event) => 
                    setDiceCount(event.target.value
                        ? Number(event.target.value)
                        : null
                    )
                }
            />
            <div>d</div>
            <input
                className="custom-dice-roller--input"
                value={diceType}
                onChange={(event) => setDiceType(Number(event.target.value))}
                type="number"
            />
            <button className="custom-dice-roller--button" onClick={rollDice}>Roll</button>
        </div>
    </div>;
};
