import { Story } from 'inkjs';
import { SetStateAction, useEffect, useState } from 'react';

import { Button } from '../SharedComponents/Button/Button';

import { useFetchStoryJSON } from './hooks/useFetchStoryJSON';
import { StoneTowerGameState } from './StoneTowerPage';

type Props = {
    storyFileName: string;
    variablesNamesToObserve: Array<string>;
    setGameState: (gameState: SetStateAction<StoneTowerGameState>) => void;
    exitStory: () => void;
};

export const StoryBook = ({
    storyFileName,
    variablesNamesToObserve,
    setGameState,
    exitStory,
}: Props) => {
    const rawStory = useFetchStoryJSON(storyFileName);

    const [inkStory, setInkStory] = useState<null | Story>(null);
    const [log, setLog] = useState<string>('');

    useEffect(() => {
        if (!rawStory) {
            return;
        }

        const newInkStory = new Story(rawStory);
        newInkStory.ContinueMaximally();

        setInkStory(newInkStory);
    }, [rawStory]);

    useEffect(() => {
        if (!inkStory) {
            return;
        }

        const observerFunction = (
            observerVariableName: string,
            newValue: Story.VariableObserver,
        ) => {
            queueMicrotask(() => {
                setGameState((state) => ({
                    ...state,
                    [observerVariableName]: newValue,
                }));
            });
        };
        variablesNamesToObserve.map((name) => {
            return inkStory.ObserveVariable(name, observerFunction);
        });

        return () => {
            variablesNamesToObserve.forEach((name) => {
                inkStory.RemoveVariableObserver(observerFunction, name);
            });
        };
    }, [inkStory, variablesNamesToObserve]);

    if (!inkStory) {
        return;
    }

    const makeChoice = (choiceIndex: number) => {
        inkStory.ChooseChoiceIndex(choiceIndex);
        const text = inkStory.ContinueMaximally();
        setLog((state) => state + text);

        if (inkStory.currentChoices.length <= 0) {
            exitStory();
        }
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
