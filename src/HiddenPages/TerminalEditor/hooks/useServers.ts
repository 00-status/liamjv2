import { useCallback, useState } from "react";
import { useCreateServer } from "./useCreateServer";

type Server = {
    id: number;
    name: string;
};

type UseServers = {
    servers: Array<Server>;
    fetchServers: () => void;
    createServer: (serverName: string) => void;
};

export const useServers = (): UseServers => {
    // TODO: Add a loading state to the fetch.
    const [servers, setServers] = useState<Array<Server>>([]);

    const fetchServers = useCallback(() => {
        fetch("/api/1/terminal_servers")
            .then(response => response.json())
            .then(json => setServers(json));
    }, [setServers]);

    const { createServer } = useCreateServer(fetchServers);

    return { servers, fetchServers, createServer };
};
