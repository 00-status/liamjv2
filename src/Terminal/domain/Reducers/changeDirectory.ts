import { createReducer } from "@reduxjs/toolkit";

import { initialState } from "./initialState";
import { changeDirectory } from "../actions";
import { navigateDirectories } from "../navigateDirectories";

export const changeDirectoryReducer = createReducer(initialState, (builder) => {
    builder.addCase(changeDirectory, (state, action) => {
        const directoryToMoveTo: string = action.payload ?? '.';

        const newDirectory = navigateDirectories(
            directoryToMoveTo.split("/"),
            state.directories,
            state.currentDirectory
        );

        return { ...state, currentDirectory: newDirectory };
    });
});
