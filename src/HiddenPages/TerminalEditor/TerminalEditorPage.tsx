import { useEffect, useState } from "react";

import "./terminal-editor-page.css";
import { Page } from "../../SharedComponents/Page/Page";
import { TextInput } from "../../SharedComponents/TextInput/TextInput";
import { Button } from "../../SharedComponents/Button/Button";
import { ServerItem } from "./ServerItem";
import { useServers } from "./hooks/server/useServers";
import { useDirectories } from "./hooks/directories/useDirectories";

export const TerminalEditorPage = () => {
    // ToDO
    //      Fetch Servers ✅
    //      Create Server ✅
    //      Delete Server ✅
    //      Directories
    //          READ ✅
    //          Create
    //          Delete
    //      Create Directories

    const [newServerName, setNewServerName] = useState<string>("");
    const [selectedServerId, setSelectedServerId] = useState<number|null>(null);

    const { servers, fetchServers, createServer, deleteServer } = useServers();
    const { directories, fetchDirectories } = useDirectories();

    useEffect(() => {
        fetchServers();
    }, []);

    useEffect(() => {
        if (selectedServerId) {
            fetchDirectories(selectedServerId);
        }
    }, [selectedServerId]);

    const onServerDelete = (serverId: number) => {
        setSelectedServerId(null);
        deleteServer(serverId);
    };

    return <Page title="Terminal Editor" routes={[]}>
        <div className="terminal-editor-page">
            <div className="terminal-editor-page__server-list">
                <div className="terminal-editor-page__server-input">
                    <TextInput placeholder="server name" value={newServerName} onChange={(value) => setNewServerName(value || "")} />
                    <Button onClick={() => createServer(newServerName)} >Submit</Button>
                </div>
                {servers.map(server => <ServerItem
                    key={server.id}
                    server={server}
                    onServerDelete={onServerDelete}
                    onServerClick={() => setSelectedServerId(server.id)}
                />)}
            </div>
            <div>
                <div className="terminal-editor-page__server-input">
                    <TextInput placeholder="server name" value={newServerName} onChange={(value) => setNewServerName(value || "")} />
                    <Button onClick={() => createServer(newServerName)}>Submit</Button>
                </div>
                {directories.map(directory => directory.name)}
            </div>
            <div>
                Directory Editor
            </div>
        </div>
        <div>File Modal</div>
    </Page>;
};
