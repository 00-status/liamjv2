
import { ICommand } from "../types";

export const ClearCommand: ICommand = {
    execute(
        command,
        terminal,
        setTerminal
    ): string {
        return new Array(18).fill('\n').join("");
    }
}
