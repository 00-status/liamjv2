import { startingDirectory } from "./directories";
import { TerminalDirectory } from "./types";

// TODO: Surface errors related to unknown directories
export const navigateDirectories = (
    directoryGroups: Array<string>,
    directories: Map<string, TerminalDirectory>,
    currentDirectory: TerminalDirectory
): TerminalDirectory => {
    var carry: TerminalDirectory = currentDirectory;
    directoryGroups.forEach((group: string, index: number) => {
        switch (group) {
            case '.':
                // Current directory, no change
                break;
            case '..':
                const newDirectory = moveUpDirectory(directories, carry);
                if (newDirectory) {
                    carry = newDirectory;
                }
                break;
            case '':
                if (index === 0) {
                    carry = startingDirectory;
                }
                break;
            default:
                const newSubDirectory = moveDownDirectory(directories, carry, group);
                if (newSubDirectory) {
                    carry = newSubDirectory;
                }
                break;
        }
    });

    return carry;
};

const moveUpDirectory = (directories: Map<string, TerminalDirectory>, currentDirectory: TerminalDirectory): TerminalDirectory | null => {
    const parentDirectory = directories.get(currentDirectory.parent ?? '');
    return parentDirectory ?? null;
};

const moveDownDirectory = (directories: Map<string, TerminalDirectory>, currentDirectory: TerminalDirectory, desiredDirectory: string): TerminalDirectory | null => {
    const formattedDirectory = (currentDirectory.parent ?? '') + currentDirectory.name + '/' + desiredDirectory;
    const newDirectory = directories.get(formattedDirectory);

    return newDirectory ?? null;
};
