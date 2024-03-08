import {globalStateManager1,globalStateManager2, globalStateManagerCarnet, globalStateManagerJournal,globalStateManagerOnCollide} from "./globalState.js";

export const gameState = globalStateManager1().getInstance();

export const gameStatePont = globalStateManager2().getInstance2();

export const HaveCarnet = globalStateManagerCarnet().getInstanceCarnet();

export const SeenJournal = globalStateManagerJournal().getInstanceJournal();

export const DoCollide = globalStateManagerOnCollide().getInstanceCollide();