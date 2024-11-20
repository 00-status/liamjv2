import { ChangeDirectoryCommand } from "./Commands/ChangeDirectoryCommand";
import { ClearCommand } from "./Commands/ClearCommand";
import { ConnectCommand } from "./Commands/ConnectCommand";
import { HelpCommand } from "./Commands/HelpCommand";
import { HistoryCommand } from "./Commands/HistoryCommand";
import { ListCommand } from "./Commands/ListCommand";
import { OpenCommand } from "./Commands/OpenCommand";
import { WorkingDirectoryCommand } from "./Commands/WorkingDirectoryCommand";

export type TerminalDirectory = {
    name: string;
    dateCreated: string; // 2024-01-01 00:00:00
    parent: string | null;
    subDirectories: Array<string>;
    files: Map<string, TerminalFile>;
}

export type TerminalFile = {
    name: string;
    contents: string;
    creatorUsername: string;
    dateCreated: string;
    dateModified: string;
};

export type Command = {
    id: string;
    text: string;
    workingDirectory: string;
};

export interface ICommand {
    execute(
        command: Command,
        commandHistory: Array<Command>,
        directories: Map<string, TerminalDirectory>,
        setDirectories: (directories: Map<string, TerminalDirectory>) => void,
        currentDirectory: TerminalDirectory,
        setCurrentDirectory: (directory: TerminalDirectory) => void,
        args: Array<string>
    ): string;
};

export const validCommands = new Map<string, ICommand>([
    ["help", HelpCommand],
    ["history", HistoryCommand],
    ['cd', ChangeDirectoryCommand],
    ['list', ListCommand],
    ['ls', ListCommand],
    ['open', OpenCommand],
    ['connect', ConnectCommand],
    ['clear', ClearCommand],
    ['clera', ClearCommand],
    ['pwd', WorkingDirectoryCommand],
]);
