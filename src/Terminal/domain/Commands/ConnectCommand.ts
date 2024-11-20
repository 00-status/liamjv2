
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
        const newRootDirectory = newServers?.get("/");

        if (!newServers || !newRootDirectory) {
            return "Cannot Connect to server!";
        }

        // TODO: Set the new server name.
        setDirectories(newServers);
        setCurrentDirectory(newRootDirectory);
        return "Connecting to " + serverName + "...";
    }
}
