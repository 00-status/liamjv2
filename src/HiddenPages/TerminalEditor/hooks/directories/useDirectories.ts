import { useCallback, useState } from "react";
import { useCreateDirectory } from "./useCreateDirectory";
import { useDeleteDirectory } from "./useDeleteDirectory";

export type Directory = {
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
    createDirectory: (directory: Directory) => void;
    deleteDirectory: (serverId: number, DirectoryId: number) => void;
};

export const useDirectories = (): UseDirectories => {
    const [directories, setDirectories] = useState<Array<Directory>>([]);

    const fetchDirectories = useCallback((serverId: number) => {
        fetch("/api/1/terminal_directories?server_id=" + serverId)
            .then(response => response.json())
            .then(json => setDirectories(json));
    }, [setDirectories]);

    const { createDirectory } = useCreateDirectory(fetchDirectories);
    const { deleteDirectory } = useDeleteDirectory(fetchDirectories);

    return {
        directories,
        fetchDirectories,
        createDirectory,
        deleteDirectory
    };
};
