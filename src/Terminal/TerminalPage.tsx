import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { gtag } from 'ga-gtag';

import './terminal-page.css';
import { Terminal } from "./Terminal";
import { CodeBlockGenerator } from './CodeBlockGenerator';
import { HomeIcon, HomeThemes } from '../SharedComponents/Icons/HomeIcon';
import { useServers } from './hooks/server/useServers';
import { useDirectories } from './hooks/directories/useDirectories';


export const TerminalPage = () => {
    const navigate = useNavigate();

    document.title = "Terminal";

    useEffect(() => {
        gtag("event", "page_view", {
            "page_location": "/terminal",
            "page_title": "Terminal"
        });
    }, [gtag]);

    const { servers, fetchServers } = useServers();
    const { directories, fetchDirectories } = useDirectories();

    useEffect(() => {
        if (servers.length === 0) {
            fetchServers();
        }

        if (servers.length > 0) {
            fetchDirectories(servers[0].id);
        }
    }, [servers, fetchServers, fetchDirectories]);

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
                {servers.length !== 0 && directories.length !== 0
                    ? <Terminal servers={servers} directories={directories} fetchDirectories={fetchDirectories} />
                    : null
                }
            </div>
        </div>
    </div>;
};
