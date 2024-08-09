import { ReactElement, useState } from "react";

import './dice-roller.css';
import { Page } from "../../SharedComponents/Page/Page";
import { Die } from "./Die";
import { CustomDiceRoller } from "./CustomDiceRoller";

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

    const footer = <>
        UIcons by <a target="_blank" rel="noopener noreferrer" href="https://www.flaticon.com/uicons">Flaticon</a>
    </>;

    const routes = [
        { label: 'About', route: '/' },
        { label: 'Dice Roller', route: '/dice_roller' },
        { label: 'Weapon Maker', route: '/weapon_maker' },
    ];

    return <Page title="Liam Johnson" routes={routes} footer={footer}>
        <div className="dice-roller">
            <div className="">
                <h1>Dice Roller</h1>
                <div className="dice-roller--summary">
                    <div className="dice-roller--results-container">
                        <div className="dice-roller--result">
                            <h1>{generatedNumber ? generatedNumber : "--"}</h1>
                            <hr className="divider" />
                            <div>Result</div>
                        </div>
                        <div className="dice-roller--result">
                            <h1>{diceRolled ? diceRolled : "--"}</h1>
                            <hr className="divider" />
                            <div>Dice rolled</div>
                        </div>
                    </div>
                    <div className="dice-roller--log-container">
                        <h2>Log</h2>
                        <textarea readOnly className="dice-roller--log" defaultValue={diceLog.join('\r\n')} />
                    </div>
                </div>
            </div>
            <hr className="divider" />
            <div className="dice-container">
                {dice.map((die: number) => <Die key={die} diceType={die} callback={onDieClick} />)}
            </div>
            <div>
                <CustomDiceRoller callback={onDieClick} />
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
    20
];
