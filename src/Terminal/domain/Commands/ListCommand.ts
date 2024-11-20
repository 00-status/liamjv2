import { navigateDirectories } from "../navigateDirectories";
import { ICommand, Command, TerminalDirectory } from "../types";

export const ListCommand: ICommand = {
    execute(
        command: Command,
        commandHistory: Array<Command>,
        directories: Map<string, TerminalDirectory>,
        setDirectories: (directories: Map<string, TerminalDirectory>) => void,
        currentDirectory: TerminalDirectory,
        setCurrentDirectory: (directory: TerminalDirectory) => void,
        args: Array<string>
    ): string {
        const commandChunks: string[] = command.text.trim().split(' ');
        const directoryToMoveTo: string = commandChunks[1] ?? '.';

        const newDirectory = navigateDirectories(directoryToMoveTo.split("/"), directories, currentDirectory);

        const subDirectories = [...newDirectory.subDirectories].map(directory => '{dir}\t' + directory);
        const files = [...newDirectory.files.keys()].map(file => '{file}\t' + file);

        return [...subDirectories, ...files].join("\n");
    }
}