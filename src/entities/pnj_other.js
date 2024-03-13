
import {Meet_Pottier_ok,Meet_Bellet_ok, Meet_Folken_ok} from "../state/stateManagers.js";

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

export function EventMarieAnneFolken(k){
    if(!Meet_Bellet_ok.getinstanceBellet() && !Meet_Pottier_ok.getinstancePottier())return;
    k.wait(8, () => {
        //Event ou le personnage avance et rentre par la porte
        Meet_Folken_ok.setinstanceFolken(true)
    })

}


