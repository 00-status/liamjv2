import { Page } from "../../SharedComponents/Page/Page";
import { useServers } from "./hooks/useServers";

export const TerminalEditorPage = () => {
    // ToDO
    //      Fetch Servers
    //      Create Server
    //      Fetch Directories
    //      Create Directories

    const { servers } = useServers();

    return <Page title="Terminal Editor" routes={[]}>
        <div>
            <div>
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
