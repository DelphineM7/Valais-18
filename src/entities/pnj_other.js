// fonctions liées au pnj
import {Dufour_ok,Meet_Pottier_ok,Meet_Bellet_ok, Meet_Folken_ok,gameState, DufourExist} from "../state/stateManagers.js";

// fonction pour générer le rey-Bellet ( la méthode a changé pour les autres pnj, mais celui-là est resté)
export function generatepnj_marchandComponents(k, pos){ 
    return [
        k.sprite("marchand-idle-down"),
        k.area({shape: new k.Rect(k.vec2(0,190), 90, 22)}),
        k.body({isStatic : true}), 
        k.pos(pos),
        k.opacity(1),  
        k.z(3),
        {
            currentSprite : 'marchand-idle-down',
            direction: "down",
    
        },
        "pnj-marchand", 
    ];
}
// fonction pour générer le Dufour ( la méthode a changé pour les autres pnj, mais celui-là est resté)
export function generatepnj_DufourComponents(k){ 
    let position = k.vec2(0,0)
    if (DufourExist.getinstanceDufourCollide()) position = k.vec2(265, 370)
    else  position = k.vec2(240, 340)

    return [
        k.sprite("pnj_Dufour_down"),
        k.area({shape: new k.Rect(k.vec2(0,190), 90, 22)}),
        k.body({isStatic : true}), 
        k.pos(position),
        k.z(0),
        {
            currentSprite : 'pnj_Dufour_down',
            direction: "down",
    
        },
        "pnj-dufour",
    ];
}

// fonction qui permet la cinématique sur la place de Marie Anne Folken
export async function EventMarieAnneFolken(k, map){
    if(!Meet_Bellet_ok.getinstanceBellet() || !Meet_Pottier_ok.getinstancePottier() || Meet_Folken_ok.getinstanceFolken())return;
    Meet_Folken_ok.setinstanceFolken(true)
    gameState.setFreezePlayer(true)
    const petite_Folken = map.add([k.sprite("pnj_Folken_down_little"), k.pos(31, 400), k.z(0), k.lifespan(7),"pnj-Folken-petite"])
    k.wait(0, ()=> {
        k.tween(
            petite_Folken.pos,
            k.vec2(31, 414),
            2,
            (val) => petite_Folken.pos = val,
            )
    })
    k.wait(3, () => {
        petite_Folken.use(k.sprite("pnj_Folken_right_little"))
	    k.tween(
        petite_Folken.pos,
		k.vec2(410, 370),
		2,
		(val) => petite_Folken.pos = val,
        )
    })
    k.wait(5, () => {
        petite_Folken.use(k.sprite("pnj_Folken_up_little"))
	    k.tween(
        petite_Folken.pos,
		k.vec2(410, 360),
		2,
		(val) => petite_Folken.pos = val,
        )   
    })
    k.wait(7, () => {gameState.setFreezePlayer(false)})
}

// fonction de fin de jeu, apparition de dufour
export function fin(k ,Dufour){
    if(!Dufour_ok.getinstanceDufour() || DufourExist.getinstanceDufourCollide())return;
    gameState.setFreezePlayer(true)
    k.tween(
        Dufour.pos,                                              
        k.vec2(265, 370),
        2,
        (val) => Dufour.pos = val,
    )
    DufourExist.setinstanceDufourCollide(true)
    gameState.setFreezePlayer(false)

}