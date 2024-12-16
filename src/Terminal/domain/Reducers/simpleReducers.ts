import { createReducer } from "@reduxjs/toolkit";

import { initialState } from "./initialState";
import { displayHelp, displayHistory, clearOutput, displayWorkingDirectory} from "../actions";

export const simpleReducers = createReducer(initialState, (builder) => {
    builder
        .addCase(displayHelp, (state) => {
            return {...state, outputs: [...state.outputs, { id: crypto.randomUUID(), output: helpString }]};
        })
        .addCase(displayHistory, (state) => {
            const historyString = state.commandHistory.map(command => command.text.trim()).join("\n");

            return {...state, outputs: [...state.outputs, { id: crypto.randomUUID(), output: historyString }]};
        })
        .addCase(clearOutput, (state) => {
            const clearString = new Array(18).fill('\n').join("");

            return {...state, outputs: [...state.outputs, { id: crypto.randomUUID(), output: clearString }]};
        })
        .addCase(displayWorkingDirectory, (state) => {
            const newOutput = { id: crypto.randomUUID(), output: "" };

            const currentDirectory = state.currentDirectory;
            const parent = currentDirectory.parent;

            if (parent === null) {
                newOutput.output = '/';
            } else if (parent.length > 1) {
                newOutput.output = parent + '/' + currentDirectory.name;
            } else {
                newOutput.output = parent + currentDirectory.name;
            }

            return {...state, outputs: [...state.outputs, newOutput]};
        });
});

const helpString = `
cd\t| Moves into a parent or child directory. | cd ./{directory_name} OR cd ../ OR cd ../{directory_name}

clear\t| clears terminal output.

help\t| lists all commands.

history\t| lists all previously executed commands.

list/ls\t| lists all directories and files within the working directory.

open\t| opens files. | open {file_name} OR open ./{directory_name}/{file_name} OR open ../{directory_name}/{file_name}
`;
