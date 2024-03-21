import k from "./kaboomContext.js";
import world from "./scenes/world.js";
import house from "./scenes/house.js";
import pont from "./scenes/pont.js"
import intro_1 from "./scenes/intro_1.js"
import intro_2 from "./scenes/intro_2.js"
 

k.loadSpriteAtlas("./assets/scene_intro_1.png", {
    "assets_intro_1" : {x:0 , y:0 , width: 1216 , height:688 },
});

k.loadSpriteAtlas("./assets/scene_intro_2.png", {
    "assets_intro_2" : {x:0 , y:0 , width: 450 , height:700 },
});

k.loadSpriteAtlas("./assets/pont.png", {
    "assets_pont" : {x:30 , y:24 , width: 1215 , height:688 },
});

k.loadSpriteAtlas("./assets/place.png", {
    "assets_place" : {x:5 , y:5 , width: 1216 , height:688 },
});

k.loadSpriteAtlas("./assets/bureau.png", {
    "assets_bureau" : {x:7 , y:8 , width: 1216 , height:688 },
});

k.loadSpriteAtlas( "./assets/Player.png", {
    "player-idle-down" : {x:6 , y:10 , width: 30 , height:86 },
    'player-down' : {x:6 , y:10 , width: 35 , height:86 },
    'player-side' : {x:64 , y:10 , width: 35 , height:86 },
    'player-up' : {x:125 , y:10 , width: 35 , height:86 }
})

k.loadSpriteAtlas( "./assets/Player_grand.png", {
    "big-player-idle-down" : {x:28 , y:4 , width: 145 , height:390},
    'big-player-down' : {x:28 , y:4 , width: 145 , height:390},
    'big-player-side' : {x:216 , y:4 , width: 124 , height:394 },
    'big-player-up' : {x:396 , y:8 , width: 142 , height:392 }
})

k.loadSpriteAtlas( "./assets/Player_moyen.png", {
    "medium-player-idle-down" : {x:5 , y:5 , width: 70 , height:200},
    'medium-player-down' : {x:5 , y:5 , width: 70 , height:200},
    'medium-player-side' : {x:100 , y:4 , width: 69 , height:200 },
    'medium-player-up' : {x:184 , y:4 , width: 76 , height:200 }
})

k.loadSpriteAtlas( "./assets/pnj-marchand_petit.png", { // Rey-Bellet
    "marchand-idle-down" : {x:6 , y:5 , width: 39 , height:93 },
    'marchand-down' : {x:6 , y:5 , width: 39 , height:93 },
    'marchand-side-right' : {x:56 , y:6 , width: 28 , height:91 },
    'marchand-side-left' : {x:141 , y:5 , width: 35 , height:94 },
    'marchand-up' : {x:97 , y:7 , width: 36 , height:90 }
})

k.loadSpriteAtlas( "./assets/doc_tableau_DeRivaz.png",{
    "tabl_Rivaz" : {x:37 , y:34, width: 131 , height:147 },
})

k.loadSpriteAtlas( "./assets/DeRivaBigPortrait.png",{
    "Big_tabl_Rivaz" : {x:8 , y:38, width: 500 , height:623 },
})

k.loadSpriteAtlas( "./assets/pnj_Folken.png",{
    "pnj_Folken_down" : {x:7 , y:16, width: 145 , height:400 },
    "pnj_Folken_left" : {x:175 , y:6, width: 146 , height:409 },
    "pnj_Folken_right" : {x:537 , y:9, width: 152 , height:400 },
    "pnj_Folken_up" : {x:348 , y:4, width: 165 , height:399 },
    "pnj_Folken_down_little" : {x:18 , y:500, width: 36 , height:93 },
    "pnj_Folken_left_little" : {x:63 , y:503, width: 35 , height:93 },
    "pnj_Folken_right_little" : {x:170 , y:500, width: 35 , height:95 },
    "pnj_Folken_up_little" : {x:114 , y:499, width: 39 , height:95 },
})

k.loadSpriteAtlas( "./assets/papier_1.png",{
    "Papier_1" : {x:22 , y:14, width: 595 , height:674 },
})

k.loadSpriteAtlas( "./assets/papier_2.png",{
    "Papier_2" : {x:212 , y:135, width: 655 , height:671 },
})

k.loadSpriteAtlas( "./assets/horloge_Aigu1.png",{
    "Aigu1" : {x:0 , y:0, width: 84 , height:90 },
})

k.loadSpriteAtlas( "./assets/horloge_Aigu2.png",{
    "Aigu2" : {x:0 , y:0, width: 93 , height:92 },
})

k.loadSpriteAtlas( "./assets/ane.png",{
    "ane" : {x:16 , y:6, width: 393 , height:255 },
})

k.loadSpriteAtlas( "./assets/Dufour.png",{
    "Dufour" : {x:16 , y:17, width: 498 , height:664 },
})

k.loadSpriteAtlas( "./assets/pnj_Torrent.png",{
    "pnj_Torrent_down" : {x:5 , y:5, width: 75 , height:202 },
    "pnj_Torrent_left" : {x:120 , y:3, width: 69 , height:205 },
    "pnj_Torrent_right" : {x:329 , y:4, width: 76 , height:205 },
    "pnj_Torrent_up" : {x:232 , y:1, width: 76 , height:204 },
})

k.loadSpriteAtlas( "./assets/pnj_Pottier.png",{
    "pnj_Pottier_down" : {x:1 , y:1, width: 34 , height:92 },
    "pnj_Pottier_left" : {x:36 , y:4, width: 30 , height:89 },
    "pnj_Pottier_right" : {x:106 , y:3, width: 29 , height:90 },
    "pnj_Pottier_up" : {x:68 , y:2, width: 33 , height:90 },
})

k.loadSpriteAtlas( "./assets/fontaine.png",{
    "fontaine" : {x:0 , y:0, width: 135 , height:47 },
})

k.loadSpriteAtlas( "./assets/journal.png",{ 
    "journal_petit" : {x:12 , y:5, width: 75 , height:82 },
    "journal_grand" : {x:111 , y:15, width: 471 , height:542 }
})

k.loadSpriteAtlas( "./assets/carnet.png",{
    "carnet" : {x:0 , y:0, width: 98 , height:62 },
})

k.loadSpriteAtlas( "./assets/carnet_1_1.png",{ 
    "carnet_p_1" : {x:54, y:54, width: 816 , height:524 },
    "carnet_Pottier_vide" : {x:1078 , y:39, width: 816 , height:533 },
    "carnet_Beck_vide" : {x:58 , y:621, width: 816 , height:533 },
    "carnet_Rivaz_vide" : {x:1068 , y:635, width: 816 , height:533 },
    "carnet_Dufour_vide" : {x:57 , y:1271, width: 816 , height:533 },
    "carnet_Vuilloud_vide" : {x:1055 , y:1270, width: 816 , height:533 },
})
k.loadSpriteAtlas( "./assets/carnet_1_2.png",{ 
    "carnet_Torrent_vide" : {x:71 , y:30, width: 816 , height:533 },
    "carnet_Robriquet_vide" : {x:1046 , y:47, width: 816 , height:533 },
    "carnet_Guillot_vide" : {x:70 , y:671, width: 816 , height:533 },
    "carnet_DuFay_vide" : {x:1046 , y:671, width: 816 , height:533 },
    "carnet_Bellet_vide" : {x:1047 , y:1344, width: 816 , height:533 },
})

k.loadSpriteAtlas( "./assets/carnet_2_1.png",{ 
    "carnet_Pottier" : {x:1078 , y:39, width: 816 , height:533 },
    "carnet_Beck" : {x:58 , y:621, width: 816 , height:533 },
    "carnet_Rivaz" : {x:1068 , y:635, width: 816 , height:533 },
    "carnet_Dufour" : {x:57 , y:1271, width: 816 , height:533 },
    "carnet_Vuilloud" : {x:1055 , y:1270, width: 816 , height:533 },
})
k.loadSpriteAtlas( "./assets/carnet_2_2.png",{ 
    "carnet_Torrent" : {x:71 , y:30, width: 816 , height:533 },
    "carnet_Robriquet" : {x:1046 , y:47, width: 816 , height:533 },
    "carnet_Guillot" : {x:70 , y:671, width: 816 , height:533 },
    "carnet_DuFay" : {x:1046 , y:671, width: 816 , height:533 },
    "carnet_Bellet" : {x:1047 , y:1344, width: 816 , height:533 },
})

k.loadSpriteAtlas( "./assets/carnet_3_1.png",{ 
    "carnet_Pottier_plein" : {x:1078 , y:39, width: 816 , height:533 },
    "carnet_Beck_plein": {x:58 , y:621, width: 816 , height:533 },
    "carnet_Rivaz_plein" : {x:1068 , y:635, width: 816 , height:533 },
    "carnet_Dufour_plein" : {x:57 , y:1271, width: 816 , height:533 },
    "carnet_Vuilloud_plein" : {x:1055 , y:1270, width: 816 , height:533 },
})
k.loadSpriteAtlas( "./assets/carnet_3_2.png",{ 
    "carnet_Torrent_plein" : {x:71 , y:30, width: 816 , height:533 },
    "carnet_Robriquet_plein" : {x:1046 , y:47, width: 816 , height:533 },
    "carnet_Guillot_plein" : {x:70 , y:671, width: 816 , height:533 },
    "carnet_DuFay_plein" : {x:1046 , y:671, width: 816 , height:533 },
    "carnet_Bellet_plein" : {x:1047 , y:1344, width: 816 , height:533 },
})

k.loadSpriteAtlas( "./assets/cross.png",{ 
    "cross" : {x:6 , y:4, width: 17 , height:20 },
})

k.loadSpriteAtlas( "./assets/lignes.png",{ 
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

k.loadFont("NiceFont", "./assets/jupiterc.ttf")

const scenes = {
    world,
    house,
    pont,
    intro_1,
    intro_2
}

for (const sceneName in scenes) {
    k.scene(sceneName, ()=> scenes[sceneName](k));
    
}

k.go("intro_1");