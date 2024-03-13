import {globalStateManager1,globalStateManager2, globalStateManagerCarnet, globalStateManagerJournal,globalStateManagerBeck,globalStateManagerPottier_Meet,
    globalStateManagerBellet_Meet,globalStateManagerTorrent_Meet, globalStateManagerFolken_Meet} from "./globalState.js";

export const gameState = globalStateManager1().getInstance();

export const gameStatePont = globalStateManager2().getInstance2();

export const HaveCarnet = globalStateManagerCarnet().getInstanceCarnet();

export const SeenJournal = globalStateManagerJournal().getInstanceJournal();

export const Beck_ok = globalStateManagerBeck().getinstanceBeck();

export const Meet_Pottier_ok = globalStateManagerPottier_Meet().getinstancePottier();

export const Meet_Bellet_ok = globalStateManagerBellet_Meet().getinstanceBellet();

export const Meet_Torrent_ok = globalStateManagerTorrent_Meet().getinstanceTorrent();

export const Meet_Folken_ok = globalStateManagerFolken_Meet().getinstanceFolken();



