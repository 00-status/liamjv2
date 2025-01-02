import { useCallback, useState } from "react";

export type File = {
    id: number;
    directoryId: number;
    name: string;
    contents: string;
    encryptionCode: string;
    creatorUserName: string;
    dateCreated: string;
    dateModified: string;
};

type UseFiles = {
    files: Array<File>;
    isLoadingFiles: boolean;
    fetchFiles: (directoryId: number) => void;
};

export const useFiles = (): UseFiles => {
    const [files, setFiles] = useState<Array<File>>([]);
    const [isLoadingFiles, setIsLoadingFiles] = useState<boolean>(false);

    const fetchFiles = useCallback((directoryId: number) => {
        setIsLoadingFiles(true);
        fetch("/api/1/terminal_files?directory_id=" + directoryId)
            .then(response => response.json())
            .then(json => setFiles(json))
            .finally(() => setIsLoadingFiles(false));
    }, [setFiles, setIsLoadingFiles]);

    return {
        files,
        isLoadingFiles,
        fetchFiles
    };
};
