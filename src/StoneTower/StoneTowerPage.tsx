import { useMemo, useState } from 'react';

import './stone-tower-page.css';
import { StoryBook } from './StoryBook';
import { StoryCatalogue } from './StoryCatalogue';

export type StoneTowerGameState = {
    isPlayerPrepared: boolean;
};

export const StoneTowerPage = () => {
    const [gameState, setGameState] = useState<StoneTowerGameState>({ isPlayerPrepared: false });
    const [currentStory, setCurrentStory] = useState<string | null>(null);

    const gameStateList = useMemo(() => Object.keys(gameState), [gameState]);

    return (
        <div className="stone-tower-page">
            <h1>Stone Tower</h1>
            <div>
                <h2>Variables</h2>
                <div>Player Is Prepared: {gameState.isPlayerPrepared ? 'Yes' : 'No'}</div>
            </div>
            {currentStory && (
                <StoryBook
                    storyFileName={currentStory}
                    variablesNamesToObserve={gameStateList}
                    setGameState={setGameState}
                    exitStory={() => setCurrentStory(null)}
                />
            )}
            {!currentStory ? <StoryCatalogue updateCurrentStory={setCurrentStory} /> : null}
        </div>
    );
};
