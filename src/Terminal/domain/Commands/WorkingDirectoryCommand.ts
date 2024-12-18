import { ICommand, Command, TerminalDirectory } from "../types";

export const WorkingDirectoryCommand: ICommand = {
    execute(
        command: Command,
        commandHistory: Array<Command>,
        setServerName: (serverName: string) => void,
        directories: Map<string, TerminalDirectory>,
        setDirectories: (directories: Map<string, TerminalDirectory>) => void,
        currentDirectory: TerminalDirectory,
        setCurrentDirectory: (directory: TerminalDirectory) => void,
        args: Array<string>
    ): string {
        const parent = currentDirectory.parent;

        if (parent === null) {
            return '/';
        }

        if (parent.length > 1) {
            return parent + '/' + currentDirectory.name;
        }

        return parent + currentDirectory.name;
    }
}