
import { servers } from "../directories";
import { IHandler } from "../types";

export const ConnectHandler: IHandler = {
    execute(
        command,
        terminal,
        setTerminal
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

        setTerminal({
            ...terminal,
            serverName,
            directories: newServers,
            currentDirectory: newRootDirectory
        });

        return "Connecting to " + serverName + "...";
    }
}
