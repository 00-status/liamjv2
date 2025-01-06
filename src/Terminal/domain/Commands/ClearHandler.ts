
import { IHandler } from "../types";

export const ClearHandler: IHandler = {
    execute(
        command,
        terminal,
        setTerminal
    ): string {
        return new Array(18).fill('\n').join("");
    }
}
