import './stone-tower-page.css';
import { Story } from 'inkjs';
import { useEffect, useState } from 'react';

import RawStory from '../assets/stone_tower.ink.json';
import { Button } from '../SharedComponents/Button/Button';

export const StoneTowerPage = () => {
    const [inkStory] = useState<Story>(new Story(RawStory));
    const [playerIsPrepared, setPlayerIsPrepared] = useState();
    const [log, setLog] = useState<string>('');

    useEffect(() => {
        inkStory.ObserveVariable('player_is_prepared', (name, newValue) => {
            setPlayerIsPrepared(newValue);
        });

        console.log(inkStory.variablesState['player_is_prepared']);

        setLog((state) => state + inkStory.ContinueMaximally());
    }, []);

    const makeChoice = (choiceIndex: number) => {
        inkStory.ChooseChoiceIndex(choiceIndex);
        setLog((state) => state + inkStory.ContinueMaximally());
    };

    return (
        <div className="stone-tower-page">
            <h1>Stone Tower</h1>
            <div>
                <h2>Variables</h2>
                <div>Player Is Prepared: {playerIsPrepared ? 'Yes' : 'No'}</div>
            </div>
            <div>
                <h2>Log</h2>
                <div className="stone-tower-page__log">{log}</div>
            </div>
            {inkStory.currentChoices.map((choice) => (
                <Button key={choice.pathStringOnChoice} onClick={() => makeChoice(choice.index)}>
                    {choice.text}
                </Button>
            ))}
        </div>
    );
};
