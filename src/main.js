import k from "./kaboomContext.js";
import world from "./scenes/world.js";
import house from "./scenes/house.js";
import pont from "./scenes/pont.js"
import intro_1 from "./scenes/intro_1.js"
import intro_2 from "./scenes/intro_2.js"
import outro_1 from "./scenes/outro_1.js"
import outro_2 from "./scenes/outro_2.js"
import salon from "./scenes/salon.js"
import menu from "./scenes/menu.js"
import historio from "./scenes/historio.js"
import { Music_Outside,NeedLecture} from "./state/stateManagers.js"


//assets map en png
k.loadSpriteAtlas("./assets/png_map/scene_intro_1.png", {
    "assets_intro_1" : {x:0 , y:0 , width: 1216 , height:688 },
});

k.loadSpriteAtlas("./assets/png_map/scene_intro_2.png", {
    "assets_intro_2" : {x:0 , y:0 , width: 450 , height:700 },
});

k.loadSpriteAtlas("./assets/png_map/pont.png", {
    "assets_pont" : {x:365 , y:452 , width: 1215 , height:688 }, // 30 24
});

k.loadSpriteAtlas("./assets/png_map/place.png", {
    "assets_place" : {x:247 , y:202 , width: 1216 , height:688 },
});

k.loadSpriteAtlas("./assets/png_map/bureau.png", {
    "assets_bureau" : {x:7 , y:8 , width: 1216 , height:688 },
});

k.loadSpriteAtlas("./assets/png_map/salon.png", {
    "assets_salon" : {x:24 , y:15 , width: 1216 , height:688 },
});
 
//assets player et pnj
k.loadSpriteAtlas("./assets/pnj/player_petit.png", {
    "petit-player-idle-down": {sliceX: 3,sliceY: 1,x: 4,y: 8,width: 256,height: 200,
        anims: {
            'walk-down': {from: 1, to:2, speed : 5, loop: true}
        },
    },
    "petit-player-idle-down-pos": {x: 4,y: 8,width: 85,height: 200},

    'petit-player-idle-side': {sliceX: 5,sliceY: 1,x: 15,y: 220,width: 350,height: 200,
        anims: {
            'walk-side': {from: 1, to:4, speed : 5, loop: true}
        },
    },
    "petit-player-idle-side-pos": {x: 4,y: 219,width: 85,height: 200},

    'petit-player-idle-up': {sliceX: 3,sliceY: 1,x: 4,y: 431,width: 265,height: 206,
        anims: {
            'walk-up': {from: 1, to:2, speed : 5, loop: true}
        },
    },
    "petit-player-idle-up-pos": {x: 4,y: 431,width: 85,height: 200},
})

k.loadSpriteAtlas("./assets/pnj/player_moyen.png", {
    "medium-big-player-idle-down": {sliceX: 3,sliceY: 1,x: 0,y: 0,width: 341,height: 256,
        anims: {
            'walk-medium-down': {from: 1, to:2, speed : 5, loop: true}
        },
    },
    "medium-big-player-idle-down-pos": {x: 0,y: 0,width: 115,height: 256},

    'medium-big-player-idle-side': {sliceX: 5,sliceY: 1,x: 9,y: 261,width: 466,height: 262,
        anims: {
            'walk-medium-side': {from: 1, to:4, speed : 5, loop: true}
        },
    },
    "medium-big-player-idle-side-pos": {x: 9,y: 261,width: 98,height: 262},

    'medium-big-player-idle-up': {sliceX: 3,sliceY: 1,x: 5,y: 528,width: 353,height: 253,
        anims: {
            'walk-medium-up': {from: 1, to:2, speed : 5, loop: true}
        },
    },
    "medium-big-player-idle-up-pos": {x: 5,y: 528,width: 120,height: 253},
})

k.loadSpriteAtlas("./assets/pnj/player_grand.png", {
    "big-player-idle-down": {sliceX: 3,sliceY: 1,x: 24,y: 0,width: 565,height: 408,
        anims: {
            'walk-big-down': {from: 1, to:2, speed : 5, loop: true}
        },
    },
    "big-player-idle-down-pos": {x: 26,y: 6,width: 182,height: 400},

    'big-player-idle-side': {sliceX: 5,sliceY: 1,x: 57,y: 424,width: 827,height: 409,
        anims: {
            'walk-big-side': {from: 1, to:4, speed : 5, loop: true}
        },
    },
    "big-player-idle-side-pos": {x: 57,y: 424,width: 161,height: 409},

    'big-player-idle-up': {sliceX: 3,sliceY: 1,x: 21,y: 841,width: 583,height: 402,
        anims: {
            'walk-big-up': {from: 1, to:2, speed : 5, loop: true}
        },
    },
    "big-player-idle-up-pos": {x: 21,y: 841,width: 192,height: 402},
})

k.loadSpriteAtlas( "./assets/pnj/pnj_Folken_cinematique.png",{
    "pnj_Folken-idle-down": {sliceX: 2,sliceY: 1,x: 10,y: 237,width: 218,height: 204,
        anims: {
            'walk-Folken-down': {from: 0, to:1, speed : 3, loop: true}
        },
    },
    "pnj_Folken_down_little" : {x:12 , y:18, width: 94 , height:204 },

    "pnj_Folken-idle-side": {sliceX: 4,sliceY: 1,x: 12,y: 452,width: 380,height: 214,
        anims: {
            'walk-Folken-side': {from: 0, to:3, speed : 4, loop: true}
        },
    },
    "pnj_Folken_left_little" : {x:144 , y:17, width: 84 , height:207 },
    "pnj_Folken_right_little" : {x:370 , y:14, width: 82 , height:205 },

    "pnj_Folken-idle-up": {sliceX: 2,sliceY: 1,x: 251,y: 237,width: 218,height: 208,
        anims: {
            'walk-Folken-up': {from: 0, to:1, speed : 3, loop: true}
        },
    },
    "pnj_Folken_up_little" : {x:252 , y:18, width:92 , height:202 },
})

k.loadSpriteAtlas( "./assets/pnj/pnj_Bellet.png", { 
    "marchand-idle-down" : {x:26 , y:34 , width: 94 , height:211 },
    'marchand-down' : {x:26 , y:34 , width: 94 , height:211 },
    'marchand-side-right' : {x:124, y:35 , width: 60 , height:211 },
    'marchand-side-left' : {x:121 , y:248 , width: 61 , height:209 },
    'marchand-up' : {x:186 , y:34 , width: 94 , height:212 },
})


k.loadSpriteAtlas( "./assets/pnj/pnj_Folken.png",{
    "pnj_Folken_down" : {x:31 , y:3, width: 196 , height:397 },
    "pnj_Folken_right" : {x:31 , y:3, width: 196 , height:397 },
    "pnj_Folken_left" : {x:292 , y:0, width: 181 , height:392 },
})

k.loadSpriteAtlas( "./assets/pnj/pnj_Torrent.png",{
    "pnj_Torrent_down" : {x:15 , y:10, width: 68 , height:192 },
    "pnj_Torrent_left" : {x:111 , y:10, width: 61 , height:190 },
    "pnj_Torrent_right" : {x:188 , y:10, width: 61 , height:190 },
})

k.loadSpriteAtlas( "./assets/pnj/pnj_Pottier.png",{
    "pnj_Pottier_down" : {x:21 , y:9, width: 84 , height:245 },
    "pnj_Pottier_right" : {x:21 , y:9, width: 84 , height:245 },
    "pnj_Pottier_left" :{x:154 , y:16, width: 83 , height:243 },
})

k.loadSpriteAtlas( "./assets/pnj/pnj_Dufour.png",{
    "pnj_Dufour_down" : {x:77 , y:80, width: 84 , height:207 },
    "pnj_Dufour_right" : {x:197 , y:80, width: 78 , height:208 },
    "pnj_Dufour_left" :{x:306 , y:78, width: 73 , height:210 },
})
    
//objects
k.loadSpriteAtlas( "./assets/objects/DeRivaBigPortrait.png",{
    "Big_tabl_Rivaz" : {x:8 , y:38, width: 500 , height:623 },
})

k.loadSpriteAtlas( "./assets/objects/DeRivaBigPortrait_Lecture.png",{
    "Big_tabl_Rivaz_Lecture" : {x:8 , y:38, width: 500 , height:623 },
})

k.loadSpriteAtlas( "./assets/objects/papier_1.png",{ //Dufay
    "Papier_1_1" : {x:25 , y:21, width: 657 , height:668},
    "Papier_1_2" : {x:727 , y:22, width: 650 , height:669},
})

k.loadSpriteAtlas( "./assets/objects/papier_2.png",{ // Guillot
    "Papier_2_1" : {x:198 , y:207, width: 597 , height:677 },
    "Papier_2_2" : {x:825 , y:215, width: 597 , height:673 },
})

k.loadSpriteAtlas( "./assets/objects/papier_1_Lecture.png",{ //Dufay
    "Papier_1_1_Lecture" : {x:25 , y:21, width: 657 , height:668},
    "Papier_1_2_Lecture" : {x:727 , y:22, width: 650 , height:669},
})

k.loadSpriteAtlas( "./assets/objects/papier_2_Lecture.png",{ // Guillot
    "Papier_2_1_Lecture" : {x:198 , y:207, width: 597 , height:677 },
    "Papier_2_2_Lecture" : {x:825 , y:215, width: 597 , height:673 },
})

k.loadSpriteAtlas( "./assets/objects/horloge_Aigu1.png",{
    "Aigu1" : {x:0 , y:0, width: 84 , height:90 },
})

k.loadSpriteAtlas( "./assets/objects/horloge_Aigu2.png",{
    "Aigu2" : {x:0 , y:0, width: 93 , height:92 },
})

k.loadSpriteAtlas( "./assets/objects/ane.png",{
    "ane" : {x:16 , y:6, width: 393 , height:255 },
})

k.loadSpriteAtlas( "./assets/objects/Dufour.png",{
    "Dufour" : {x:16 , y:17, width: 498 , height:664 },
})

k.loadSpriteAtlas( "./assets/objects/fontaine.png",{
    "fontaine" : {x:45 , y:46, width: 176 , height:83 },
})

k.loadSpriteAtlas( "./assets/objects/journal.png",{ 
    "journal_petit" : {x:12 , y:5, width: 75 , height:82 },
    "journal_grand" : {x:111 , y:15, width: 471 , height:542 }
})

k.loadSpriteAtlas( "./assets/objects/journal_Lecture.png",{ 
    "journal_grand_Lecture" : {x:111 , y:15, width: 471 , height:542 }
})

k.loadSpriteAtlas( "./assets/objects/carnet.png",{
    "carnet" : {x:0 , y:0, width: 98 , height:62 },
})

// carnet
k.loadSpriteAtlas( "./assets/carnet/carnet_1_1.png",{ 
    "carnet_Index_cadenas" : {x:54, y:54, width: 816 , height:524 },
    "carnet_Pottier_vide" : {x:1078 , y:39, width: 816 , height:533 },
    "carnet_Beck_vide" : {x:58 , y:621, width: 816 , height:533 },
    "carnet_Rivaz_vide" : {x:1068 , y:635, width: 816 , height:533 },
    "carnet_Dufour_vide" : {x:57 , y:1271, width: 816 , height:533 },
    "carnet_Vuilloud_vide" : {x:1055 , y:1270, width: 816 , height:533 },
})
k.loadSpriteAtlas( "./assets/carnet/carnet_1_2.png",{ 
    "carnet_Torrent_vide" : {x:71 , y:30, width: 816 , height:533 },
    "carnet_Robriquet_vide" : {x:1046 , y:47, width: 816 , height:533 },
    "carnet_Guillot_vide" : {x:70 , y:671, width: 816 , height:533 },
    "carnet_DuFay_vide" : {x:1046 , y:671, width: 816 , height:533 },
    "carnet_Bellet_vide" : {x:1047 , y:1344, width: 816 , height:533 },
})

k.loadSpriteAtlas( "./assets/carnet/carnet_2_1.png",{ 
    "carnet_Index" : {x:54, y:54, width: 816 , height:524 },
    "carnet_Pottier" : {x:1078 , y:39, width: 816 , height:533 },
    "carnet_Beck" : {x:58 , y:621, width: 816 , height:533 },
    "carnet_Rivaz" : {x:1068 , y:635, width: 816 , height:533 },
    "carnet_Dufour" : {x:57 , y:1271, width: 816 , height:533 },
    "carnet_Vuilloud" : {x:1055 , y:1270, width: 816 , height:533 },
})
k.loadSpriteAtlas( "./assets/carnet/carnet_2_2.png",{ 
    "carnet_Torrent" : {x:71 , y:30, width: 816 , height:533 },
    "carnet_Robriquet" : {x:1046 , y:47, width: 816 , height:533 },
    "carnet_Guillot" : {x:70 , y:671, width: 816 , height:533 },
    "carnet_DuFay" : {x:1046 , y:671, width: 816 , height:533 },
    "carnet_Bellet" : {x:1047 , y:1344, width: 816 , height:533 },
    "Verso_Guillot" : {x:121 , y:1271, width: 310 , height:451},
    "Verso_Dufay" : {x:495 , y:1274, width: 352 , height:481}
 })

k.loadSpriteAtlas( "./assets/carnet/carnet_3_1.png",{ 
    "carnet_Pottier_plein" : {x:1078 , y:39, width: 816 , height:533 },
    "carnet_Beck_plein": {x:58 , y:621, width: 816 , height:533 },
    "carnet_Rivaz_plein" : {x:1068 , y:635, width: 816 , height:533 },
    "carnet_Dufour_plein" : {x:57 , y:1271, width: 816 , height:533 },
    "carnet_Vuilloud_plein" : {x:1055 , y:1270, width: 816 , height:533 },
})
k.loadSpriteAtlas( "./assets/carnet/carnet_3_2.png",{ 
    "carnet_Torrent_plein" : {x:71 , y:30, width: 816 , height:533 },
    "carnet_Robriquet_plein" : {x:1046 , y:47, width: 816 , height:533 },
    "carnet_Guillot_plein" : {x:70 , y:671, width: 816 , height:533 },
    "carnet_DuFay_plein" : {x:1046 , y:671, width: 816 , height:533 },
    "carnet_Bellet_plein" : {x:1047 , y:1344, width: 816 , height:533 },
})

k.loadSpriteAtlas( "./assets/carnet/Lecture_carnet_1_1.png",{ 
    "Lecture_carnet_Index_cadenas" : {x:54, y:54, width: 816 , height:524 },
    "Lecture_carnet_Pottier_vide" : {x:1078 , y:39, width: 816 , height:533 },
    "Lecture_carnet_Beck_vide" : {x:58 , y:621, width: 816 , height:533 },
    "Lecture_carnet_Rivaz_vide" : {x:1068 , y:635, width: 816 , height:533 },
    "Lecture_carnet_Dufour_vide" : {x:57 , y:1271, width: 816 , height:533 },
    "Lecture_carnet_Vuilloud_vide" : {x:1055 , y:1270, width: 816 , height:533 },
})
k.loadSpriteAtlas( "./assets/carnet/Lecture_carnet_1_2.png",{ 
    "Lecture_carnet_Torrent_vide" : {x:71 , y:30, width: 816 , height:533 },
    "Lecture_carnet_Robriquet_vide" : {x:1046 , y:47, width: 816 , height:533 },
    "Lecture_carnet_Guillot_vide" : {x:70 , y:671, width: 816 , height:533 },
    "Lecture_carnet_DuFay_vide" : {x:1046 , y:671, width: 816 , height:533 },
    "Lecture_carnet_Bellet_vide" : {x:1047 , y:1344, width: 816 , height:533 },
})

k.loadSpriteAtlas( "./assets/carnet/Lecture_carnet_2_1.png",{ 
    "Lecture_carnet_Index" : {x:54, y:54, width: 816 , height:524 },
    "Lecture_carnet_Pottier" : {x:1078 , y:39, width: 816 , height:533 },
    "Lecture_carnet_Beck" : {x:58 , y:621, width: 816 , height:533 },
    "Lecture_carnet_Rivaz" : {x:1068 , y:635, width: 816 , height:533 },
    "Lecture_carnet_Dufour" : {x:57 , y:1271, width: 816 , height:533 },
    "Lecture_carnet_Vuilloud" : {x:1055 , y:1270, width: 816 , height:533 },
})
k.loadSpriteAtlas( "./assets/carnet/Lecture_carnet_2_2.png",{ 
    "Lecture_carnet_Torrent" : {x:71 , y:30, width: 816 , height:533 },
    "Lecture_carnet_Robriquet" : {x:1046 , y:47, width: 816 , height:533 },
    "Lecture_carnet_Guillot" : {x:70 , y:671, width: 816 , height:533 },
    "Lecture_carnet_DuFay" : {x:1046 , y:671, width: 816 , height:533 },
    "Lecture_carnet_Bellet" : {x:1047 , y:1344, width: 816 , height:533 },
    "Lecture_Verso_Guillot" : {x:121 , y:1271, width: 310 , height:451},
    "Lecture_Verso_Dufay" : {x:495 , y:1274, width: 352 , height:481}
 })

k.loadSpriteAtlas( "./assets/carnet/Lecture_carnet_3_1.png",{ 
    "Lecture_carnet_Pottier_plein" : {x:1078 , y:39, width: 816 , height:533 },
    "Lecture_carnet_Beck_plein": {x:58 , y:621, width: 816 , height:533 },
    "Lecture_carnet_Rivaz_plein" : {x:1068 , y:635, width: 816 , height:533 },
    "Lecture_carnet_Dufour_plein" : {x:57 , y:1271, width: 816 , height:533 },
    "Lecture_carnet_Vuilloud_plein" : {x:1055 , y:1270, width: 816 , height:533 },
})
k.loadSpriteAtlas( "./assets/carnet/Lecture_carnet_3_2.png",{ 
    "Lecture_carnet_Torrent_plein" : {x:71 , y:30, width: 816 , height:533 },
    "Lecture_carnet_Robriquet_plein" : {x:1046 , y:47, width: 816 , height:533 },
    "Lecture_carnet_Guillot_plein" : {x:70 , y:671, width: 816 , height:533 },
    "Lecture_carnet_DuFay_plein" : {x:1046 , y:671, width: 816 , height:533 },
    "Lecture_carnet_Bellet_plein" : {x:1047 , y:1344, width: 816 , height:533 },
})

k.loadSpriteAtlas( "./assets/carnet/cross.png",{ 
    "cross" : {x:6 , y:4, width: 17 , height:20 },
})

k.loadSpriteAtlas( "./assets/carnet/lignes.png",{ 
    "ligne_Pottier" : {x:33 , y:32, width: 207 , height:3 },
    "ligne_Beck": {x:33 , y:76, width: 140 , height:3 },
    "ligne_Rivaz" : {x:33 , y:114, width: 275 , height:3 },
    "ligne_Dufour" : {x:33 , y:154, width: 143 , height:3 },
    "ligne_Vuilloud" : {x:33, y:194, width: 159 , height:3 },
    "ligne_Torrent" : {x:33 , y:231, width: 150 , height:3 },
    "ligne_Robriquet" : {x:33 , y:271, width: 160 , height:3 },
    "ligne_Guillot" : {x:33 , y:311, width: 144 , height:3 },
    "ligne_DuFay" : {x:33 , y:351, width: 200 , height:3 },
    "ligne_Bellet" : {x:33 , y:391, width: 205 , height:3 },
})

k.loadSpriteAtlas( "./assets/carnet/Lecture_lignes.png",{ 
    "Lecture_ligne_Pottier" : {x:33 , y:32, width: 231 , height:3 },
    "Lecture_ligne_Beck": {x:33 , y:76, width: 167 , height:3 },
    "Lecture_ligne_Rivaz" : {x:33 , y:114, width: 315 , height:3 },
    "Lecture_ligne_Dufour" : {x:33 , y:154, width: 165 , height:3 },
    "Lecture_ligne_Vuilloud" : {x:33, y:194, width: 173 , height:3 },
    "Lecture_ligne_Torrent" : {x:33 , y:231, width: 173 , height:3 },
    "Lecture_ligne_Robriquet" : {x:33 , y:271, width: 185 , height:3 },
    "Lecture_ligne_Guillot" : {x:33 , y:311, width: 157 , height:3 },
    "Lecture_ligne_DuFay" : {x:33 , y:351, width: 226 , height:3 },
    "Lecture_ligne_Bellet" : {x:33 , y:391, width: 247 , height:3 },
})

k.loadSpriteAtlas( "./assets/carnet/carnet_Historio_1.png",{ 
    "carnet_p_1" : {x:0 , y:0, width: 1047 , height:671 },
    "carnet_p_2" : {x:0 , y:670, width: 1047 , height:671 },
    "carnet_p_3" : {x:0 , y:1348, width: 1047 , height:671 },
})
k.loadSpriteAtlas( "./assets/carnet/carnet_Historio_2.png",{ 
    "carnet_p_4" : {x:0 , y:0, width: 1047 , height:671 },
    "carnet_p_5" : {x:0 , y:670, width: 1047 , height:671 },
    "carnet_p_6" : {x:0 , y:1348, width: 1047 , height:671 },
   
})
k.loadSpriteAtlas( "./assets/carnet/carnet_Historio_3.png",{ 
    "carnet_p_7" : {x:0 , y:0, width: 1047 , height:671 },
    "carnet_p_8" : {x:0 , y:670, width: 1047 , height:671 },
    
})
// instructions 
k.loadSpriteAtlas( "./assets/instructions/Instructions_1.png",{ 
    "a_w_s_d" : {x:15 , y:817, width: 712 , height:505 },
    "e": {sliceX: 2,sliceY: 1,x: 850,y: 339,width: 461,height: 278,
        anims: {
            'e-down': {from: 0, to:1, speed : 2, loop: true}
        },
    },
    "c": {sliceX: 2,sliceY: 1,x: 16,y: 408,width: 456,height: 269,
        anims: {
            'c-down': {from: 0, to:1, speed : 2, loop: true}
        },
    },
    "enter": {sliceX: 2,sliceY: 1,x: 733,y: 910,width: 589,height: 416,
        anims: {
            'enter-down': {from: 0, to:1, speed : 2, loop: true}
        },
    },
    "fleche_gauche": {sliceX: 2,sliceY: 1,x: 15,y: 10,width: 466,height: 277,
        anims: {
            'fleche_gauche-down': {from: 0, to:1, speed : 2, loop: true}
        },
    },
    "fleche_droite": {sliceX: 2,sliceY: 1,x: 850,y: 11,width: 456,height: 273,
        anims: {
            'fleche_droite-down': {from: 0, to:1, speed : 2, loop: true}
        },
    },
})

k.loadSpriteAtlas( "./assets/instructions/etoile_touche.png",{ 
    "etoile": {sliceX: 2,sliceY: 1,x: 133,y: 235,width: 1160,height: 620,
        anims: {
            'etoile_anim': {from: 0, to:1, speed : 3, loop: true}
        },
    },
})


// font
k.loadFont("DefaultFont", "./assets/font/jupiterc.ttf")
k.loadFont("LectureMenu", "./assets/font/Luciole-Regular.ttf")
k.loadFont("CarnetFont", "./assets/font/ITCKRIST.TTF")

// musique 
k.loadSound("river", "./assets/music/river.mp3")
k.loadSound("outside", "./assets/music/outside.mp3")
k.loadSound("inside", "./assets/music/inside.mp3")
k.loadSound("book", "./assets/music/book.mp3")

// start la musique
export const music = k.play("outside", {
    volume: 0.02,
    loop: true
})
Music_Outside.setinstanceOutside(true)

const scenes = {
    world,
    house,
    pont,
    salon,
    intro_1,
    intro_2,
    outro_1,
    outro_2,
    historio,
    menu,

}

for (const sceneName in scenes) {
    k.scene(sceneName, ()=> scenes[sceneName](k));
    
}

k.go("menu"); 