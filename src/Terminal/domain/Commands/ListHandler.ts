import { navigateDirectories } from "../navigateDirectories";
import { IHandler } from "../types";

export const ListHandler: IHandler = {
    execute(
        command,
        terminal,
        setTerminal
    ): string {
        const commandChunks: string[] = command.text.trim().split(' ');
        const directoryToMoveTo: string = commandChunks[1] ?? '.';

        const newDirectory = navigateDirectories(
            directoryToMoveTo.split("/"),
            terminal.directories,
            terminal.currentDirectory
        );

        const subDirectories = [...newDirectory.subDirectories].map(directory => '{dir}\t' + directory);
        const files = [...newDirectory.files.keys()].map(file => '{file}\t' + file);

        return [...subDirectories, ...files].join("\n");
    }
}