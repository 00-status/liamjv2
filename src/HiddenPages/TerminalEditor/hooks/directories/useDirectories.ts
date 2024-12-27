import { useCallback, useState } from "react";

type Directory = {
    id: number;
    serverId: number;
    name: string;
    dateCreated: string;
    parentDirectory: number;
    subDirectories: Array<number>;
    files: Array<any>;
};

type UseDirectories = {
    directories: Array<Directory>;
    fetchDirectories: (serverId: number) => void;
};

export const useDirectories = (): UseDirectories => {
    const [directories, setDirectories] = useState<Array<Directory>>([]);

    const fetchDirectories = useCallback((serverId: number) => {
        fetch("/api/1/terminal_directories?server_id=" + serverId)
            .then(response => response.json())
            .then(json => setDirectories(json));
    }, [setDirectories]);

    return {
        directories,
        fetchDirectories
    };
};
