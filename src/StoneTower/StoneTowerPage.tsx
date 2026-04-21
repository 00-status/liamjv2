import { useMemo, useState } from 'react';

import './stone-tower-page.css';
import { StoryBook } from './StoryBook';
import { StoryCatalogue } from './StoryCatalogue';

export type StoneTowerGameState = {
    currentDay: number;
    defences: number;
    armies: number;
    supply: number;
    alliesAndBoons: Array<string>;
    isPlayerPrepared: boolean;
    commanderAstel: boolean;
};

export const StoneTowerPage = () => {
    const [gameState, setGameState] = useState<StoneTowerGameState>({
        currentDay: 1,
        defences: 25,
        armies: 1,
        supply: 100,
        alliesAndBoons: [],
        isPlayerPrepared: false,
        commanderAstel: false,
    });
    const [currentStory, setCurrentStory] = useState<string | null>(null);
    const [traversedStories, setTraversedStories] = useState<Array<string>>([]);

    const gameStateList = useMemo(() => Object.keys(gameState), [gameState]);

    return (
        <div className="stone-tower-page">
            <div className="stone-tower-page__header">
                <h1 className="stone-tower-page__title">Stone Tower</h1>
            </div>
            <div className="stone-tower-page__stats">
                <div>
                    <h2>Day {gameState.currentDay}</h2>
                    <div>
                        <p>Defences: {gameState.defences} / 100</p>
                        <p>Armies: {gameState.armies}</p>
                        <p>Supply: {gameState.supply}</p>
                    </div>
                </div>
                <div>
                    <h3>Allies and Boons</h3>
                    {gameState.alliesAndBoons.map((ally) => (
                        <div key={ally}>
                            {ally}: {ally}
                        </div>
                    ))}
                </div>
            </div>
            {currentStory && (
                <StoryBook
                    storyFileName={currentStory}
                    variablesNamesToObserve={gameStateList}
                    setGameState={setGameState}
                    exitStory={() => setCurrentStory(null)}
                />
            )}
            {!currentStory ? (
                <StoryCatalogue
                    traversedStories={traversedStories}
                    updateCurrentStory={(newStory) => {
                        setCurrentStory(newStory);
                        setTraversedStories((state) => [...state, newStory]);
                    }}
                />
            ) : null}
        </div>
    );
};
