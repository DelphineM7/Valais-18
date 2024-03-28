// fonctions qui permettent de créer le player dans les différentes seaines en 3 tailles différentes + les fonctions qui permettent le mouvement 

import { gameState } from "../state/stateManagers.js";
import { SetSprite } from "../utils.js";

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
        if (gameState.getFreezePlayer()) return; /// Ca check si le player est freez ( c'et le cas pdt un dialogue)
        if (["left","a"].includes(key)){   // ça check si la touche pressée est inclue dans le [] 
            player.flipX = false;  
            SetSprite(k,player,"player-side")  
            player.move(-player.speed, 0);
            player.direction = "left";     //permet de tenir à jour l'information sur la direcction du player pour les interactions
            return;                         //on évite les problème si plusieur key sont appuyés
        }
        if(["right","d"].includes(key)){
            player.flipX = true; 
            SetSprite(k,player,"player-side")    
            player.move(player.speed, 0);
            player.direction = "right";     
            return; 
        }
        if(["up","w"].includes(key)){
            SetSprite(k,player,"player-up")    
            player.move(0, -player.speed);
            player.direction = "up";     
            return; 
        }
        if(["down","s"].includes(key)){
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
        if (["left","a"].includes(key)){   
            player.flipX = false;  
            SetSprite(k,player,"big-player-side")  
            player.move(-player.speed, 0);
            player.direction = "left";     
            return;                         
        }
        if(["right","d"].includes(key)){
            player.flipX = true; 
            SetSprite(k,player,"big-player-side")    
            player.move(player.speed, 0);
            player.direction = "right";     
            return; 
        }
        if(["up","w"].includes(key)){
            SetSprite(k,player,"big-player-up")    
            player.move(0, -player.speed);
            player.direction = "up";     
            return; 
        }
        if(["down","s"].includes(key)){
            SetSprite(k,player,"big-player-idle-down")    
            player.move(0, player.speed);
            player.direction = "down";     
            return; 
        }


    })
    k.onKeyRelease(() => {  
        player.stop();
      })
}

export function generateMoyenPlayerComponents(k, pos){ 
    return [
        k.sprite("medium-player-idle-down"),
        k.area({shape: new k.Rect(k.vec2(0,150), 70, 50)}), 
        k.body({}), 
        k.pos(pos),
        k.opacity(1),
        k.z(2),
        {
            currentSprite : 'medium-player-idle-down',
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
        if (["left","a"].includes(key)){   
            player.flipX = false;  
            SetSprite(k,player,"medium-player-side")  
            player.move(-player.speed, 0);
            player.direction = "left";     
            return;                         
        }
        if(["right","d"].includes(key)){
            player.flipX = true; 
            SetSprite(k,player,"medium-player-side")    
            player.move(player.speed, 0);
            player.direction = "right";     
            return; 
        }
        if(["up","w"].includes(key)){
            SetSprite(k,player,"medium-player-up")    
            player.move(0, -player.speed);
            player.direction = "up";     
            return; 
        }
        if(["down","s"].includes(key)){
            SetSprite(k,player,"medium-player-down")    
            player.move(0, player.speed);
            player.direction = "down";     
            return; 
        }


    })
    k.onKeyRelease(() => {  
        player.stop();
      })
}

export function generateBigMediumPlayerComponents(k, pos){
    return [
        k.sprite("medium-big--player-idle-down"),
        k.area({shape: new k.Rect(k.vec2(0,210), 80, 30)}), 
        k.body({}), 
        k.pos(pos),
        k.opacity(1),
        {
            currentSprite : 'medium-big--player-idle-down',
            speed : 200,
            direction: "down",


        },
        "big-medium-player", // tag du personnage -> k.get("player")
    ];
}

export function setBigMediumPlayerMovement(k, player){
    k.onKeyDown((key) =>{
        if (gameState.getFreezePlayer()) return; 
        if (["left","a"].includes(key)){   
            player.flipX = false;  
            SetSprite(k,player,"medium-big-player-side")  
            player.move(-player.speed, 0);
            player.direction = "left";     
            return;                         
        }
        if(["right","d"].includes(key)){
            player.flipX = true; 
            SetSprite(k,player,"medium-big-player-side")    
            player.move(player.speed, 0);
            player.direction = "right";     
            return; 
        }
        if(["up","w"].includes(key)){
            SetSprite(k,player,"medium-big-player-up")    
            player.move(0, -player.speed);
            player.direction = "up";     
            return; 
        }
        if(["down","s"].includes(key)){
            SetSprite(k,player,"medium-big-player-down")    
            player.move(0, player.speed);
            player.direction = "down";     
            return; 
        }


    })
    k.onKeyRelease(() => {  
        player.stop();
      })
}


