import { navigateDirectories } from "../navigateDirectories";
import { IHandler } from "../types";

export const ListHandler: IHandler = {
    execute(
        command,
        terminal,
        setTerminal
    ): string {
        const { directories, currentDirectory } = terminal;

        const commandChunks: string[] = command.text.trim().split(' ');
        const directoryToMoveTo: string = commandChunks[1] ?? '.';

        const newDirectory = navigateDirectories(
            directoryToMoveTo.split("/"),
            directories,
            currentDirectory
        );

        const childDirectories = directories.filter((directory) => {
            return newDirectory.subDirectories.find(childDirectoryId => childDirectoryId === directory.id);
        });

        const subDirectories = childDirectories.map(directory => '{dir}\t' + directory.name);
        const files = newDirectory.files.map(file => '{file}\t' + file.name);

        return [...subDirectories, ...files].join("\n");
    }
}