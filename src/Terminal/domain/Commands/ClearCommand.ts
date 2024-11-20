
import { ICommand, Command, TerminalDirectory } from "../types";

export const ClearCommand: ICommand = {
    execute(
        command: Command,
        commandHistory: Array<Command>,
        directories: Map<string, TerminalDirectory>,
        currentDirectory: TerminalDirectory,
        setCurrentDirectory: (directory: TerminalDirectory) => void,
        args: Array<string>
    ): string {
        return new Array(18).fill('\n').join("");
    }
}
