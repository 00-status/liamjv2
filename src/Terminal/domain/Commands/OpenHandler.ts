import { navigateDirectories } from "../navigateDirectories";
import { IHandler, TerminalFile } from "../types";

export const OpenHandler: IHandler = {
    execute(
        command,
        terminal,
        setTerminal
    ): string {
        const {directories, currentDirectory} = terminal;

        const splitCommandText = command.text.trim().split(" ");

        const filePathGroups = splitCommandText[1].split("/");

        var file: TerminalFile | null = null;
        if (filePathGroups.length > 1) {
            const fileName = filePathGroups.pop();
            const directory = navigateDirectories(filePathGroups, directories, currentDirectory);

            file = directory.files.get(fileName ?? '') ?? null;
        } else {
            file = currentDirectory.files.get(filePathGroups[0]) ?? null;
        }

        if (file) {
            return file.contents;
        } else {
            return 'No such file exists!';
        }
    }
}