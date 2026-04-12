import './stone-tower-page.css';
import { Story } from 'inkjs';
import { useEffect, useState } from 'react';

import RawStory from '../assets/stone_tower.ink.json';
import { Button } from '../SharedComponents/Button/Button';

export const StoneTowerPage = () => {
    return (
        <div className="stone-tower-page">
            <h1>Stone Tower</h1>
            <div>
                <h2>Variables</h2>
                <div>Player Is Prepared: {playerIsPrepared ? 'Yes' : 'No'}</div>
            </div>
        </div>
    );
};
