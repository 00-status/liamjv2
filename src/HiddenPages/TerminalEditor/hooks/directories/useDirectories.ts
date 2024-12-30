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
    isLoadingDirectories: boolean;
    isDeletingDirectory: boolean;
    directories: Array<Directory>;
    fetchDirectories: (serverId: number) => void;
    createDirectory: (directory: Directory) => void;
    deleteDirectory: (serverId: number, DirectoryId: number) => void;
};

export const useDirectories = (): UseDirectories => {
    const [isLoadingDirectories, setIsLoadingDirectories] = useState(false);
    const [directories, setDirectories] = useState<Array<Directory>>([]);

    const fetchDirectories = useCallback((serverId: number) => {
        setIsLoadingDirectories(true);
        fetch("/api/1/terminal_directories?server_id=" + serverId)
            .then(response => response.json())
            .then(json => setDirectories(json))
            .finally(() => setIsLoadingDirectories(false));
    }, [setDirectories]);

    const { createDirectory } = useCreateDirectory(fetchDirectories);
    const { isDeleting, deleteDirectory } = useDeleteDirectory(fetchDirectories);

    return {
        isLoadingDirectories,
        isDeletingDirectory: isDeleting,
        directories,
        fetchDirectories,
        createDirectory,
        deleteDirectory
    };
};
