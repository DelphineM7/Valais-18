import { colorizeBackground, ShowKey} from "../utils.js";
import { Textes_Menu } from "../content/Instruction_texte.js";
import { NeedLecture, HistorioNow} from "../state/stateManagers.js"

const Textes = Textes_Menu.french_Menu;

export default async function credit(k){  
    if(NeedLecture.getLecture()){
        NeedLecture.setLecture(false)}
    colorizeBackground(k, 88,92,137);
    const map = k.add([k.pos(0,0)])
    const credit = map.add([k.sprite("Delphine_credit"),k.pos(766,40),"Delphine_1", k.scale(0.5)] )
    const Texte1 = map.add([ 
        k.text(Textes[5], {
            width : 580,
            font: "LectureMenu",
            size: 26,
            align: "center",
            lineSpacing : 15,

        }),
        k.pos(120, 120),
        k.color(0,0,0)
    ])
    const Texte2 = map.add([ 
        k.text(Textes[6], {
            width : 580,
            font: "LectureMenu",
            size: 26,
            align: "center",
            lineSpacing : 15,

        }),
        k.pos(120, 310),
        k.color(0,0,0)
    ])

    ShowKey (k, "c", "c-down", 180, 570, 689, 490, 0.9, 0.25,"ToucheC")
    const Texte3 = k.add([ 
        k.text(Textes[7], {
            width : 580,
            font: "LectureMenu",
            size: 26,
            align: "center",
            lineSpacing : 15,
        }),
        k.pos(130, 590),
        k.color(0,0,0),
        "Texte3",
    ])

    k.onKeyPress("c", ()=>{
        k.go("menu")
    })

    if(HistorioNow.getinstanceHistorioCollide()){
        k.destroyAll("ToucheC")
        k.destroyAll("Texte3")
        ShowKey (k, "e","e-down", 160, 550, 225, 240, 1, 0.25,"ToucheE")
        const Texte4 = map.add([ 
            k.text(Textes[7], {
                width : 580,
                font: "LectureMenu",
                size: 26,
                lineSpacing : 15,
            }),
            k.pos(230, 570),
            k.color(0,0,0),
            "Texte4",
        ])
        ShowKey (k, "c", "c-down", 160, 630, 689, 490, 0.9, 0.25,"ToucheC")
        const Texte5 = map.add([ 
            k.text(Textes[8], {
                width : 580,
                font: "LectureMenu",
                size: 26,
                lineSpacing : 15,
            }),
            k.pos(230, 650),
            k.color(0,0,0),
            "Texte5",
        ])
        k.onKeyPress("e", ()=>{
            location.reload();  
        })
    

        k.onKeyPress("c", ()=>{
            k.go("historio")
        })
    }
}