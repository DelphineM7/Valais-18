import { colorizeBackground } from "../utils.js";
import { music } from "../main.js";

export default async function menu(k){  
    colorizeBackground(k, 27,29,52);
    music.paused = false
    k.add([
        k.text("Le Carnet Mystérieux et le portrait inconnu", {
            size : 52, 
            font: "NiceFont"
        }),
        k.area(),
        k.anchor("center"),
        k.pos(k.center().x, k.center().y -100)
    ])

    
    k.add([
        k.text("Appuie sur E pour commencer à jouer", {
            size : 32, 
            font: "NiceFont"
        }),
        k.area(),
        k.anchor("center"),
        k.pos(k.center().x, k.center().y +100)
    ])

    k.onKeyPress("e", ()=>{
        k.go("intro_1")
    })

}