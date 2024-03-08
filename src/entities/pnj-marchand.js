import { dialog } from "../uiComponents/dialog.js";
import { SetSprite } from "../utils.js";
import pnj_marchandLines from "../content/pnj_marchandDialogue.js"

export function generatepnj_marchandComponents(k, pos){ 
    return [
        k.sprite("marchand-idle-down"),
        k.area({shape: new k.Rect(k.vec2(0,64), 39, 22)}),
        k.body({isStatic : true}), 
        k.pos(pos),
        k.opacity(1), 
        {
            currentSprite : 'marchand-idle-down',
            direction: "down",
    
        },
        "pnj-marchand", 
    ];
}

export async function startInteraction (k, oldman, player){
    if(player.direction === "left"){
        SetSprite(k,oldman,"marchand-side-right") 
    }

    if(player.direction === "right"){
        SetSprite(k,oldman,"marchand-side-left") 
    }

    if(player.direction === "up"){
        oldman.flipx = true;
        SetSprite(k,oldman,"marchand-down") 
    }

    const responses = pnj_marchandLines.french;

    dialog(k, k.vec2(32,16), responses[0])

}


