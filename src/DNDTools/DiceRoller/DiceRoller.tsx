import { ReactElement, useState } from "react";
import { gtag } from "ga-gtag";

import './dice-roller.css';
import { Page } from "../../SharedComponents/Page/Page";
import { Die } from "./Die";
import { CustomDiceRoller } from "./CustomDiceRoller";
import { dndRoutes } from "../domain";
import { Anchor } from "../../SharedComponents/Link/Anchor";

const DiceRoller = (): ReactElement => {
    const [animationKey, setAnimationKey] = useState<number>(0);

    const [generatedNumber, setGeneratedNumber] = useState<number|null>(null);
    const [diceRolled, setDiceRolled] = useState<string|null>(null);
    const [diceLog, setDiceLog] = useState<Array<string>>([]);

    const onDieClick = (diceResult: number, diceRolled: string, individualRolls: string[]) => {
        if (diceRolled === "1d20") {
            gtag("event", "button_click_die_twenty");
        }

        setAnimationKey(animationKey + 1);

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
        UIcons by <Anchor link="https://www.flaticon.com/uicons" displayText="Flaticon" />
    </>;

    return <Page title="D&D Tools" routes={dndRoutes} footer={footer}>
        <div className="dice-roller">
            <div className="">
                <h1>Dice Roller</h1>
                <div className="dice-roller--summary">
                    <div className="dice-roller--results-container">
                        <div className="dice-roller--result">
                            <h1 key={animationKey} className="dice-roller__result--value">
                                {generatedNumber ? generatedNumber : "--"}
                            </h1>
                            <hr className="divider" />
                            <div>Result</div>
                        </div>
                        <div className="dice-roller--result">
                            <h1>
                                {diceRolled ? diceRolled : "--"}
                            </h1>
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

export default DiceRoller;
