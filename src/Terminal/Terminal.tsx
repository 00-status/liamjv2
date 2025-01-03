import { useEffect, useRef, useState } from "react";
import { gtag } from "ga-gtag";

import './terminal.css';
import { Command, ICommand, TerminalDirectory, validCommands } from "./domain/types";
import { directories, startingDirectory } from "./domain/directories";
import { findNextFileSystemObject } from "./domain/findNextFileSystemObject";

type Output = {
    id: string;
    output: string;
};

export type TerminalState = {
    serverName: string;
    directories: Map<string, TerminalDirectory>;
    currentDirectory: TerminalDirectory;
    commandHistory: Array<Command>;
    outputs: Array<Output>;
};

export const Terminal = () => {
    const [terminal, setTerminal] = useState<TerminalState>(
        {
            serverName: 'local',
            directories: directories,
            currentDirectory: startingDirectory,
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
                {terminal.serverName + '@' + currentCommand.workingDirectory + '% '}
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
                                    { id: crypto.randomUUID(), output: terminal.serverName + '@' + currentCommand.workingDirectory + '% ' + currentCommand.text },
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
    const command: ICommand|undefined = validCommands.get(textCommand[0]);

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
