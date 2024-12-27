import { useCallback } from "react";

import { Directory } from "./useDirectories";

type UseCreateDirectory = {
    createDirectory: (directory: Directory) => void;
};

export const useCreateDirectory = (fetchDirectories: (serverId: number) => void): UseCreateDirectory => {
    const createDirectory = useCallback((directory: Directory) => {
        const directoryJson = JSON.stringify(directory);

        fetch("/api/1/terminal_directories", {
            method: "POST",
            body: directoryJson,
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                fetchDirectories(directory.serverId);
        });
    }, []);

    return {
        createDirectory
    };
};
