import { colorizeBackground } from "../utils.js";
import {NeedLecture} from "../state/stateManagers.js"
import {Textes_Outro2} from "../content/Instruction_texte.js"

const Textes = Textes_Outro2.french_Outro2

export default async function menu(k){  
    colorizeBackground(k, 27,29,52);
    let sizeFont = 32
    if(NeedLecture.getLecture()){
        sizeFont = 26
    }
 
    k.add([
        k.text(Textes[0], {
            size : 52, 
            font: "NiceFont"
        }),
        k.area(),
        k.anchor("center"),
        k.pos(k.center().x, k.center().y -100)
    ])

    
    k.add([
        k.text(Textes[1], {
            size : sizeFont, 
            font: "NiceFont"
        }),
        k.area(),
        k.anchor("center"),
        k.pos(k.center().x, k.center().y +100)
    ])

    k.onKeyPress("e", ()=>{
        k.go("historio")
    })

}