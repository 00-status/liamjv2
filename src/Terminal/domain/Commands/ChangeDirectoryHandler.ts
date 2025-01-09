import { navigateDirectories } from "../navigateDirectories";
import { IHandler } from "../types";

export const ChangeDirectoryHandler: IHandler = {
    execute: function (
        command,
        terminal,
        setTerminal
    ): string {
        const { directories, currentDirectory } = terminal;

        if (!currentDirectory) {
            return '';
        }

        const commandChunks: string[] = command.trim().split(' ');
        const directoryToMoveTo: string = commandChunks[1] ?? '.';

        const newDirectory = navigateDirectories(
            directoryToMoveTo.split("/"),
            directories,
            currentDirectory
        );

        setTerminal({...terminal, currentDirectory: newDirectory});

        return '';
    }
};
