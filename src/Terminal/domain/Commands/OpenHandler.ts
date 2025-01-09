import { Directory } from "../../hooks/directories/useDirectories";
import { File } from "../../hooks/files/useFiles";
import { navigateDirectories } from "../navigateDirectories";
import { IHandler } from "../types";

export const OpenHandler: IHandler = {
    execute(
        command,
        terminal,
        setTerminal
    ): string {
        const {directories, currentDirectory} = terminal;

        const path = command.replace(/^open\s+/, "").trim();
        const fileName = path.split("/").pop() ?? "";

        const file = findFile(path, fileName, directories, currentDirectory);

        return file ? file.contents : 'No such file exists!';
    }
}

const findFile = (
    path: string,
    fileName: string,
    directories: Array<Directory>,
    currentDirectory: Directory
): File | null => {
    const directory = navigateDirectories(path.split("/"), directories, currentDirectory);

    const fileToOpen = directory.files.find(directory => directory.name === fileName);
    return fileToOpen ?? null;
};
