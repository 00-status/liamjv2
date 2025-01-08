import { IHandler } from "../types";

export const WorkingDirectoryHandler: IHandler = {
    execute(
        command,
        terminal,
        setTerminal
    ): string {
        const {currentDirectory} = terminal;

        const parent = currentDirectory.parent;

        if (parent === null) {
            return '/';
        }

        if (parent.length > 1) {
            return parent + '/' + currentDirectory.name;
        }

        return parent + currentDirectory.name;
    }
}