import { navigateDirectories } from "../navigateDirectories";
import { ICommand } from "../types";

export const ChangeDirectoryCommand: ICommand = {
    execute: function (
        command,
        terminal,
        setTerminal
    ): string {
        const {directories, currentDirectory} = terminal;

        const commandChunks: string[] = command.text.trim().split(' ');
        const directoryToMoveTo: string = commandChunks[1] ?? '.';

        const newDirectory = navigateDirectories(
            directoryToMoveTo.split("/"),
            directories,
            currentDirectory
        );

        console.log(newDirectory);

        setTerminal({...terminal, currentDirectory: newDirectory});

        return '';
    }
};
