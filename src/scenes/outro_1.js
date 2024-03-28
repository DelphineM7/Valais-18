import { colorizeBackground, fetchMapData } from "../utils.js";
import {OutroLines} from "../content/IntroOutro_dialogue.js"
import { music } from "../main.js";

export default async function outro_1(k){  
    colorizeBackground(k, 27,29,52);

    const map = k.add([k.pos(0,0)])
    const outro_1 = map.add([k.sprite("assets_intro_1"),k.pos(32,16),"intro_1"])

    async function displayLine(textContainer, line){ 
        for (const character of line){
            await new Promise((fini)=>{  
                setTimeout(() => {
                    textContainer.text += character
                    fini() 
                }, 10); 
            })
        }
    
    }
    
    async function dialog(k,pos, content){ // box de dialogue // 1216 = 76 frame * 16 px  224 = 14 frame * 16 px
    
        const dialogBox = k.add([k.rect(1216, 160), k.pos(pos), k.fixed(), k.outline(4),]) 
        const textContainer = dialogBox.add([
            k.text("", {
                font: "NiceFont",
                width : 1000,
                lineSpacing : 15,
                size : 34
            }), 
            k.color(0,0,0),
            k.pos(20,40), 
            k.fixed(),
        ]);
        const textContainerInstruction = dialogBox.add([
            k.text("Appuie sur Enter", {
                font: "NiceFont",
                width : 700,
                lineSpacing : 15,
                size : 34,
            }), 
            k.color(0,0,0),
            k.pos(1020,120), 
            k.opacity(0.7),
            k.fixed(),
        ]);
    
        let index = 0 
    
        await displayLine(textContainer,content[index]);
        let lineFinishedDisplay = true;
        const dialogKey = k.onKeyPress("enter", async() =>{
            if (!lineFinishedDisplay) return;
    
            index++
            if(!content[index]){
                k.destroy(dialogBox)
                dialogKey.cancel()
                const transitionBox = k.add([k.rect(1280, 720), k.pos(0,0), k.opacity(0), k.color(27,29,52)])
                transitionBox.onUpdate(()=>{
                    transitionBox.opacity += 0.4 * k.dt()
                    music.volume -= 0.01 * k.dt()
               })

                k.wait(3, () => {
                    music.stop()
                    k.go("outro_2")  
                })
            }
    
            textContainer.text ="";
            lineFinishedDisplay = false;
            await displayLine(textContainer, content[index]);
            lineFinishedDisplay = true
        })
    }

    const OutroContent = OutroLines.french_outro;
    await dialog(k, k.vec2(32,16), OutroContent[0])

}
