import { createReducer } from "@reduxjs/toolkit";

import { initialState } from "./initialState";
import { openFile } from "../actions";
import { navigateDirectories } from "../navigateDirectories";
import { directories } from "../directories";
import { TerminalDirectory, TerminalFile } from "../types";

export const openFileReducer = createReducer(initialState, (builder) => {
    builder.addCase(openFile, (state, action) => {
        const filePathGroups = action.payload.split("/");

        const file: TerminalFile | null = getTerminalFile(filePathGroups, state.currentDirectory);
        
        const newOutput = { id: crypto.randomUUID(), output: "" };
        if (file) {
            newOutput.output = file.contents;
        } else {
            newOutput.output = 'No such file exists!';
        }

        return {...state, outputs: [...state.outputs, newOutput]};
    });
});

function getTerminalFile(filePathGroups: string[], currentDirectory: TerminalDirectory): TerminalFile | null {
    if (filePathGroups.length > 1) {
        const fileName = filePathGroups.pop();
        const directory = navigateDirectories(filePathGroups, directories, currentDirectory);

        return directory.files.get(fileName ?? '') ?? null;
    } else {
        return currentDirectory.files.get(filePathGroups[0]) ?? null;
    }
}

