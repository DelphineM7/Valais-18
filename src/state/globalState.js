export function globalStateManager1(){
    let instance = null; 

    function createInstance(){
        let freezePlayer = false 

        return{
            setFreezePlayer(value){
                freezePlayer = value; 
            },
            getFreezePlayer : () =>freezePlayer,
        }
    }
    return{
        getInstance(){
            if (!instance){
                instance = createInstance()
            }

            return instance;
        }
    }
}

export function globalStateManager2(){
    let instance2 = null; 

    function createInstance2(){
        let firstTimepont = true //true 

        return{
            setfirstTimepont(value){
                firstTimepont = value; 
            },
            getfirstTimepont : () =>firstTimepont,
        }
    }
    return{
        getInstance2(){
            if (!instance2){
                instance2 = createInstance2()
            }

            return instance2;
        }
    }
}

export function globalStateManagerCarnet(){
    let instanceCarnet = null; 

    function createInstanceCarnet(){
        let WeHaveCarnet = false  //false

        return{
            setInstanceCarnet(value){
                WeHaveCarnet = value; 
            },
            getInstanceCarnet : () =>WeHaveCarnet,
        }
    }
    return{
        getInstanceCarnet(){
            if (!instanceCarnet){
                instanceCarnet = createInstanceCarnet()
            }

            return instanceCarnet;
        }
    }
}

export function globalStateManagerCarnet_lecture(){
    let instanceCarnet_lecture = null; 

    function createInstanceCarnet_lecture(){
        let CarnetOpenFirst = true  //true

        return{
            setInstanceCarnet_lecture(value){
                CarnetOpenFirst = value; 
            },
            getInstanceCarnet_lecture : () =>CarnetOpenFirst,
        }
    }
    return{
        getInstanceCarnet_lecture(){
            if (!instanceCarnet_lecture){
                instanceCarnet_lecture = createInstanceCarnet_lecture()
            }

            return instanceCarnet_lecture;
        }
    }
}

export function globalStateManagerJournal(){
    let instanceJournal = null; 

    function createInstanceJournal(){
        let WeHaveSeenJournal = false  //false

        return{
            setInstanceJournal(value){
                WeHaveSeenJournal = value; 
            },
            getInstanceJournal : () =>WeHaveSeenJournal,
        }
    }
    return{
        getInstanceJournal(){
            if (!instanceJournal){
                instanceJournal = createInstanceJournal()
            }

            return instanceJournal;
        }
    }
}

export function globalStateManagerTuto(){
    let instanceTuto = null; 

    function createInstanceTuo(){
        let WeHaveDoneTuto = false  //false

        return{
            setInstanceTuto(value){
                WeHaveDoneTuto = value; 
            },
            getInstanceTuto : () =>WeHaveDoneTuto,
        }
    }
    return{
        getInstanceTuto(){
            if (!instanceTuto){
                instanceTuto = createInstanceTuo()
            }

            return instanceTuto;
        }
    }
}

export function globalStateManagerTuto2(){
    let instanceTuto2 = null; 

    function createInstanceTuo2(){
        let DoingTuto = false  //false

        return{
            setInstanceTuto2(value){
                DoingTuto = value; 
            },
            getInstanceTuto2 : () =>DoingTuto,
        }
    }
    return{
        getInstanceTuto2(){
            if (!instanceTuto2){
                instanceTuto2 = createInstanceTuo2()
            }

            return instanceTuto2;
        }
    }
}

// Personnages 
export function globalStateManagerBeck(){
    let instanceBeck = null; 

    function createinstanceBeck(){
        let BeckOk = false //false

        return{
            setinstanceBeck(value){
                BeckOk = value; 
            },
            getinstanceBeck : () =>BeckOk,
        }
    }
    return{
        getinstanceBeck(){
            if (!instanceBeck){
                instanceBeck = createinstanceBeck()
            }

            return instanceBeck;
        }
    }
}

export function globalStateManagerTorrent_Meet(){
    let instanceTorrent = null; 

    function createinstanceTorrent(){
        let TorrentOk = false //false

        return{
            setinstanceTorrent(value){
                TorrentOk = value; 
            },
            getinstanceTorrent : () =>TorrentOk,
        }
    }
    return{
        getinstanceTorrent(){
            if (!instanceTorrent){
                instanceTorrent = createinstanceTorrent()
            }

            return instanceTorrent;
        }
    }
}
export function globalStateManagerTorrent(){
    let instanceTorrent = null; 

    function createinstanceTorrent(){
        let TorrentOk = false //false

        return{
            setinstanceTorrent(value){
                TorrentOk = value; 
            },
            getinstanceTorrent : () =>TorrentOk,
        }
    }
    return{
        getinstanceTorrent(){
            if (!instanceTorrent){
                instanceTorrent = createinstanceTorrent()
            }

            return instanceTorrent;
        }
    }
}

export function globalStateManagerPottier_Meet(){
    let instancePottier = null; 

    function createinstancePottier(){
        let PottierOk = false //false

        return{
            setinstancePottier(value){
                PottierOk = value; 
            },
            getinstancePottier : () =>PottierOk,
        }
    }
    return{
        getinstancePottier(){
            if (!instancePottier){
                instancePottier = createinstancePottier()
            }

            return instancePottier;
        }
    }
}

export function globalStateManagerPottier(){
    let instancePottier = null; 

    function createinstancePottier(){
        let PottierOk = false //false

        return{
            setinstancePottier(value){
                PottierOk = value; 
            },
            getinstancePottier : () =>PottierOk,
        }
    }
    return{
        getinstancePottier(){
            if (!instancePottier){
                instancePottier = createinstancePottier()
            }

            return instancePottier;
        }
    }
}

export function globalStateManagerBellet(){
    let instanceBellet = null; 

    function createinstanceBellet(){
        let BelletOk = false //false

        return{
            setinstanceBellet(value){
                BelletOk = value; 
            },
            getinstanceBellet : () =>BelletOk,
        }
    }
    return{
        getinstanceBellet(){
            if (!instanceBellet){
                instanceBellet = createinstanceBellet()
            }

            return instanceBellet;
        }
    }
}

export function globalStateManagerBellet_Meet(){
    let instanceBellet = null; 

    function createinstanceBellet(){
        let BelletOk = false //false

        return{
            setinstanceBellet(value){
                BelletOk = value; 
            },
            getinstanceBellet : () =>BelletOk,
        }
    }
    return{
        getinstanceBellet(){
            if (!instanceBellet){
                instanceBellet = createinstanceBellet()
            }

            return instanceBellet;
        }
    }
}

export function globalStateManagerFolken_Meet(){
    let instanceFolken = null; 

    function createinstanceFolken(){
        let FolkenOk = false //false

        return{
            setinstanceFolken(value){
                FolkenOk = value; 
            },
            getinstanceFolken : () =>FolkenOk,
        }
    }
    return{
        getinstanceFolken(){
            if (!instanceFolken){
                instanceFolken = createinstanceFolken()
            }

            return instanceFolken;
        }
    }
}

export function globalStateManagerRivaz_Meet(){
    let instanceRivaz = null; 

    function createinstanceRivaz(){
        let RivazOk = false //false

        return{
            setinstanceRivaz(value){
                RivazOk = value; 
            },
            getinstanceRivaz : () =>RivazOk,
        }
    }
    return{
        getinstanceRivaz(){
            if (!instanceRivaz){
                instanceRivaz = createinstanceRivaz()
            }

            return instanceRivaz;
        }
    }
}

export function globalStateManagerRivaz(){
    let instanceRivaz = null; 

    function createinstanceRivaz(){
        let RivazOk = false //false

        return{
            setinstanceRivaz(value){
                RivazOk = value; 
            },
            getinstanceRivaz : () =>RivazOk,
        }
    }
    return{
        getinstanceRivaz(){
            if (!instanceRivaz){
                instanceRivaz = createinstanceRivaz()
            }

            return instanceRivaz;
        }
    }
}

export function globalStateManagerDufour(){
    let instanceDufour = null; 

    function createinstanceDufour(){
        let DufourOk = false //false

        return{
            setinstanceDufour(value){
                DufourOk = value; 
            },
            getinstanceDufour : () =>DufourOk,
        }
    }
    return{
        getinstanceDufour(){
            if (!instanceDufour){
                instanceDufour = createinstanceDufour()
            }

            return instanceDufour;
        }
    }
}

export function globalStateManagerDufour_Meet(){
    let instanceDufour = null; 

    function createinstanceDufour(){
        let DufourOk = false //false

        return{
            setinstanceDufour(value){
                DufourOk = value; 
            },
            getinstanceDufour : () =>DufourOk,
        }
    }
    return{
        getinstanceDufour(){
            if (!instanceDufour){
                instanceDufour = createinstanceDufour()
            }

            return instanceDufour;
        }
    }
}

export function globalStateManagerVuilloud(){
    let instanceVuilloud = null; 

    function createinstanceVuilloud(){
        let VuilloudOk = false //false

        return{
            setinstanceVuilloud(value){
                VuilloudOk = value; 
            },
            getinstanceVuilloud : () =>VuilloudOk,
        }
    }
    return{
        getinstanceVuilloud(){
            if (!instanceVuilloud){
                instanceVuilloud = createinstanceVuilloud()
            }

            return instanceVuilloud;
        }
    }
}

export function globalStateManagerRobriquet(){
    let instanceRobriquet = null; 

    function createinstanceRobriquet(){
        let RobriquetOk = false //false

        return{
            setinstanceRobriquet(value){
                RobriquetOk = value; 
            },
            getinstanceRobriquet : () =>RobriquetOk,
        }
    }
    return{
        getinstanceRobriquet(){
            if (!instanceRobriquet){
                instanceRobriquet = createinstanceRobriquet()
            }

            return instanceRobriquet;
        }
    }
}

export function globalStateManagerRobriquet_Meet(){
    let instanceRobriquet = null; 

    function createinstanceRobriquet(){
        let RobriquetOk = false //false

        return{
            setinstanceRobriquet(value){
                RobriquetOk = value; 
            },
            getinstanceRobriquet : () =>RobriquetOk,
        }
    }
    return{
        getinstanceRobriquet(){
            if (!instanceRobriquet){
                instanceRobriquet = createinstanceRobriquet()
            }

            return instanceRobriquet;
        }
    }
}


export function globalStateManagerGuillot(){ 
    let instanceGuillot = null; 

    function createinstanceGuillot(){
        let GuillotOk = false //false

        return{
            setinstanceGuillot(value){
                GuillotOk = value; 
            },
            getinstanceGuillot : () =>GuillotOk,
        }
    }
    return{
        getinstanceGuillot(){
            if (!instanceGuillot){
                instanceGuillot = createinstanceGuillot()
            }

            return instanceGuillot;
        }
    }
}

export function globalStateManagerGuillot_Meet(){
    let instanceGuillot = null; 

    function createinstanceGuillot(){
        let GuillotOk = false //false

        return{
            setinstanceGuillot(value){
                GuillotOk = value; 
            },
            getinstanceGuillot : () =>GuillotOk,
        }
    }
    return{
        getinstanceGuillot(){
            if (!instanceGuillot){
                instanceGuillot = createinstanceGuillot()
            }

            return instanceGuillot;
        }
    }
}

export function globalStateManagerDuFay(){
    let instanceDuFay = null; 

    function createinstanceDuFay(){
        let DuFayOk = false //false

        return{
            setinstanceDuFay(value){
                DuFayOk = value; 
            },
            getinstanceDuFay : () =>DuFayOk,
        }
    }
    return{
        getinstanceDuFay(){
            if (!instanceDuFay){
                instanceDuFay = createinstanceDuFay()
            }

            return instanceDuFay;
        }
    }
}

export function globalStateManagerDuFay_Meet(){
    let instanceDuFay = null; 

    function createinstanceDuFay(){
        let DuFayOk = false //false

        return{
            setinstanceDuFay(value){
                DuFayOk = value; 
            },
            getinstanceDuFay : () =>DuFayOk,
        }
    }
    return{
        getinstanceDuFay(){
            if (!instanceDuFay){
                instanceDuFay = createinstanceDuFay()
            }

            return instanceDuFay;
        }
    }
}

export function globalStateManagerOutside(){
    let instanceOutside = null; 

    function createinstanceOutside(){
        let OutsidePlaying = false //false

        return{
            setinstanceOutside(value){
                OutsidePlaying = value; 
            },
            getinstanceOutside : () =>OutsidePlaying,
        }
    }
    return{
        getinstanceOutside(){
            if (!instanceOutside){
                instanceOutside = createinstanceOutside()
            }

            return instanceOutside;
        }
    }
}

export function globalStateManagerDufourCollide(){
    let instanceDufourCollide = null; 

    function createinstanceDufourCollide(){
        let DufourCollide = false //false

        return{
            setinstanceDufourCollide(value){
                DufourCollide = value; 
            },
            getinstanceDufourCollide : () =>DufourCollide,
        }
    }
    return{
        getinstanceDufourCollide(){
            if (!instanceDufourCollide){
                instanceDufourCollide = createinstanceDufourCollide()
            }

            return instanceDufourCollide;
        }
    }
}