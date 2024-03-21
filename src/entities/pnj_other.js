
import {Meet_Pottier_ok,Meet_Bellet_ok, Meet_Folken_ok,gameState} from "../state/stateManagers.js";

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

export async function EventMarieAnneFolken(k){
    if(!Meet_Bellet_ok.getinstanceBellet() || !Meet_Pottier_ok.getinstancePottier() || Meet_Folken_ok.getinstanceFolken())return;
    Meet_Folken_ok.setinstanceFolken(true)
    gameState.setFreezePlayer(true)
    const petite_Folken = k.add([k.sprite("pnj_Folken_down_little"), k.pos(520, 470),"pnj-Folken-petite" ])
    k.wait(0, ()=> {
        k.tween(
            petite_Folken.pos,
            k.vec2(520, 475),
            2,
            (val) => petite_Folken.pos = val,
            )
    })
    k.wait(3, () => {
        petite_Folken.use(k.sprite("pnj_Folken_left_little"))
	    k.tween(
        petite_Folken.pos,
		k.vec2(375, 475),
		2,
		(val) => petite_Folken.pos = val,
        )
    })
    k.wait(5, () => {
        petite_Folken.use(k.sprite("pnj_Folken_up_little"))
	    k.tween(
        petite_Folken.pos,
		k.vec2(375, 470),
		2,
		(val) => petite_Folken.pos = val,
        )   
    })
    k.wait(7, () => {k.destroyAll("pnj-Folken-petite"); gameState.setFreezePlayer(false)})
}




//"pnj_Folken_up_little" : {x:114 , y:499, width: 39 , height:95 }, pnj_Folken_right_little