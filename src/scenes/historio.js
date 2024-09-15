import { colorizeBackground,ShowKey } from "../utils.js";
import { Textes_Historio } from "../content/Instruction_texte.js";
import { HistorioNow } from "../state/stateManagers.js"

let page = 1
const entities = {
    carnet : [],
}
const Textes = Textes_Historio.french_historio;

export default async function menu(k){
    HistorioNow.setinstanceHistorioCollide(true)
    page = 1
    colorizeBackground(k, 27,29,52);
    Carnet_Historio(k)
    TournerPage(k, entities.carnet)
    ShowKey (k, "fleche_droite","fleche_droite-down" ,1170, 344, 689, 490, 0.9, 0.25,"ToucheFD")
    k.onKeyPress("c", ()=>{
        if (page == 8 )k.go("credit")
    })
    k.onKeyPress("e", ()=>{
        if (page == 8 )location.reload();    
    })
    }

const Assets_carnet = [
    [1,"carnet_p_1" ],
    [2,"carnet_p_2" ],
    [3,"carnet_p_3" ],
    [4,"carnet_p_4" ],
    [5,"carnet_p_5" ],
    [6,"carnet_p_6" ],
    [7,"carnet_p_7" ],
    [8,"carnet_p_8" ],
]

function Carnet_Historio(k){
    const page_ouvert= k.play("book", {
        volume: 0.2,
    })

    entities.carnet = 
        k.add([
        k.sprite("carnet_p_1"),
        k.area(),
        k.anchor("center"),
        k.pos(k.center().x, k.center().y)
    ])
}

function TournerPage(k, Carnetname){
    k.onKeyPress((key)=>{
        if (["left","a"].includes(key)){   
            page -= 1 
            if (page < 1) page = 1
            for (let i = 0; i < Assets_carnet.length; i++) {
                if (page == Assets_carnet[i][0]){
                    Carnetname.use(k.sprite( Assets_carnet[i][1]))
                }
                
            }
            if(page == 1) k.destroyAll("ToucheFG") 
            if(page == 7) {
                ShowKey (k, "fleche_droite","fleche_droite-down" ,1170, 344, 689, 490, 0.9, 0.25,"ToucheFD")
                k.destroyAll("ToucheE")
                k.destroyAll("ToucheC")
                k.destroyAll("Texte1")
                k.destroyAll("Texte2")
            }
        }
        if(["right","d"].includes(key)){
            page += 1
            if (page > 8) page = 8
            for (let i = 1; i < Assets_carnet.length; i++) {
                if (page == Assets_carnet[i][0]){
                    Carnetname.use(k.sprite( Assets_carnet[i][1]))
                }
            }
            if(page == 2) ShowKey(k, "fleche_gauche","fleche_gauche-down" ,30, 344, 689, 490, 0.9, 0.25,"ToucheFG")
            if(page == 8) {
                k.destroyAll("ToucheFD")
                k.destroyAll("ToucheE")
                k.destroyAll("ToucheC")

                ShowKey (k, "e","e-down", 670, 520, 225, 240, 1, 0.20,"ToucheE")
                const Texte1 = k.add([ 
                    k.text(Textes[0], {
                        size : 20, 
                        font: "CarnetFont",
                        width: 450, 
                        lineSpacing : 10,
                    }),
                    k.pos(730, 540),
                    k.color(64,22,26),
                    "Texte1"
                ])

                ShowKey (k, "c","c-down", 670, 580, 689, 490, 0.9, 0.20,"ToucheC")
                const Texte2 = k.add([ 
                    k.text(Textes[1], {
                        size : 20, 
                        font: "CarnetFont",
                        width: 450, 
                        lineSpacing : 10,
                    }),
                    k.pos(730, 600),
                    k.color(64,22,26),
                    "Texte2"
                ])
            }    
        }
    })
}