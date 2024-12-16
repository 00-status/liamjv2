import { createReducer } from "@reduxjs/toolkit";

import { initialState } from "./initialState";
import { listFileSystemObjects } from "../actions";
import { navigateDirectories } from "../navigateDirectories";

export const listFileSystemObjectsReducer = createReducer(initialState, (builder) => {
    builder.addCase(listFileSystemObjects, (state, action) => {
        const directoryToMoveTo = action.payload;

        const newDirectory = navigateDirectories(
            directoryToMoveTo.split("/"),
            state.directories,
            state.currentDirectory
        );

        const subDirectories = [...newDirectory.subDirectories].map(directory => '{dir}\t' + directory);
        const files = [...newDirectory.files.keys()].map(file => '{file}\t' + file);

        const directoriesString = [...subDirectories, ...files].join("\n");

        return { ...state, outputs: [...state.outputs, { id: crypto.randomUUID(), output: directoriesString }] };
    });
});
