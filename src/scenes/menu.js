import { colorizeBackground, ShowKey} from "../utils.js";
import { NeedLecture,HistorioNow,DufourExist,Music_Outside,Meet_DuFay_ok,DuFay_ok,Meet_Guillot_ok,Guillot_ok,Meet_Robriquet_ok,Robriquet_ok,Vuilloud_ok,Meet_Dufour_ok,Dufour_ok,Rivaz_ok,Meet_Rivaz_ok,Meet_Folken_ok,Torrent_ok,Meet_Torrent_ok,Bellet_ok,Meet_Bellet_ok,Pottier_ok,Meet_Pottier_ok,Beck_ok,Tutodoing,TutoDone,SeenJournal,HaveReadCarnet,HaveCarnet,gameStatePont,gameState } from "../state/stateManagers.js"
import { music } from "../main.js";
import { Textes_Menu } from "../content/Instruction_texte.js";

export const Assets_carnet = []
export let Verso_Guillot_Show = "Verso_Guillot" 
export let Verso_DuFay_Show = "Verso_Dufay"
export let Beck_proof1_width = 160
export let Beck_proof2_x = 650
export let Beck_proof2_y = 225
export let Vuilloud_proof2_x = 780
export let Vuilloud_proof2_y = 200
export let Dufay_proof_x = 300
export let Dufay_proof_y = 450
export let Dufay_red = 150
export let Robriquet_x = 805
export let Robriquet_y = 195
export let Robriquet_width = 160
export let Robriquet_height = 20
export let Guillot_x = 650
const Textes = Textes_Menu.french_Menu;

export default async function menu(k){ 
    colorizeBackground(k, 27,29,52 );
    const map = k.add([k.pos(0,0)])
    const intro_credit = map.add([k.sprite("assets_credit_1"),k.pos(32,16),"intro_1"])
    music.paused = false
    const titre1 =map.add([ //titre
        k.text(Textes[0], {
            size : 47, 
            width : 400,
            font: "DefaultFont",
            align: "center",
            lineSpacing : 10,
        }),
        k.pos(750,100 ),
        k.color(27,29,52)
    ])

    const titre2 = k.add([ // flèche
        k.text(Textes[1], {
            size : 32, 
            font: "DefaultFont",
            width: 450, 
            lineSpacing : 10,
        }),
        k.pos(780, 425),
        k.color(27,29,52)
    ])
    
    const titre3 = k.add([ //E
        k.text(Textes[2], {
            font: "DefaultFont",
            textSize: 32 
        }),
        k.pos(780, 290),
        k.color(27,29,52)
    ])

    const titre4 = k.add([ //C
        k.text(Textes[4], {
            textSize : 32, 
            font: "DefaultFont"
        }),
        k.pos(780, 590),
        k.color(27,29,52)
    ])

    ShowKey (k, "e","e-down", 700, 270, 225, 240, 1, 0.25,"ToucheE")
    ShowKey (k, "fleche_gauche","fleche_gauche-down" ,700, 420, 689, 490, 0.9, 0.25,"ToucheF")
    ShowKey (k, "c", "c-down", 700, 570, 689, 490, 0.9, 0.25,"ToucheC")

    k.onKeyPress("left", ()=>{
        if(!NeedLecture.getLecture()){
            NeedLecture.setLecture(true)
            titre2.text = Textes[3]
            titre2.font = "LectureMenu"
            titre2.textSize = (22)
            titre3.font = "LectureMenu"
            titre3.textSize = (22)
            titre1.font = "LectureMenu"
            titre1.textSize = (37)
            titre4.font = "LectureMenu"
            titre4.textSize = (22)
            return
        }
        if(NeedLecture.getLecture()){
            NeedLecture.setLecture(false)
            titre2.text = Textes[1]
            titre2.font = "DefaultFont"
            titre2.textSize = (32)
            titre3.font = "DefaultFont"
            titre3.textSize = (32)
            titre1.font = "DefaultFont"
            titre1.textSize = (47)
            titre4.font = "DefaultFont"
            titre4.textSize = (32)
            return
        }

    })

    k.onKeyPress("e", ()=>{
        if(!NeedLecture.getLecture()){
            k.loadFont("NiceFont", "./assets/font/jupiterc.ttf")
            Assets_carnet.push(
                ["page_Garde", "carnet_Index_cadenas", "carnet_Index", ],
                ["Alphonse_Beck","carnet_Beck_vide", "carnet_Beck", 150, "carnet_Beck_plein","ligne_Beck"], 
                ["Adrien_Felix","carnet_Pottier_vide", "carnet_Pottier",205,"carnet_Pottier_plein","ligne_Pottier" ],
                ["Charles_Emmanuel","carnet_Rivaz_vide", "carnet_Rivaz",270, "carnet_Rivaz_plein","ligne_Rivaz"],
                ["Dufour_Michel","carnet_Dufour_vide", "carnet_Dufour",150, "carnet_Dufour_plein","ligne_Dufour" ],
                ["Emile_Vuilloud","carnet_Vuilloud_vide", "carnet_Vuilloud",160, "carnet_Vuilloud_plein","ligne_Vuilloud"],
                ["Joseph_Torrent" ,"carnet_Torrent_vide", "carnet_Torrent",150, "carnet_Torrent_plein","ligne_Torrent"],
                ["Louis_Robriquet","carnet_Robriquet_vide", "carnet_Robriquet",170, "carnet_Robriquet_plein","ligne_Robriquet"],
                ["Pierre_Guillot", "carnet_Guillot_vide","carnet_Guillot",150, "carnet_Guillot_plein","ligne_Guillot"], 
                ["Pierre_DuFay", "carnet_DuFay_vide","carnet_DuFay",195, "carnet_DuFay_plein","ligne_DuFay"],
                ["Rey_Bellet", "carnet_Bellet_vide","carnet_Bellet", 200, "carnet_Bellet_plein","ligne_Bellet"]
            )
        }
        if(NeedLecture.getLecture()){
            k.loadFont("NiceFont", "./assets/font/Luciole-Regular.ttf")
            Assets_carnet.push(
                ["page_Garde", "Lecture_carnet_Index_cadenas", "Lecture_carnet_Index", ],
                ["Alphonse_Beck","Lecture_carnet_Beck_vide", "Lecture_carnet_Beck", 160, "Lecture_carnet_Beck_plein","Lecture_ligne_Beck"], 
                ["Adrien_Felix","Lecture_carnet_Pottier_vide", "Lecture_carnet_Pottier",225,"Lecture_carnet_Pottier_plein","Lecture_ligne_Pottier" ],
                ["Charles_Emmanuel","Lecture_carnet_Rivaz_vide", "Lecture_carnet_Rivaz",310, "Lecture_carnet_Rivaz_plein","Lecture_ligne_Rivaz"],
                ["Dufour_Michel","Lecture_carnet_Dufour_vide", "Lecture_carnet_Dufour",160, "Lecture_carnet_Dufour_plein","Lecture_ligne_Dufour" ],
                ["Emile_Vuilloud","Lecture_carnet_Vuilloud_vide", "Lecture_carnet_Vuilloud",165, "Lecture_carnet_Vuilloud_plein","Lecture_ligne_Vuilloud"],
                ["Joseph_Torrent" ,"Lecture_carnet_Torrent_vide", "Lecture_carnet_Torrent",165, "Lecture_carnet_Torrent_plein","Lecture_ligne_Torrent"],
                ["Louis_Robriquet","Lecture_carnet_Robriquet_vide", "Lecture_carnet_Robriquet",175, "Lecture_carnet_Robriquet_plein","Lecture_ligne_Robriquet"],
                ["Pierre_Guillot", "Lecture_carnet_Guillot_vide","Lecture_carnet_Guillot",155, "Lecture_carnet_Guillot_plein","Lecture_ligne_Guillot"], 
                ["Pierre_DuFay", "Lecture_carnet_DuFay_vide","Lecture_carnet_DuFay",215, "Lecture_carnet_DuFay_plein","Lecture_ligne_DuFay"],
                ["Rey_Bellet", "Lecture_carnet_Bellet_vide","Lecture_carnet_Bellet", 240, "Lecture_carnet_Bellet_plein","Lecture_ligne_Bellet"]
            )
            Verso_Guillot_Show =  "Lecture_Verso_Guillot" 
            Verso_DuFay_Show = "Lecture_Verso_Dufay"
            Beck_proof1_width = 130
            Beck_proof2_x = 750
            Beck_proof2_y = 218
            Vuilloud_proof2_x = 815
            Vuilloud_proof2_y = 195
            Dufay_proof_x = 310
            Dufay_proof_y = 430
            Dufay_red = 250
            Robriquet_x = 650
            Robriquet_y = 190
            Robriquet_width = 320
            Robriquet_height = 40
            Guillot_x = 660

        }
        k.go("intro_1")
    })
    k.onKeyPress("c", ()=>{
        k.go("credit")
    })
}