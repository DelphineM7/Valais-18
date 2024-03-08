import { gameState, gameStatePont, HaveCarnet } from "../state/stateManagers.js";
import {generateCarnetComponents} from "../entities/carnet.js"
let onCollideControle = false


export function generatepnj_aneComponents(k, pos){ 
    return [
        k.sprite("ane"),
        k.area({shape: new k.Rect(k.vec2(0,0), 393, 255)}),
        k.body({isStatic : true}), 
        k.pos(pos),
        k.opacity(1), 
        {
            currentSprite : 'ane',
            direction: "down",
    
        },
        "pnj-ane", 
    ];
}

function ShowDufourTableau(k,pos){
    gameState.setFreezePlayer(true)
    k.destroyAll("InstructionE")
    const CadreBoxTabl = k.add([k.rect(500, 666), k.pos(pos), k.fixed(), k.outline(4),k.offscreen(),"Dufour"])
    const TableauImage = CadreBoxTabl.add([
        k.sprite("Dufour"),
        "Bib_tableau_Dufour"
    ])

    const BoxInstructiontablexit = k.add([k.rect(170, 60), k.pos(950,280), k.fixed(), k.outline(4),k.offscreen(), k.opacity(0.5),"InstructionExit"])
    const Instructiontablexit = BoxInstructiontablexit.add([
        k.text("Appuie sur enter pour arrêter l'observation", {
            font: "NiceFont",
            width : 180,
            size : 20
        }), 
        k.color(27,29,52),
        k.offscreen(),
        k.pos(10,10), 
        k.fixed(),  
        k.opacity(0.7)
    ]);
    

    k.onKeyPress("enter",() =>{  
            k.destroy(CadreBoxTabl)
            k.destroyAll("InstructionExit")
            gameState.setFreezePlayer(false)
            if(gameStatePont.getfirstTimepont() && !HaveCarnet.getInstanceCarnet()){
            const carnet = k.add(generateCarnetComponents(k,k.vec2(1000, 645)));
        }
    })
}

export  function startInteractionAne (k,pos){
        onCollideControle = true
        const dialogBoxTabl = k.add([k.rect(120, 75), k.pos(pos), k.fixed(), k.outline(4), k.offscreen(),k.opacity(0.7),"InstructionE"]) //k.fixed permet que la box ne soit pas affecter par la camera. dans notre cas on a pas de camera donc ca serait pas utile 
        const textContainer = dialogBoxTabl.add([
            k.text("Appuie sur e pour observer dans la charette", {
                font: "NiceFont",
                width : 110,
                size : 20
            }), 
            k.color(27,29,52),
            k.pos(10,10), // par rappor à dialogbox
            k.fixed(),  
            k.opacity(0.7),
            k.offscreen()
        ]);
    
        k.onKeyPress("e", () =>{
            if (onCollideControle === true ){  
                ShowDufourTableau(k,k.vec2(416,32))           
            }
        });
    }

export function EndInteractionTabl (k){
    onCollideControle = false
    k.destroyAll("InstructionE")
}

