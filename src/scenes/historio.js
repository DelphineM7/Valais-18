import { colorizeBackground } from "../utils.js";

export default async function menu(k){  
    colorizeBackground(k, 27,29,52);
    Carnet(k)
}


const Assets_carnet = [
    ["page_Tableau_Derivaz" ],

]

function Carnet(k){
    const page_ouvert= k.play("book", {
        volume: 0.2,
    })
    let page = 0
    k.add([
        k.sprite("carnet_historio_1"),
        k.area(),
        k.anchor("center"),
        k.pos(k.center().x, k.center().y)
    ])
}

