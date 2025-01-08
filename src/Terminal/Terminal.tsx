import { useEffect, useRef, useState } from "react";
import { gtag } from "ga-gtag";

import './terminal.css';
import { Command, IHandler, TerminalDirectory, validCommands } from "./domain/types";
import { startingDirectory } from "./domain/directories";
import { findNextFileSystemObject } from "./domain/findNextFileSystemObject";
import { Server } from "./hooks/server/useServers";
import { Directory } from "./hooks/directories/useDirectories";

type Output = {
    id: string;
    output: string;
};

export type TerminalState = {
    servers: Array<Server>;
    currentServer: Server;
    directories: Array<Directory>;
    currentDirectory: TerminalDirectory;
    fetchDirectories: (serverId: number) => void;
    commandHistory: Array<Command>;
    outputs: Array<Output>;
};

type Props = {
    servers: Array<Server>;
    directories: Array<Directory>;
    fetchDirectories: (serverId: number) => void;
};

export const Terminal = (props: Props) => {
    // Fetch servers from API
    // Fetch assocciated Directories and Files from API
    // if the server response is null or the request has not completed yet
    //      Return null
    // else
    //      set the directories in the TerminalState

    // Switching Servers
    // Find requested server from server list
    // If the server exists in the list
    //      Request directories and files from API
    // else
    //      Stay on the current server.

    // New terminalState:
    // type TerminalState = {
    //     servers: Array<Server>;
    //     currentServer: string;
    //     directories: Map<string, TerminalDirectory>;
    //     currentDirectory: TerminalDirectory;
    //     fetchDirectories: (serverId: number) => void;
    //     commandHistory: Array<Command>;
    //     outputs: Array<Output>;
    // }

    const { servers, directories, fetchDirectories } = props;

    const [terminal, setTerminal] = useState<TerminalState>(
        {
            servers: servers,
            currentServer: servers[0],
            directories: directories,
            currentDirectory: startingDirectory,
            fetchDirectories,
            commandHistory: [],
            outputs: [
                { id: crypto.randomUUID(), output: 'Welcome. Type "help" for a list of commands' }
            ]
        }
    );

    const [currentCommand, setCurrentCommand] = useState<Command>(createNewCommand(terminal.currentDirectory.name));

    const inputRef = useRef<HTMLInputElement | null>(null);
    const outputRef = useRef<HTMLDivElement | null>(null);

    const onInputWrapperClick = () => {
        inputRef.current?.focus();
    };

    useEffect(() => {
        setCurrentCommand((state) => {
            return {...state, workingDirectory: terminal.currentDirectory.name}
        })
    }, [terminal.currentDirectory]);

    useEffect(() => {
        if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
    }, [outputRef, terminal.outputs]);

    return <div className="terminal">
        <div className="terminal__output-wrapper" ref={outputRef}>
            {terminal.outputs.map((output) => <div className="terminal__output" key={output.id}>{output.output}</div>)}
        </div>
        <div onClick={onInputWrapperClick} className="terminal__input-wrapper">
            <div>
                {terminal.currentServer.name + '@' + currentCommand.workingDirectory + '% '}
            </div>
            <input
                ref={inputRef}
                autoFocus
                className="terminal__input"
                value={currentCommand.text}
                onChange={(event) => {
                    const newValue = event.target.value ?? '';

                    setCurrentCommand({ ...currentCommand, text: newValue });
                }}
                onKeyUp={(event) => {
                    if (event.key === 'Enter' && currentCommand.text) {
                        const result = executeCommand(
                            terminal,
                            setTerminal,
                            currentCommand,
                        );

                        setTerminal((state) => {
                            return {
                                ...state,
                                outputs: [
                                    ...terminal.outputs,
                                    { id: crypto.randomUUID(), output: terminal.currentServer.name + '@' + currentCommand.workingDirectory + '% ' + currentCommand.text },
                                    { id: crypto.randomUUID(), output: result }
                                ],
                                commandHistory: [
                                    ...terminal.commandHistory,
                                    currentCommand
                                ]
                            };
                        });

                        setCurrentCommand(createNewCommand(terminal.currentDirectory.name));
                    }

                    if (event.key === 'Tab' && currentCommand.text) {
                        findNextFileSystemObject(
                            currentCommand,
                            setCurrentCommand,
                            terminal.directories,
                            terminal.currentDirectory
                        );
                    }
                }}
                onKeyDown={(event) => {
                    if (event.key === "Tab") {
                        event.preventDefault();
                    }
                }}
            />
        </div>
    </div>;
};

const createNewCommand = (directoryName: string): Command => {
    return { id: crypto.randomUUID(), text: '', workingDirectory: directoryName };
};

const executeCommand = (
    terminal: TerminalState,
    setTerminal: (terminalState: TerminalState) => void,
    currentCommand: Command
): string => {
    const textCommand = currentCommand.text.split(' ');
    const command: IHandler|undefined = validCommands.get(textCommand[0]);

    if (command) {
        gtag("event", "terminal_command", {
            "value": textCommand[0]
        });

        return command.execute(
            currentCommand,
            terminal,
            setTerminal,
        );
    } else {
        return 'Command not found!'
    }
};
