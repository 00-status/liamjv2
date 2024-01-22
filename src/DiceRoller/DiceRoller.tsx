import { ReactElement, useState } from "react";

import './dice-roller.css';
import { Page } from "../SharedComponents/Page/Page";
import { Die } from "./Die";
import { CustomDieRoller } from "./CustomDieRoller";

export const DiceRoller = (): ReactElement => {
    const [generatedNumber, setGeneratedNumber] = useState<number|null>(null);
    const [diceRolled, setDiceRolled] = useState<string|null>(null);
    const [diceLog, setDiceLog] = useState<Array<string>>([]);

    const onDieClick = (diceResult: number, diceRolled: string, individualRolls: string[]) => {
        setGeneratedNumber(diceResult);
        setDiceRolled(diceRolled);

        setDiceLog((state) => {
            return [
                ...individualRolls,
                ...state
            ];
        });
    };

    return <Page title="Dice Roller">
        <div className="dice-roller">
            <div className="">
                <h1>Overview</h1>
                <div className="dice-roller--summary">
                    <div>
                        <div className="dice_roller--result">
                            <h1>{generatedNumber ? generatedNumber : "--"}</h1>
                            <hr className="divider" />
                            <div>Result</div>
                        </div>
                        <div className="dice_roller--result">
                            <h1>{diceRolled ? diceRolled : "--"}</h1>
                            <hr className="divider" />
                            <div>Dice Rolled</div>
                        </div>
                    </div>
                    <div className="dice_roller--log-container">
                        <h2>Log</h2>
                        <textarea readOnly className="dice_roller--log" defaultValue={diceLog.join('\r\n')} />
                    </div>
                </div>
            </div>
            <hr className="divider" />
            <div className="dice-container">
                {dice.map((die: number) => <Die key={die} diceType={die} callback={onDieClick} />)}
            </div>
            <div>
                <h1>Custom Dice Rolls</h1>
                <CustomDieRoller callback={onDieClick} />
            </div>
            <div>
                <h1>Roll For Stats</h1>
            </div>
        </div>
    </Page>;
};

const dice: Array<number> = [
    4,
    6,
    8,
    10,
    12,
    20,
    100
];
