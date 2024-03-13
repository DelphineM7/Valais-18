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

