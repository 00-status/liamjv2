import { ICommand, Command, TerminalDirectory } from "../types";

export const HistoryCommand: ICommand = {
    execute(
        command: Command,
        commandHistory: Array<Command>,
        directories: Map<string, TerminalDirectory>,
        currentDirectory: TerminalDirectory,
        setCurrentDirectory: (directory: TerminalDirectory) => void,
        args: Array<string>
    ): string {
        return commandHistory.map(command => command.text.trim()).join("\n");
    }
}