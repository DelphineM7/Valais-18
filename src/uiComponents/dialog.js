import { gameState } from "../state/stateManagers.js";

async function displayLine(textContainer, line){
    for (const character of line){
        await new Promise((fini)=>{  
            setTimeout(() => {
                textContainer.text += character
                fini() // permet de signifier que promise a été effectuée, et le await peut continuer permet d'avoir un caractère après l'autre
            }, 10); // millisecondes
        })
    }

}

export async function dialog(k,pos, content){ // box de dialogue // 1216 = 76 frame * 16 px  224 = 14 frame * 16 px
    gameState.setFreezePlayer(true);

    const dialogBox = k.add([k.rect(1216, 160), k.pos(pos), k.fixed(), k.outline(4),]) //k.fixed permet que la box ne soit pas affecter par la camera. dans notre cas on a pas de camera donc ca serait pas utile 
    const textContainer = dialogBox.add([
        k.text("", {
            font: "NiceFont",
            width : 700,
            lineSpacing : 15,
            size : 34
        }), 
        k.color(27,29,52),
        k.pos(20,40), // par rappor à dialogbox
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
        k.pos(1020,120), // par rappor à dialogbo
        k.opacity(0.7),
        k.fixed(),
    ]);

    let index = 0 

    await displayLine(textContainer,content[index]);
    let lineFinishedDisplay = true;
    const dialogKey = k.onKeyPress("enter", async() =>{
        if (!lineFinishedDisplay) return;

        index++
        if(!content[index]){ //permet de controler quand l'index est super à la quantité dans content
            k.destroy(dialogBox)
            dialogKey.cancel()
            gameState.setFreezePlayer(false)
            return;
        }

        textContainer.text ="";
        lineFinishedDisplay = false;
        await displayLine(textContainer, content[index]);
        lineFinishedDisplay = true
    })
}