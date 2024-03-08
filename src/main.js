import k from "./kaboomContext.js";
import world from "./scenes/world.js";
import house from "./scenes/house.js";
import pont from "./scenes/pont.js"
import intro_1 from "./scenes/intro_1.js"
import intro_2 from "./scenes/intro_2.js"
 

k.loadSprite("assets_pont", "./assets/pont.png", {
    sliceX: 127,
    sliceY: 105,
});

k.loadSprite("assets_place", "./assets/place.png", {
    sliceX: 112,
    sliceY: 64,
});

k.loadSprite("assets_bureau", "./assets/bureau.png", {
    sliceX: 112,
    sliceY: 64,
});

k.loadSprite("assets_intro_1", "assets/scene_intro_1.png", {
    sliceX: 112,
    sliceY: 64,
});

k.loadSprite("assets_intro_2", "assets/scene_intro_2.png", {
    sliceX: 43,
    sliceY: 43,
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

k.loadSpriteAtlas( "./assets/pnj-marchand_petit.png", {
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

k.loadSpriteAtlas( "./assets/carnet.png",{
    "carnet" : {x:0 , y:0, width: 98 , height:62 },
})

k.loadSpriteAtlas( "./assets/carnet_vide.png",{ 
    "carnet_vide" : {x:36 , y:32, width: 804 , height:522 },
})

k.loadSpriteAtlas( "./assets/journal.png",{ 
    "journal_petit" : {x:12 , y:5, width: 75 , height:82 },
    "journal_grand" : {x:111 , y:15, width: 471 , height:542 }
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