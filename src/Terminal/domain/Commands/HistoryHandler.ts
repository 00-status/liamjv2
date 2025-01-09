import { IHandler } from "../types";

export const HistoryHandler: IHandler = {
    execute(
        command,
        terminal,
        setTerminal
    ): string {
        return terminal.commandHistory.map(historicalCommand => historicalCommand.text.trim()).join("\n");
    }
}