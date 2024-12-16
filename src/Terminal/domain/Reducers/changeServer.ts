import { createReducer } from "@reduxjs/toolkit";

import { initialState } from "./initialState";
import { changeServer } from "../actions";
import { servers } from "../directories";

export const changeServerReducer = createReducer(initialState, (builder) => {
    builder.addCase(changeServer, (state, action) => {
        const serverName = action.payload;

        const newServers = servers[serverName];
        const newRootDirectory = newServers?.get("/");

        if (!newServers || !newRootDirectory) {
            return {
                ...state,
                outputs: [...state.outputs, {id: crypto.randomUUID(), output: "Cannot Connect to server!"}]
            };
        }

        return {
            ...state,
            serverName: serverName,
            directories: newServers,
            currentDirectory: newRootDirectory,
            outputs: [...state.outputs, {id: crypto.randomUUID(), output: "Now connected to: " + serverName + ""}]
        };
    });
});
