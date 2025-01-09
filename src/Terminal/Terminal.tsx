import { useEffect, useRef, useState } from "react";
import { gtag } from "ga-gtag";

import './terminal.css';
import { Command, IHandler, validCommands } from "./domain/types";
import { findNextFileSystemObject } from "./domain/findNextFileSystemObject";
import { Server } from "./hooks/server/useServers";
import { Directory } from "./hooks/directories/useDirectories";
import { TerminalInput } from "./TerminalInput";

type Output = {
    id: string;
    output: string;
};

export type TerminalState = {
    servers: Array<Server>;
    currentServer: Server;
    directories: Array<Directory>;
    currentDirectory: Directory;
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
    const { servers, directories, fetchDirectories } = props;

    const [terminal, setTerminal] = useState<TerminalState>(
        {
            servers: servers,
            currentServer: servers[0],
            directories: directories,
            currentDirectory: directories[0],
            fetchDirectories,
            commandHistory: [],
            outputs: [
                { id: crypto.randomUUID(), output: 'Welcome. Type "help" for a list of commands' }
            ]
        }
    );

    const [currentCommand, setCurrentCommand] = useState<Command>(createNewCommand());

    const outputRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const currentDirectory = directories[0];
        setTerminal((terminalState) => {
            return {
                ...terminalState,
                directories,
                currentDirectory,
                outputs: [
                    ...terminalState.outputs,
                    {
                        id: crypto.randomUUID(),
                        output: '\nSuccessfully connected to: ' + terminalState.currentServer.name
                    }
                ]
            };
        });
    }, [directories, setTerminal]);

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

    const commandPrefix = terminal.currentServer.name + '@' + terminal.currentDirectory.name + '% ';

    return <div className="terminal">
        <div className="terminal__output-wrapper" ref={outputRef}>
            {terminal.outputs.map((output) => <div className="terminal__output" key={output.id}>{output.output}</div>)}
        </div>
        <TerminalInput
            prefixText={commandPrefix}
            currentCommandText={currentCommand.text}
            onChange={(newValue) => setCurrentCommand({ ...currentCommand, text: newValue })}
            onEnter={() => {
                const commandResult = executeCommand(terminal, setTerminal, currentCommand);

                setTerminal((state) => {
                    return {
                        ...state,
                        outputs: [
                            ...terminal.outputs,
                            { id: crypto.randomUUID(), output: commandPrefix + currentCommand.text },
                            { id: crypto.randomUUID(), output: commandResult }
                        ],
                        commandHistory: [
                            ...terminal.commandHistory,
                            currentCommand
                        ]
                    };
                });

                setCurrentCommand(createNewCommand());
            }}
            onTab={() => {
                findNextFileSystemObject(
                    currentCommand,
                    setCurrentCommand,
                    terminal.directories,
                    terminal.currentDirectory
                );
            }}
        />
    </div>;
};

const createNewCommand = (): Command => {
    return { id: crypto.randomUUID(), text: '' };
};

const executeCommand = (
    terminal: TerminalState,
    setTerminal: (terminalState: TerminalState) => void,
    currentCommand: Command
): string => {
    const textCommand = currentCommand.text.split(' ');
    const command: IHandler|undefined = validCommands.get(textCommand[0]);

    if (!command) {
        return "Command not found!";
    }

    gtag("event", "terminal_command", {
        "value": textCommand[0]
    });

    return command.execute(
        currentCommand,
        terminal,
        setTerminal,
    );
};
