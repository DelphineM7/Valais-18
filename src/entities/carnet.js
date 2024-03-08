import { HaveCarnet, gameState } from "../state/stateManagers.js";
let onCollideControle = false

export function generateCarnetComponents(k, pos){ 
    return [
        k.sprite("carnet"),
        k.area({shape: new k.Rect(k.vec2(8,8), 95, 60)}),
        k.body({isStatic : true}), 
        k.offscreen(),
        k.pos(pos),
        k.opacity(1), 
        {
            currentSprite : 'carnet',
        },
        "carnet", 
    ];
}

export function instructionCarnet(k){
    const dialogBoxFCarnet = k.add([k.rect(135, 55), k.pos(1115,25), k.fixed(), k.outline(4), k.opacity(0.7),k.offscreen(), "InstructionF"]) 
    const textContainerFcarnet = dialogBoxFCarnet.add([
        k.text("Appuie sur f pour ouvrir le carnet", {
            font: "NiceFont",
            width : 150,
            size : 20
        }), 
        k.color(27,29,52),
        k.pos(10,10), // par rappor à dialogbox
        k.offscreen(),
        k.opacity(0.7)
    ]);
    k.wait(5, () => {
        k.destroyAll("InstructionF")
    })

}

export function interactionCarnet(k, pos){
    onCollideControle = true
    const dialogBoxTabl = k.add([k.rect(120, 75), k.pos(pos), k.fixed(), k.outline(4), k.opacity(0.7),k.offscreen(),"InstructionECarnet"]) 
    const textContainer = dialogBoxTabl.add([
        k.text("Appuie sur e pour ramasser le carnet", {
            font: "NiceFont",
            width : 110,
            size : 20
        }), 
        k.color(27,29,52),
        k.pos(10,10), // par rappor à dialogbox
        k.offscreen(),
        k.opacity(0.7)
    ]);

    k.onKeyPress("e", () =>{
        if (onCollideControle === true ){  
            k.destroyAll("InstructionECarnet")
            k.destroyAll("carnet")   
            HaveCarnet.setInstanceCarnet(true)
            instructionCarnet(k)
        }
    });
}

export function endInteractionCarnet (k){
    onCollideControle = false
    k.destroyAll("InstructionECarnet")
}

export function Carnet(k){
    gameState.setFreezePlayer(true)
    const BoxCarnetImage = k.add([
        k.sprite("carnet_vide"),
        k.pos(230,100),
        "CarnetOPEN"
    ])
    const Alphonse_Beck= BoxCarnetImage.add([
        k.text("Alphonse Beck", {
            font: "NiceFont",
            width : 110,
            size : 20
        }), 
        k.area({shape: new k.Rect(k.vec2(-5,0), 100, 20)}),
        k.color(133,31,0),
        k.pos(80,120), 
        k.offscreen(),
        k.opacity(0.7),
        "Alphonse_Beck"

    ])



    k.onClick("Alphonse_Beck", () => console.log("hehehe ca marche"))

    k.onKeyPress("enter", () =>{  
        k.destroyAll("CarnetOPEN")
        gameState.setFreezePlayer(false)   
    })
}

export function OnkeyF(k){
    if(!HaveCarnet.getInstanceCarnet())return;
        Carnet(k)     
}