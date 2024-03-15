import { colorizeBackground, fetchMapData } from "../utils.js";
import { generateAigu1Components,generateAigu2Components, rotateAigu} from "../entities/horloge_sceneIntro2.js";

export default async function intro_2(k){  
    colorizeBackground(k, 27,29,52);
    const mapData = await fetchMapData("./assets/maps/intro_2.json");

    const map = k.add([k.pos(0,0)])
    const intro_2 = map.add([k.sprite("assets_intro_2"),k.pos(415,13),"intro_2"])

    const entities = {
        aigu1 : null,
        aigu2 : null
    }

    const layers = mapData.layers;
    for (const layer of layers){
        if (layer.name === "Spawn"){
            for (const object of layer.objects){
                if (object.name === "aigu1"){
                    entities.aigu1 = map.add(generateAigu1Components(k,k.vec2(object.x, object.y)));
                    continue;
                }
                if (object.name === "aigu2"){
                    entities.aigu2 = map.add(generateAigu2Components(k,k.vec2(object.x, object.y)));
                    continue;
                }
            }
            continue;
        }
        
    }

    rotateAigu(k,entities.aigu1,-300)
    rotateAigu(k,entities.aigu2,-1000) // *12 pour les minutes

    const transitionBox = k.add([k.rect(1280, 720), k.pos(0,0), k.opacity(1), k.color(27,29,52)])
    const transitionBox2 = k.add([k.rect(1280, 720), k.pos(0,0), k.opacity(0), k.color(27,29,52)]) // Je n'arrive pas à stoper le onUpdate pour faire avec un seul rect
    k.wait(1, () => {
            transitionBox.onUpdate(()=>{
                transitionBox.opacity -= 0.4 * k.dt()
            })
    })

    k.wait(4, () => {
        transitionBox2.onUpdate(()=>{
            transitionBox2.opacity += 0.4 * k.dt()
        })
    })
    
    k.wait(7, () => {
        k.go("pont")  
    })

}