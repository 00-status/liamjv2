import { createAction } from "@reduxjs/toolkit";

export const displayHelp = createAction("terminal/displayHelp");
export const displayHistory = createAction("terminal/displayHistory");
export const changeDirectory = createAction("terminal/changeDirectory");
export const listDirectories = createAction("terminal/listDirectories");
export const openFile = createAction("terminal/openFile");
export const changeServer = createAction("terminal/changeServer");
export const clearOutput = createAction("terminal/clearOutput");
export const displayWorkingDirectory = createAction("terminal/displayWorkingDirectory");
