import { Directory } from "../hooks/directories/useDirectories";
import { File } from "../hooks/files/useFiles";
import { navigateDirectories } from "./navigateDirectories";
import { Command } from "./types";

export const findNextFileSystemObject = (
    command: Command,
    setCommand: (command: Command) => void,
    directories: Array<Directory>,
    currentDirectory: Directory
): void => {
    const commandStringGroups = command.text.trim().split(" ");

    if (commandStringGroups.length <= 1) {
        return;
    }

    const filePathGroups = commandStringGroups[1].split("/");
    const fileName = filePathGroups[filePathGroups.length -1];

    const workingDirectory = findWorkingDirectory(filePathGroups, directories, currentDirectory);

    const childDirectoryNames = findChildDirectories(fileName, directories, currentDirectory);
    const fileNames = findFiles(fileName, workingDirectory);

    const potentialNames = [...childDirectoryNames, ...fileNames];

    if (potentialNames.length > 0) {
        const commandStringGroups = command.text.trim().split(" ");
        const basePath = filePathGroups.length > 1
            ? filePathGroups.slice(0, -1).join("/") + "/"
            : "";
        const newPath = `${commandStringGroups[0]} ${basePath ? `${basePath}` : ""}${potentialNames[0]}`;

        setCommand({ ...command, text: newPath });
    }
};

const findWorkingDirectory = (
    filePathGroups: Array<string>,
    directories: Array<Directory>,
    currentDirectory: Directory
): Directory => {
    if (filePathGroups.length > 1) {
        return navigateDirectories(filePathGroups, directories, currentDirectory);
    } else {
        return currentDirectory;
    }
};

const findChildDirectories = (
    fileName: string,
    directories: Array<Directory>,
    workingDirectory: Directory
): Array<string> => {
    const childDirectories = directories.filter((directory) => {
        return workingDirectory.subDirectories.find(childDirectoryId => childDirectoryId === directory.id);
    });

    return childDirectories
        .filter((directory: Directory) => {
            return directory.name.startsWith(fileName);
        })
        .map(directory => directory.name);
};

const findFiles = (
    fileName: string,
    workingDirectory: Directory
): Array<string> => {
    return workingDirectory.files
        .filter((file: File) => {
            return file.name.startsWith(fileName);
        })
        .map(file => file.name);
};
