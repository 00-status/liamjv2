import { Story } from 'inkjs';
import { useEffect, useState } from 'react';

import { Button } from '../SharedComponents/Button/Button';

import { useFetchStoryJSON } from './hooks/useFetchStoryJSON';

type Props = {
    storyFileName: string;
};

export const StoryBook = ({ storyFileName }: Props) => {
    const rawStory = useFetchStoryJSON(storyFileName);

    const [inkStory, setInkStory] = useState<null | Story>(null);
    const [log, setLog] = useState<string>('');

    useEffect(() => {
        if (!rawStory) {
            return;
        }

        const newInkStory = new Story(rawStory);
        newInkStory.ContinueMaximally();

        // TODO: Register observable variables.

        setInkStory(newInkStory);
    }, [rawStory]);

    if (!inkStory) {
        return;
    }

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
