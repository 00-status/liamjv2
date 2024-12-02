import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import './terminal-page.css';
import { Terminal } from "./Terminal";
import { CodeBlockGenerator } from './CodeBlockGenerator';
import { HomeIcon, HomeThemes } from '../SharedComponents/Icons/HomeIcon';
import { gtag } from 'ga-gtag';

export const TerminalPage = () => {
    const navigate = useNavigate();

    document.title = "Terminal";

    useEffect(() => {
        gtag("event", "page_view", {
            "page_location": "/terminal",
            "page_title": "Terminal"
        });
    }, [gtag]);

    return <div className="terminal-page">
        <div className="terminal-page__header">
            <h1 className="terminal-page__title">
                Terminal
            </h1>
            <div className="terminal-page__nav">
                <a className='terminal-page__link' onClick={() => navigate("/")}>
                    <HomeIcon theme={HomeThemes.GREEN} /> Landing
                </a>
                <a className='terminal-page__link terminal-page__link--active' onClick={() => navigate("#")}>
                    Terminal
                </a>
            </div>
        </div>
        <div className='terminal-page__content'>
            <div className="terminal-page__background">
                {[...Array(10).keys()].map((value: number) => <CodeBlockGenerator key={value} />)}
            </div>
            <div className="terminal-page__foreground">
                <Terminal />
            </div>
        </div>
    </div>;
};
