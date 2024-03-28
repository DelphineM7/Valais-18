import { colorizeBackground } from "../utils.js";

export default async function menu(k){  
    colorizeBackground(k, 27,29,52);

    k.add([
        k.text("Félicitation tu as fini le jeu !", {
            size : 52, 
            font: "NiceFont"
        }),
        k.area(),
        k.anchor("center"),
        k.pos(k.center().x, k.center().y -100)
    ])

    
    k.add([
        k.text("Appuie sur E pour découvrir les documents, les tableau et les photos qui ont inspiré le jeu!", {
            size : 32, 
            font: "NiceFont"
        }),
        k.area(),
        k.anchor("center"),
        k.pos(k.center().x, k.center().y +100)
    ])

    k.onKeyPress("e", ()=>{
        k.go("historio")
    })

}