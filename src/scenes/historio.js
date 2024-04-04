import { colorizeBackground } from "../utils.js";

let page = 1
const entities = {
    carnet : [],
}

export default async function menu(k){  
    colorizeBackground(k, 27,29,52);
    Carnet_Historio(k)
    TournerPage(k, entities.carnet)
}

const Assets_carnet = [
    [1,"carnet_p_1" ],
    [2,"carnet_p_2" ],
    [3,"carnet_p_3" ],
    [4,"carnet_p_4" ],
    [5,"carnet_p_5" ],
    [6,"carnet_p_6" ],
    [7,"carnet_p_7" ],
    [8,"carnet_p_8" ],
]

function Carnet_Historio(k){
    const page_ouvert= k.play("book", {
        volume: 0.2,
    })

    entities.carnet = 
        k.add([
        k.sprite("carnet_p_1"),
        k.area(),
        k.anchor("center"),
        k.pos(k.center().x, k.center().y)
    ])
}

function TournerPage(k, Carnetname){
    k.onKeyPress((key)=>{
        if (["left","a"].includes(key)){   
            page -= 1 
            if (page < 1) page = 1
            for (let i = 0; i < Assets_carnet.length; i++) {
                if (page == Assets_carnet[i][0]){
                    Carnetname.use(k.sprite( Assets_carnet[i][1]))
                }
                
            }
        }
        if(["right","d"].includes(key)){
            page += 1
            if (page > 8) page = 8
            for (let i = 1; i < Assets_carnet.length; i++) {
                if (page == Assets_carnet[i][0]){
                    Carnetname.use(k.sprite( Assets_carnet[i][1]))
                }
            }   
        }
    })
}