import { directories, startingDirectory } from "../directories";
import { Command, TerminalDirectory } from "../types";
import { ChangeDirectoryHandler } from "./ChangeDirectoryHandler";

describe('ChangeDirectoryCommand', () => {
    const setServerName = jest.fn();
    const setDirectories = jest.fn();
    const setCurrentDirectory = jest.fn();

    it('should enter a subdirectory', () => {
        const executedCommand: Command = {
            id: 'test-1',
            text: 'cd ./documents',
            workingDirectory: '/'
        };

        ChangeDirectoryHandler.execute(
            executedCommand,
            [],
            setServerName,
            directories,
            setDirectories,
            startingDirectory,
            setCurrentDirectory,
            []
        );

        const expectedDirectory = directories.get('/documents');
        expect(setCurrentDirectory).toHaveBeenCalledTimes(1);
        expect(setCurrentDirectory).toHaveBeenCalledWith(expectedDirectory);
    });

    it('should enter a subdirectory from the root directory', () => {
        const executedCommand: Command = {
            id: 'test-1',
            text: 'cd /documents',
            workingDirectory: '/'
        };

        const startingDirectory = directories.get('/emails/john');
        ChangeDirectoryHandler.execute(
            executedCommand,
            [],
            setServerName,
            directories,
            setCurrentDirectory,
            startingDirectory as TerminalDirectory,
            setCurrentDirectory,
            []
        );

        const expectedDirectory = directories.get('/documents');
        expect(setCurrentDirectory).toHaveBeenCalledTimes(1);
        expect(setCurrentDirectory).toHaveBeenCalledWith(expectedDirectory);
    });

    it('should enter multiple sub-directories', () => {
        const executedCommand: Command = {
            id: 'test-1',
            text: 'cd ./emails/john',
            workingDirectory: '/'
        };

        ChangeDirectoryHandler.execute(
            executedCommand,
            [],
            setServerName,
            directories,
            setCurrentDirectory,
            startingDirectory,
            setCurrentDirectory,
            []
        );

        const expectedDirectory = directories.get('/emails/john');
        expect(setCurrentDirectory).toHaveBeenCalledTimes(1);
        expect(setCurrentDirectory).toHaveBeenCalledWith(expectedDirectory);
    });

    it('should enter a parent directory', () => {
        const executedCommand: Command = {
            id: 'test-1',
            text: 'cd ../',
            workingDirectory: '/'
        };

        const startingDirectory = directories.get('/emails/john')
        ChangeDirectoryHandler.execute(
            executedCommand,
            [],
            setServerName,
            directories,
            setCurrentDirectory,
            startingDirectory as TerminalDirectory,
            setCurrentDirectory,
            []
        );

        const expectedDirectory = directories.get('/emails');
        expect(setCurrentDirectory).toHaveBeenCalledTimes(1);
        expect(setCurrentDirectory).toHaveBeenCalledWith(expectedDirectory);
    });

    it('should enter multiple parent directories', () => {
        const executedCommand: Command = {
            id: 'test-1',
            text: 'cd ../../',
            workingDirectory: '/'
        };

        const startingDirectory = directories.get('/emails/john');
        ChangeDirectoryHandler.execute(
            executedCommand,
            [],
            setServerName,
            directories,
            setCurrentDirectory,
            startingDirectory as TerminalDirectory,
            setCurrentDirectory,
            []
        );

        const expectedDirectory = directories.get('/');
        expect(setCurrentDirectory).toHaveBeenCalledTimes(1);
        expect(setCurrentDirectory).toHaveBeenCalledWith(expectedDirectory);
    });

    it('should move up multiple parent directories and enter a child directory', () => {
        const executedCommand: Command = {
            id: 'test-1',
            text: 'cd ../../documents',
            workingDirectory: '/'
        };

        const startingDirectory = directories.get('/emails/john')
        ChangeDirectoryHandler.execute(
            executedCommand,
            [],
            setServerName,
            directories,
            setCurrentDirectory,
            startingDirectory as TerminalDirectory,
            setCurrentDirectory,
            []
        );

        const expectedDirectory = directories.get('/documents');
        expect(setCurrentDirectory).toHaveBeenCalledTimes(1);
        expect(setCurrentDirectory).toHaveBeenCalledWith(expectedDirectory);
    });

    it('should enter a sub-directory, move up two directories, and then enter a sub-directory.', () => {
        const executedCommand: Command = {
            id: 'test-1',
            text: 'cd ./john/../../documents',
            workingDirectory: '/'
        };

        const startingDirectory = directories.get('/emails')
        ChangeDirectoryHandler.execute(
            executedCommand,
            [],
            setServerName,
            directories,
            setCurrentDirectory,
            startingDirectory as TerminalDirectory,
            setCurrentDirectory,
            []
        );

        const expectedDirectory = directories.get('/documents');
        expect(setCurrentDirectory).toHaveBeenCalledTimes(1);
        expect(setCurrentDirectory).toHaveBeenCalledWith(expectedDirectory);
    });

    it('should enter the root directory.', () => {
        const executedCommand: Command = {
            id: 'test-1',
            text: 'cd /',
            workingDirectory: '/'
        };

        const startingDirectory = directories.get('/emails/john')
        ChangeDirectoryHandler.execute(
            executedCommand,
            [],
            setServerName,
            directories,
            setCurrentDirectory,
            startingDirectory as TerminalDirectory,
            setCurrentDirectory,
            []
        );

        const expectedDirectory = directories.get('/');
        expect(setCurrentDirectory).toHaveBeenCalledTimes(1);
        expect(setCurrentDirectory).toHaveBeenCalledWith(expectedDirectory);
    });
});
