import { useEffect, useRef, useState } from "react";

import './terminal.css';
import { Command, ICommand, TerminalDirectory, validCommands } from "./domain/types";
import { directories, startingDirectory } from "./domain/directories";
import { findNextFileSystemObject } from "./domain/findNextFileSystemObject";

type Output = {
    id: string;
    output: string;
};

export const Terminal = () => {
    // create a currentDirectories, setCurrentDirectories local state
    // Add a currentServer property to the "Command" type.
    //      Use currentServer in the outputs
    // Pass currentDirectories and setCurrentDirectories into the "ICommand" interface.s
    // the connect ICommand will
    //      Accept a server name as an argument.
    //      If the does NOT exist
    //          return an error message.
    //      else
    //          use setCurrentDirectories to switch to the new directory hierarchy.
    // Have the directory-focused commands pull from the currentDirectories Map.

    const [server, setServer] = useState<string>("local");
    const [currentDirectories, setCurrentDirectories] = useState<Map<string, TerminalDirectory>>(directories);
    const [currentDirectory, setCurrentDirectory] = useState<TerminalDirectory>(startingDirectory);

    const [commandHistory, setCommandHistory] = useState<Array<Command>>([]);

    const [currentCommand, setCurrentCommand] = useState<Command>(createNewCommand(currentDirectory.name));
    const [outputs, setOutputs] = useState<Array<Output>>([
        { id: crypto.randomUUID(), output: 'Welcome. Type "help" for a list of commands' }
    ]);

    const inputRef = useRef<HTMLInputElement | null>(null);
    const outputRef = useRef<HTMLDivElement | null>(null);

    const onInputWrapperClick = () => {
        inputRef.current?.focus();
    };

    useEffect(() => {
        setCurrentCommand((state) => {
            return {...state, workingDirectory: currentDirectory.name}
        })
    }, [currentDirectory]);

    useEffect(() => {
        if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
    }, [outputRef, outputs]);

    return <div className="terminal">
        <div className="terminal__output-wrapper" ref={outputRef}>
            {outputs.map((output) => <div className="terminal__output" key={output.id}>{output.output}</div>)}
        </div>
        <div onClick={onInputWrapperClick} className="terminal__input-wrapper">
            <div>
                {'terminal@' + currentCommand.workingDirectory + '% '}
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
                            commandHistory,
                            currentCommand,
                            currentDirectories,
                            currentDirectory,
                            setCurrentDirectory
                        );

                        setOutputs([
                            ...outputs,
                            { id: crypto.randomUUID(), output: 'terminal@' + currentCommand.workingDirectory + '% ' + currentCommand.text },
                            { id: crypto.randomUUID(), output: result }
                        ]);
                        setCommandHistory([...commandHistory, currentCommand]);
                        setCurrentCommand(createNewCommand(currentDirectory.name));
                    }

                    if (event.key === 'Tab' && currentCommand.text) {
                        findNextFileSystemObject(currentCommand, setCurrentCommand, currentDirectory);
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
    commandHistory: Array<Command>,
    currentCommand: Command,
    currentDirectories: Map<string, TerminalDirectory>,
    currentDirectory: TerminalDirectory,
    setCurrentDirectory: (directory: TerminalDirectory) => void
): string => {
    const command: ICommand|undefined = validCommands.get(currentCommand.text.split(' ')[0]);

    if (command) {
        return command.execute(
            currentCommand,
            commandHistory,
            currentDirectories,
            currentDirectory,
            setCurrentDirectory,
            []
        );
    } else {
        return 'Command not found!'
    }
};
