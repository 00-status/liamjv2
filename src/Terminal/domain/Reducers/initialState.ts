import { directories, startingDirectory } from "../directories";
import { Command, TerminalDirectory } from "../types";

type Output = {
    id: string;
    output: string;
};

type TerminalState = {
    serverName: string,
    directories: Map<string, TerminalDirectory>,
    currentDirectory: TerminalDirectory,
    commandHistory: Array<Command>,
    outputs: Array<Output>,
};

export const initialState: TerminalState = {
    serverName: "local",
    directories: directories,
    currentDirectory: startingDirectory,
    commandHistory: [],
    outputs: []
};
