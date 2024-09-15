import {globalStateManager_Lecture, globalStateManager1,globalStateManager2, globalStateManagerCarnet, globalStateManagerJournal,globalStateManagerBeck,globalStateManagerPottier_Meet, 
    globalStateManagerPottier, globalStateManagerBellet, globalStateManagerBellet_Meet,globalStateManagerTorrent_Meet, globalStateManagerTorrent, globalStateManagerFolken_Meet,
    globalStateManagerRivaz_Meet, globalStateManagerRivaz, globalStateManagerDufour, globalStateManagerDufour_Meet, globalStateManagerVuilloud,
    globalStateManagerRobriquet, globalStateManagerRobriquet_Meet, globalStateManagerGuillot, globalStateManagerGuillot_Meet, globalStateManagerDuFay,
    globalStateManagerDuFay_Meet, globalStateManagerCarnet_lecture,globalStateManagerTuto, globalStateManagerTuto2,
    globalStateManagerOutside, globalStateManagerDufourCollide, globalStateManagerHistorio
    } from "./globalState.js";

export const NeedLecture = globalStateManager_Lecture().getLecture();

export const gameState = globalStateManager1().getInstance();

export const gameStatePont = globalStateManager2().getInstance2();

export const HaveCarnet = globalStateManagerCarnet().getInstanceCarnet();

export const HaveReadCarnet = globalStateManagerCarnet_lecture().getInstanceCarnet_lecture();

export const SeenJournal = globalStateManagerJournal().getInstanceJournal();

export const TutoDone = globalStateManagerTuto().getInstanceTuto();

export const Tutodoing = globalStateManagerTuto2().getInstanceTuto2()

export const Beck_ok = globalStateManagerBeck().getinstanceBeck();

export const Meet_Pottier_ok = globalStateManagerPottier_Meet().getinstancePottier();

export const Pottier_ok = globalStateManagerPottier().getinstancePottier();

export const Meet_Bellet_ok = globalStateManagerBellet_Meet().getinstanceBellet();

export const Bellet_ok = globalStateManagerBellet().getinstanceBellet();

export const Meet_Torrent_ok = globalStateManagerTorrent_Meet().getinstanceTorrent();

export const Torrent_ok = globalStateManagerTorrent().getinstanceTorrent();

export const Meet_Folken_ok = globalStateManagerFolken_Meet().getinstanceFolken();

export const Meet_Rivaz_ok = globalStateManagerRivaz_Meet().getinstanceRivaz()

export const Rivaz_ok = globalStateManagerRivaz().getinstanceRivaz()

export const Dufour_ok = globalStateManagerDufour().getinstanceDufour()

export const Meet_Dufour_ok = globalStateManagerDufour_Meet().getinstanceDufour()

export const Vuilloud_ok = globalStateManagerVuilloud().getinstanceVuilloud()

export const Robriquet_ok =  globalStateManagerRobriquet().getinstanceRobriquet()

export const Meet_Robriquet_ok = globalStateManagerRobriquet_Meet().getinstanceRobriquet()

export const Guillot_ok = globalStateManagerGuillot().getinstanceGuillot()

export const Meet_Guillot_ok = globalStateManagerGuillot_Meet().getinstanceGuillot()

export const DuFay_ok = globalStateManagerDuFay().getinstanceDuFay()
 
export const Meet_DuFay_ok = globalStateManagerDuFay_Meet().getinstanceDuFay()

export const Music_Outside = globalStateManagerOutside().getinstanceOutside()

export const DufourExist = globalStateManagerDufourCollide().getinstanceDufourCollide()

export const HistorioNow = globalStateManagerHistorio().getinstanceHistorioCollide()
