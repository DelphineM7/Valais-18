import { gameState } from "../state/stateManagers.js";
let onCollideControle = false

export function generateTableauDeRivazComponents(k, pos){
    return [
        k.sprite("tabl_Rivaz"),
        k.area({shape: new k.Rect(k.vec2(0,0), 131, 95)}), 
        k.body({isStatic : true}),
        k.pos(pos),
        "tableau_deRivaz", 
    ];
}

function ShowDeRivasTableau(k,pos){
    gameState.setFreezePlayer(true)


    const CadreBoxTabl = k.add([k.rect(500, 666), k.pos(pos), k.fixed(), k.outline(4),"Big_DeRivaz"])
    const TableauImage = CadreBoxTabl.add([
        k.sprite("Big_tabl_Rivaz"),
        "Bib_tableau_deRivaz"
    ])
    const TableauImageTexte = CadreBoxTabl.add([
        k.text ("Charles Emmanuel de Rivaz", {
            font: "NiceFont",
            width : 700,
            size : 34
        }),
        k.pos(100,625),
        k.color(27,29,52),
        "Bib_tableau_deRivazTexte"
    ])
    const BoxInstructiontablexit = k.add([k.rect(170, 60), k.pos(1000,200), k.fixed(), k.outline(4), k.opacity(0.5),"InstructionExit"])
    const Instructiontablexit = BoxInstructiontablexit.add([
        k.text("Appuie sur enter pour arrêter l'observation", {
            font: "NiceFont",
            width : 180,
            size : 20
        }), 
        k.color(27,29,52),
        k.pos(10,10), // par rappor à dialogbox
        k.fixed(),  
        k.opacity(0.7)
    ]);
    

    k.onKeyPress("enter",() =>{  
            k.destroy(CadreBoxTabl)
            k.destroyAll("InstructionE")
            k.destroyAll("InstructionExit")
            gameState.setFreezePlayer(false)         
    })
}

export function StartInteractionTabl (k, pos){
    onCollideControle = true
    const dialogBoxTabl = k.add([k.rect(110, 75), k.pos(pos), k.fixed(), k.outline(4), k.opacity(0.7),"InstructionE"]) //k.fixed permet que la box ne soit pas affecter par la camera. dans notre cas on a pas de camera donc ca serait pas utile 
    const textContainer = dialogBoxTabl.add([
        k.text("Appuie sur e pour observer le tableau", {
            font: "NiceFont",
            width : 100,
            size : 20
        }), 
        k.color(27,29,52),
        k.pos(10,10), // par rappor à dialogbox
        k.fixed(),  
        k.opacity(0.7)
    ]);

    k.onKeyPress("e", () =>{
        if (onCollideControle === true ){  
            ShowDeRivasTableau(k,k.vec2(416,32))           
        }
    });
}
export function EndInteractionTabl (k){
    onCollideControle = false
    k.destroyAll("InstructionE")
}

