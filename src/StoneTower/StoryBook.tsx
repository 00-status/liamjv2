import { Story } from 'inkjs';
import { useEffect, useState } from 'react';

import RawStory from '../assets/stone_tower.ink.json';
import { Button } from '../SharedComponents/Button/Button';

import { useFetchStoryJSON } from './hooks/useFetchJSON';

type Props = {
    storyFileName: string;
};

export const StoryBook = ({ storyFileName }: Props) => {
    const rawStory = useFetchStoryJSON(storyFileName);

    const [inkStory] = useState<Story>(new Story(rawStory));
    const [playerIsPrepared, setPlayerIsPrepared] = useState();
    const [log, setLog] = useState<string>('');

    useEffect(() => {
        inkStory.ObserveVariable('player_is_prepared', (name, newValue) => {
            setPlayerIsPrepared(newValue);
        });

        setLog((state) => state + inkStory.ContinueMaximally());
    }, []);

    const makeChoice = (choiceIndex: number) => {
        inkStory.ChooseChoiceIndex(choiceIndex);
        setLog((state) => state + inkStory.ContinueMaximally());
    };

    return (
        <div>
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
