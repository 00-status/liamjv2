import { ReactElement, useState } from "react";

import './custom-dice-roller.css';

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

    // component to enter dice roller
    //      Dice roll name |
    //      Number of dice text box
    //      Dice type text box
    //      Roll dice button
    //      Save dice roll |
    //          Disabled until a name, number of dice, and dice type are enterred. |

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
        <div>
            <hr className="divider" />
        </div>
    </div>;
};

function rollDie(diceType: number): number {
    const min = Math.ceil(1);
    const max = Math.floor(diceType);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

