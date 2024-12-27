import { useEffect, useState } from "react";

import "./terminal-editor-page.css";
import { Page } from "../../SharedComponents/Page/Page";
import { TextInput } from "../../SharedComponents/TextInput/TextInput";
import { Button } from "../../SharedComponents/Button/Button";
import { ServerItem } from "./ServerItem";
import { useServers } from "./hooks/server/useServers";

export const TerminalEditorPage = () => {
    // ToDO
    //      Fetch Servers ✅
    //      Create Server ✅
    //      Delete Server ✅
    //      Directories
    //          READ
    //          Create
    //          Delete
    //      Create Directories

    const [newServerName, setNewServerName] = useState<string>("");

    const { servers, fetchServers, createServer, deleteServer } = useServers();

    useEffect(() => {
        fetchServers();
    }, []);

    return <Page title="Terminal Editor" routes={[]}>
        <div className="terminal-editor-page">
            <div className="terminal-editor-page__server-list">
                <div className="terminal-editor-page__server-input">
                    <TextInput value={newServerName} onChange={(value) => setNewServerName(value || "")} />
                    <Button onClick={() => createServer(newServerName)} >Submit</Button>
                </div>
                {servers.map(server => <ServerItem key={server.id} server={server} onServerDelete={deleteServer} />)}
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
