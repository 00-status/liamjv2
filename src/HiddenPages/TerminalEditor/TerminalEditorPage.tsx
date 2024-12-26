import { useEffect, useState } from "react";

import "./terminal-editor-page.css";
import { Page } from "../../SharedComponents/Page/Page";
import { TextInput } from "../../SharedComponents/TextInput/TextInput";
import { useServers } from "./hooks/useServers";
import { Button, ButtonTheme } from "../../SharedComponents/Button/Button";
import { TrashIcon } from "../../SharedComponents/Icons/TrashIcon";

export const TerminalEditorPage = () => {
    // ToDO
    //      Fetch Servers ✅
    //      Create Server ✅
    //      Delete Server
    //      Fetch Directories
    //      Create Directories

    const [newServerName, setNewServerName] = useState<string>("");

    const { servers, fetchServers, createServer, deleteServer } = useServers();

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
                {servers.map(server => <div>{server.name} <Button buttonTheme={ButtonTheme.Delete} onClick={() => deleteServer(server.id)}><TrashIcon /></Button></div>)}
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
