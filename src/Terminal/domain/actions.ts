import { createAction } from "@reduxjs/toolkit";

type argument = string;

export const displayHelp = createAction("terminal/displayHelp");
export const displayHistory = createAction("terminal/displayHistory");
export const changeDirectory = createAction("terminal/changeDirectory");
export const listFileSystemObjects = createAction<argument>("terminal/listFileSystemObjects");
export const openFile = createAction<argument>("terminal/openFile");
export const changeServer = createAction("terminal/changeServer");
export const clearOutput = createAction("terminal/clearOutput");
export const displayWorkingDirectory = createAction("terminal/displayWorkingDirectory");
