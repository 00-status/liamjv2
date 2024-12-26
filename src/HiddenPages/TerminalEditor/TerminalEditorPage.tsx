import { useEffect, useState } from "react";
import { Page } from "../../SharedComponents/Page/Page";
import { TextInput } from "../../SharedComponents/TextInput/TextInput";
import { useServers } from "./hooks/useServers";
import { Button } from "../../SharedComponents/Button/Button";
import { useCreateServer } from "./hooks/useCreateServer";

export const TerminalEditorPage = () => {
    // ToDO
    //      Fetch Servers
    //      Create Server
    //      Fetch Directories
    //      Create Directories

    const [newServerName, setNewServerName] = useState<string>("");

    const { servers, fetchServers } = useServers();
    const { createServer } = useCreateServer();

    useEffect(() => {
        fetchServers();
    }, []);

    return <Page title="Terminal Editor" routes={[]}>
        <div>
            <div>
                <div>
                    <TextInput value={newServerName} onChange={(value) => setNewServerName(value || "")} />
                    <Button onClick={() => createServer(newServerName)} >Submit</Button>
                </div>
                {servers.map(server => server.name)}
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
