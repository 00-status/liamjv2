import { ICommand } from "../types";

export const HistoryCommand: ICommand = {
    execute(
        command,
        terminal,
        setTerminal
    ): string {
        return terminal.commandHistory.map(command => command.text.trim()).join("\n");
    }
}