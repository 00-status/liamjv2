import { useEffect, useState } from "react";

import "./terminal-editor-page.css";
import { Page } from "../../SharedComponents/Page/Page";
import { TextInput } from "../../SharedComponents/TextInput/TextInput";
import { Button } from "../../SharedComponents/Button/Button";
import { ServerItem } from "./ServerItem";
import { useServers } from "./hooks/server/useServers";
import { Directory, useDirectories } from "./hooks/directories/useDirectories";

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

    const [newDirectoryName, setNewDirectoryName] = useState<string>("");

    const { servers, fetchServers, createServer, deleteServer } = useServers();
    const { directories, fetchDirectories, createDirectory } = useDirectories();

    useEffect(() => {
        fetchServers();
    }, []);

    useEffect(() => {
        if (selectedServerId) {
            fetchDirectories(selectedServerId);
        }
    }, [selectedServerId]);

    const onServerDelete = (serverId: number) => {
        if (serverId === selectedServerId) {
            setSelectedServerId(null);
        }

        deleteServer(serverId);
    };

    return <Page title="Terminal Editor" routes={[]}>
        <div className="terminal-editor-page">
            <div className="terminal-editor-page__server-list">
                <div className="terminal-editor-page__server-input">
                    <TextInput
                        placeholder="server name"
                        value={newServerName}
                        onChange={(value) => setNewServerName(value || "")}
                    />
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
                {selectedServerId && <div className="terminal-editor-page__server-input">
                    <TextInput
                        placeholder="directory name"
                        value={newDirectoryName}
                        onChange={(value) => setNewDirectoryName(value || "")}
                    />
                    <Button onClick={() => {
                        if (selectedServerId && newDirectoryName) {
                            const newDirectory: Directory = {
                                id: 0,
                                serverId: selectedServerId,
                                name: newDirectoryName,
                                dateCreated: (new Date()).toISOString(),
                                parentDirectory: 0,
                                subDirectories: [],
                                files: []
                            };
                            createDirectory(newDirectory);
                        }
                    }}>
                        Submit
                    </Button>
                </div>}
                {directories.map(directory => directory.name)}
            </div>
            <div>
                Directory Editor
            </div>
        </div>
        <div>File Modal</div>
    </Page>;
};
