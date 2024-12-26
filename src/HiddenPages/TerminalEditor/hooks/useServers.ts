import { useCallback, useState } from "react";

type Server = {
    id: number;
    name: string;
};

type UseServers = {
    servers: Array<Server>;
    fetchServers: () => void;
};

export const useServers = (): UseServers => {
    const [servers, setServers] = useState<Array<Server>>([]);

    const fetchServers = useCallback(() => {
        fetch("/api/1/terminal_servers")
            .then(response => response.json())
            .then(json => setServers(json));
    }, [setServers]);

    return { servers, fetchServers };
};
