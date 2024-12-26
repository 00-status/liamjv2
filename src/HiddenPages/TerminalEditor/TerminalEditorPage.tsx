import { useEffect, useState } from "react";

import "./terminal-editor-page.css";
import { Page } from "../../SharedComponents/Page/Page";
import { TextInput } from "../../SharedComponents/TextInput/TextInput";
import { useServers } from "./hooks/useServers";
import { Button } from "../../SharedComponents/Button/Button";

export const TerminalEditorPage = () => {
    // ToDO
    //      Fetch Servers
    //      Create Server
    //      Fetch Directories
    //      Create Directories

    const [newServerName, setNewServerName] = useState<string>("");

    const { servers, fetchServers, createServer } = useServers();

    useEffect(() => {
        fetchServers();
    }, []);

    return <Page title="Terminal Editor" routes={[]}>
        <div className="terminal-editor-page">
            <div className="terminal-editor-page__server-list">
                <div>
                    <TextInput value={newServerName} onChange={(value) => setNewServerName(value || "")} />
                    <Button onClick={() => createServer(newServerName)} >Submit</Button>
                </div>
                {servers.map(server => <div>{server.name}</div>)}
            </div>
            <div>
                Directory List
            </div>
            <div>
                Directory Editor
            </div>
        </div>
        <div>File Modal</div>
    </Page>;
};
