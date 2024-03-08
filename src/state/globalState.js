export function globalStateManager1(){
    let instance = null; //

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
        let firstTimepont = true 

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
        let WeHaveCarnet = false 

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
        let WeHaveSeenJournal = false 

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

export function globalStateManagerOnCollide(){
    let instanceCollide = null; 

    function createInstanceCollide(){
        let DoWeCollide = false 

        return{
            setInstanceCollide(value){
                DoWeCollide = value; 
            },
            getInstanceCollide : () =>DoWeCollide,
        }
    }
    return{
        getInstanceCollide(){
            if (!instanceCollide){
                instanceCollide = createInstanceCollide()
            }

            return instanceCollide;
        }
    }
}
