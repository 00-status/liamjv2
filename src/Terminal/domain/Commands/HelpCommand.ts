import { ICommand, Command, TerminalDirectory } from "../types";

export const HelpCommand: ICommand = {
    execute(
        command: Command,
        commandHistory: Array<Command>,
        directories: Map<string, TerminalDirectory>,
        currentDirectory: TerminalDirectory,
        setCurrentDirectory: (directory: TerminalDirectory) => void,
        args: Array<string>
    ): string {
        return helpString;
    }
}

const helpString = `
cd\t| Moves into a parent or child directory. | cd ./{directory_name} OR cd ../ OR cd ../{directory_name}

clear\t| clears terminal output.

help\t| lists all commands.

history\t| lists all previously executed commands.

list/ls\t| lists all directories and files within the working directory.

open\t| opens files. | open {file_name} OR open ./{directory_name}/{file_name} OR open ../{directory_name}/{file_name}
`;
