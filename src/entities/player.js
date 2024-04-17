// fonctions qui permettent de créer le player dans les différentes seaines en 3 tailles différentes + les fonctions qui permettent le mouvement 

import { gameState } from "../state/stateManagers.js";
import { SetSprite } from "../utils.js";

function AreKeyDownAlready(k, keys){
    for ( const key of keys){
        if(k.isKeyDown(key)) return true
    }
    return false
}


export function generatePlayerComponents(k, pos){
    return [
        k.sprite("player-idle-down"),
        k.area({shape: new k.Rect(k.vec2(0,64), 33, 22)}), // hitbox du player + vec2 = position relative 10 = width du rectange 12 = height
        k.body({}), // affect le player par la physique, être poussé et poussé p.ex
        k.pos(pos),
        k.opacity(1), // dans notre code pas utile, mais ca peut être utilie pour donner une impression de clignoter quand le personnage est touché 
        {
            currentSprite : 'player-idle-down',
            speed : 125,
            attackPower: 0, 
            direction: "down",
            isAttacking : false,
            isFrozen : false // Peut-être utile pour les pnj 

        },
        "player", // tag du personnage -> k.get("player")
    ]; 
}

export function setPlayerMovement(k, player){
    k.onKeyDown((key) =>{
        if (gameState.getFreezePlayer()) return; /// Ca check si le player est freez ( c'est le cas pdt un dialogue)
        if (["left","a"].includes(key) && !AreKeyDownAlready(k, ["right", "d", "up", "w", "s", "down"])){   // ça check si la touche pressée est inclue dans le [] 
            player.flipX = false;  
            SetSprite(k,player,"player-side")  
            player.move(-player.speed, 0);
            player.direction = "left";     //permet de tenir à jour l'information sur la direcction du player pour les interactions
            return;                         
        }
        if(["right","d"].includes(key) && !AreKeyDownAlready(k, ["left", "a", "up", "w", "s", "down"])){
            player.flipX = true; 
            SetSprite(k,player,"player-side")    
            player.move(player.speed, 0);
            player.direction = "right";     
            return; 
        }
        if(["up","w"].includes(key) && !AreKeyDownAlready(k, ["left", "a", "right", "d", "s", "down"])){
            SetSprite(k,player,"player-up")    
            player.move(0, -player.speed);
            player.direction = "up";     
            return; 
        }
        if(["down","s"].includes(key) && !AreKeyDownAlready(k, ["left", "a", "up", "w", "d", "right"])){
            SetSprite(k,player,"player-down")    
            player.move(0, player.speed);
            player.direction = "down";     
            return; 
        }


    })
    k.onKeyRelease(() => {  //permet d'arrêter l'animation du personnage qui se  déplace quand la touche n'est plus appuyée
        player.stop();
      })
}

export function generateBigPlayerComponents(k, pos){ //Player pour la scène dans le bureau
    return [
        k.sprite("big-player-idle-down"),
        k.area({shape: new k.Rect(k.vec2(0,360), 145, 35)}), // hitbox du player + vec2 = position relative 10 = width du rectange 12 = height
        k.body({}), // affect le player par la physique, être poussé et poussé p.ex
        k.pos(pos),
        k.opacity(1), // dans notre code pas utile, mais ca peut être utilie pour donner une impression de clignoter quand le personnage est touché 
        {
            currentSprite : 'big-player-idle-down',
            speed : 300,
            attackPower: 0, 
            direction: "down",
            isAttacking : false,
            isFrozen : false // Peut-être utile pour les pnj 
    
        },
        "big_player", // tag du personnage -> k.get("player")
    ];
}


export function setBigPlayerMovement(k, player){
    k.onKeyDown((key) =>{
        if (gameState.getFreezePlayer()) return;
        if (["a"].includes(key) && !AreKeyDownAlready(k, ["up", "w", "s", "down"])){
            player.flipX = false;  
            if(player.curAnim() !== 'walk-big-side'){
                SetSprite(k,player,"big-player-idle-side")  
                player.play("walk-big-side")   
            }
            player.move(-player.speed, 0);
            player.direction = "left";     
            return                 
        }
        if(["d"].includes(key) && !AreKeyDownAlready(k, ["up", "w", "s", "down"])){
            player.flipX = true; 
            if(player.curAnim() !== 'walk-big-side'){
                SetSprite(k,player,"big-player-idle-side")   
                player.play("walk-big-side")
            }    
            player.move(player.speed, 0);
            player.direction = "right";     
            return
        }
        if(["w"].includes(key)){
            if(player.curAnim() !== "walk-big-up"){
                SetSprite(k,player,"big-player-idle-up")   
                player.play("walk-big-up")   
            }  
            player.move(0, -player.speed);
            player.direction = "up";   
            return
        }
        if(["s"].includes(key)){
            if(player.curAnim() !== "walk-big-down"){
                SetSprite(k,player,"big-player-idle-down")    
                player.play("walk-big-down")  
            } 
            player.move(0, player.speed);
            player.direction = "down";   
            return
        }


    })
    k.onKeyRelease(() => {  
        player.stop();
        if (player.direction === "down"){
            SetSprite(k,player,"big-player-idle-down-pos")  
        }
        if (player.direction === "right"){
            SetSprite(k,player,"big-player-idle-side-pos")  
            player.flipX = true; 
        }
        if (player.direction === "left"){
            SetSprite(k,player,"big-player-idle-side-pos")  
        }
        if (player.direction === "up"){
            SetSprite(k,player,"big-player-idle-up-pos")  
        }
      })
}

export function generateMoyenPlayerComponents(k, pos){ 
    return [
        k.sprite("petit-player-idle-down"),
        k.area({shape: new k.Rect(k.vec2(0,150), 70, 50)}), 
        k.body({}), 
        k.pos(pos),
        k.opacity(1),
        k.z(2),
        {
            currentSprite : "petit-player-idle-down",
            speed : 220,
            attackPower: 0, 
            direction: "down",
            isAttacking : false,
            isFrozen : false 
    
        },
        "medium_player", 
    ];
}

export function setMoyenPlayerMovement(k, player){
    k.onKeyDown((key) =>{
        if (gameState.getFreezePlayer()) return;
        if (["a"].includes(key)&& !AreKeyDownAlready(k, ["up", "w", "s", "down"])){
            player.flipX = false;  
            if(player.curAnim() !== 'walk-side'){
                SetSprite(k,player,"petit-player-idle-side")  
                player.play("walk-side")   
            }
            player.move(-player.speed, 0);
            player.direction = "left";     
                             
        }
        if(["d"].includes(key)&& !AreKeyDownAlready(k, ["up", "w", "s", "down"])){
            player.flipX = true; 
            if(player.curAnim() !== 'walk-side'){
                SetSprite(k,player,"petit-player-idle-side")   
                player.play("walk-side")
            }    
            player.move(player.speed, 0);
            player.direction = "right";     
          
        }
        if(["w"].includes(key)){
            if(player.curAnim() !== "walk-up"){
                SetSprite(k,player,"petit-player-idle-up")   
                player.play("walk-up")   
            }  
            player.move(0, -player.speed);
            player.direction = "up";   
       
        }
        if(["s"].includes(key)){
            if(player.curAnim() !== "walk-down"){
                SetSprite(k,player,"petit-player-idle-down")    
                player.play("walk-down")  
            } 
            player.move(0, player.speed);
            player.direction = "down";   
     
        }


    })
    k.onKeyRelease(() => {  
        player.stop();
        if (player.direction === "down"){
            SetSprite(k,player,"petit-player-idle-down-pos")  
        }
        if (player.direction === "right"){
            SetSprite(k,player,"petit-player-idle-side-pos")  
            player.flipX = true; 
        }
        if (player.direction === "left"){
            SetSprite(k,player,"petit-player-idle-side-pos")  
        }
        if (player.direction === "up"){
            SetSprite(k,player,"petit-player-idle-up-pos")  
        }
      })
}

export function generateBigMediumPlayerComponents(k, pos){
    return [
        k.sprite("medium-big-player-idle-down"),
        k.area({shape: new k.Rect(k.vec2(0,210), 80, 30)}), 
        k.body({}), 
        k.pos(pos),
        k.opacity(1),
        {
            currentSprite : 'medium-big-player-idle-down',
            speed : 200,
            direction: "down",


        },
        "big-medium-player", // tag du personnage -> k.get("player")
    ];
}

export function setBigMediumPlayerMovement(k, player){
    k.onKeyDown((key) =>{
        if (gameState.getFreezePlayer()) return; 
        if (["a"].includes(key)&& !AreKeyDownAlready(k, ["up", "w", "s", "down"])){
            player.flipX = false;  
            if(player.curAnim() !== 'walk-medium-side'){
                SetSprite(k,player,"medium-big-player-idle-side")  
                player.play("walk-medium-side")   
            }
            player.move(-player.speed, 0);
            player.direction = "left";     
                             
        }
        if(["d"].includes(key)&& !AreKeyDownAlready(k, ["up", "w", "s", "down"])){
            player.flipX = true; 
            if(player.curAnim() !== 'walk-medium-side'){
                SetSprite(k,player,"medium-big-player-idle-side")   
                player.play("walk-medium-side")
            }    
            player.move(player.speed, 0);
            player.direction = "right";     
          
        }
        if(["w"].includes(key)){
            if(player.curAnim() !== "walk-medium-up"){
                SetSprite(k,player,"medium-big-player-idle-up")   
                player.play("walk-medium-up")   
            }  
            player.move(0, -player.speed);
            player.direction = "up";   
       
        }
        if(["s"].includes(key)){
            if(player.curAnim() !== "walk-medium-down"){
                SetSprite(k,player,"medium-big-player-idle-down")    
                player.play("walk-medium-down")  
            } 
            player.move(0, player.speed);
            player.direction = "down";   
     
        }


    })
    k.onKeyRelease(() => {  
        player.stop();
        if (player.direction === "down"){
            SetSprite(k,player,"medium-big-player-idle-down-pos")  
        }
        if (player.direction === "right"){
            SetSprite(k,player,"medium-big-player-idle-side-pos")  
            player.flipX = true; 
        }
        if (player.direction === "left"){
            SetSprite(k,player,"medium-big-player-idle-side-pos")  
        }
        if (player.direction === "up"){
            SetSprite(k,player,"medium-big-player-idle-up-pos")  
        }
      })
}


