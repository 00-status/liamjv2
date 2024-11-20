
import { servers } from "../directories";
import { ICommand, Command, TerminalDirectory } from "../types";

export const ConnectCommand: ICommand = {
    execute(
        command: Command,
        commandHistory: Array<Command>,
        directories: Map<string, TerminalDirectory>,
        setDirectories: (directories: Map<string, TerminalDirectory>) => void,
        currentDirectory: TerminalDirectory,
        setCurrentDirectory: (directory: TerminalDirectory) => void,
        args: Array<string>
    ): string {
        const splitCommand = command.text.trim().split(" ");

        if (splitCommand.length != 2) {
            return "Cannot connect to server!";
        }

        const serverName = splitCommand[1];

        const newServers = servers[serverName];

        if (!newServers) {
            return "Cannot Connect to server!";
        }

        // Set the new server.
        // Set the new current directories.
        return "Connecting to " + serverName + "...";
    }
}
