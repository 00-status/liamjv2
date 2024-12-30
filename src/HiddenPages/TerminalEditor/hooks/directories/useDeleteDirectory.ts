import { useCallback } from "react";

type UseDeleteDirectory = {
    deleteDirectory: (serverID: number, directoryID: number) => void;
};

export const useDeleteDirectory = (fetchDirectories: (id: number) => void): UseDeleteDirectory => {
    const deleteDirectory = useCallback((serverID: number, DirectoryID: number) => {
        fetch("/api/1/terminal_directories/" + DirectoryID, {
            method: "DELETE",
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                fetchDirectories(serverID);
            });
    }, []);

    return { deleteDirectory };
};
