import { colorizeBackground } from "../utils.js";
import {OutroLines} from "../content/player_dialogues.js"
import { music } from "../main.js";
import {NeedLecture} from "../state/stateManagers.js"
import {Textes_Outro1} from "../content/Instruction_texte.js"

export default async function outro_1(k){  
    colorizeBackground(k, 27,29,52);

    const map = k.add([k.pos(0,0)])
    const outro_1 = map.add([k.sprite("assets_intro_1"),k.pos(32,16),"intro_1"])
    const Textes = Textes_Outro1.french_Outro1

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
        let sizeFont = 34
        let start = 1020
        if(NeedLecture.getLecture()){
            sizeFont = 30
            start = 950
        }
        const dialogBox = k.add([k.rect(1216, 160), k.pos(pos), k.fixed(), k.outline(4),]) 
        const textContainer = dialogBox.add([
            k.text("", {
                font: "NiceFont",
                width : 1000,
                lineSpacing : 15,
                size : sizeFont
            }), 
            k.color(0,0,0),
            k.pos(20,40), 
            k.fixed(),
        ]);
        const textContainerInstruction = dialogBox.add([
            k.text(Textes[0], {
                font: "NiceFont",
                width : 700,
                lineSpacing : 15,
                size : sizeFont,
            }), 
            k.color(0,0,0),
            k.pos(start,120), 
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
