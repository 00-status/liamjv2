import { Directory } from "../hooks/directories/useDirectories";
import { navigateDirectories } from "./navigateDirectories";
import { Command, TerminalDirectory } from "./types";

export const findNextFileSystemObject = (
    command: Command,
    setCommand: (command: Command) => void,
    directories: Array<Directory>,
    currentDirectory: TerminalDirectory
): void => {
    const commandStringGroups = command.text.trim().split(" ");

    if (commandStringGroups.length <= 1) {
        return;
    }

    const filePathGroups = commandStringGroups[1].split("/");
    const newFilePath = findFileName(filePathGroups, directories, currentDirectory);

    if (newFilePath) {
        setCommand({ ...command, text: commandStringGroups[0] + " " + newFilePath });
    }
};

const findFileName = (
    filePathGroups: Array<string>,
    directories: Array<Directory>,
    currentDirectory: TerminalDirectory
): string | null => {
    if (filePathGroups.length > 1) {
        const fileName = filePathGroups.pop();
        const directory = navigateDirectories(filePathGroups, directories, currentDirectory);

        const potentialFiles = [...directory.files.keys(), ...directory.subDirectories];
        const filteredFiles = potentialFiles.filter((file: string) => fileName ? file.startsWith(fileName) : false);

        return filteredFiles.length > 0
            ? filePathGroups.join("/") + "/" + filteredFiles[0]
            : null;
    } else {
        const potentialFiles = [...currentDirectory.files.keys(), ...currentDirectory.subDirectories];
        const filteredFiles = potentialFiles.filter((file: string) => file.startsWith(filePathGroups[0]));

        return filteredFiles.length > 0
            ? filteredFiles[0]
            : null;
    }
};
