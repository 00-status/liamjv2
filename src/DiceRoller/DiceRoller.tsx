import { ReactElement, useState } from "react";

import './dice-roller.css';
import { Page } from "../SharedComponents/Page/Page";
import { Die } from "./Die";

export const DiceRoller = (): ReactElement => {
    const [generatedNumber, setGeneratedNumber] = useState<number|null>(null);

    return <Page title="Dice Roller">
        <div className="dice-roller">
            <div className="dice-roller--summary">
                <div>
                    <h1>Overview</h1>
                    <div>
                        <h2>Result</h2>
                        <div>{generatedNumber}</div>
                    </div>
                    <div>
                        <h2>Dice Rolled</h2>
                        <div>Dice Rolled Value</div>
                    </div>
                </div>
                <div>
                    <h2>Log</h2>
                    <textarea></textarea>
                </div>
            </div>
            <div>
                {dice.map((die: number) => <Die key={die} diceType={die} callback={setGeneratedNumber} />)}
            </div>
            <div>
                <h1>Custom Dice rolls</h1>
            </div>
            <div>
                <h1>Roll for stats</h1>
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
