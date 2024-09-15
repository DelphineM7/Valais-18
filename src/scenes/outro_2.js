import { colorizeBackground, ShowKey} from "../utils.js";
import {NeedLecture} from "../state/stateManagers.js"
import {Textes_Outro2} from "../content/Instruction_texte.js"

const Textes = Textes_Outro2.french_Outro2

export default async function menu(k){  
    colorizeBackground(k, 27,29,52);
    const intro_credit = k.add([k.sprite("assets_outro"),k.pos(32,16),"outro"])
    let sizeFont = 32
    let Typefont = "NiceFont"
    if(NeedLecture.getLecture()){
        sizeFont = 22
        Typefont = "LectureMenu"
    }
 
    k.add([
        k.text(Textes[0], {
            size : sizeFont +10, 
            font: Typefont
        }),
        k.area(),
        k.anchor("center"),
        k.color(27,29,52),
        k.pos(300,200)
    ])

    k.add([
        k.text(Textes[1], {
            size : sizeFont+10, 
            font: Typefont
        }),
        k.area(),
        k.anchor("center"),
        k.color(27,29,52),
        k.pos(300, 270)
    ])
    ShowKey (k, "c","c-down", 100, 360, 225, 240, 1, 0.15,"ToucheC")
    k.add([
        k.text(Textes[2], {
            size : sizeFont,  
            font: Typefont,
            width : 350,
            align: "left",
            lineSpacing : 10,
        }),
        k.area(),
        k.anchor("center"),
        k.color(27,29,52),
        k.pos(330, 380)
    ])


    ShowKey (k, "e","e-down", 100, 440, 225, 240, 1, 0.15,"ToucheE")
    k.add([
        k.text(Textes[3], {
            size : sizeFont,  
            font: Typefont,
            width : 350,
            align: "left",
            lineSpacing : 10,
        }),
        k.area(),
        k.anchor("center"),
        k.color(27,29,52),
        k.pos(330, 500)
    ])

    k.onKeyPress("e", ()=>{
        k.go("historio")
    })

    k.onKeyPress("c", ()=>{
        location.reload()
    })

}