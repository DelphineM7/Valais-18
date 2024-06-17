import {NeedLecture, gameState} from "./state/stateManagers.js"

export function SetSprite(k,player,spriteName){
    if(player.currentSprite !== spriteName){
        player.use(k.sprite(spriteName))
        player.currentSprite = spriteName
    }
}


export function colorizeBackground(k, r,g,b){
    k.add([
        k.rect(k.canvas.width, k.canvas.height),
        k.color(r,g,b),
        k.fixed(), //ouge pas avec la camera
    ]);
}

export async function fetchMapData(mapPath){
    return await (await fetch(mapPath)).json(); // on utilise fetch pour attraper le json. await permettent d'assurer que le json soit fetch comme il faut
}

export function generateColliderBoxComponents(k, width, height, pos, tag){
    return [
        k.area({ shape : new k.Rect(k.vec2(0), width, height)}), k.pos(pos), k.body({isStatic : true}), k.offscreen(), tag,
    ];
}

export function drawBoundaries(k, map, layer){
    for( const object of layer.objects){
        map.add(generateColliderBoxComponents(k, object.width, object.height, k.vec2(object.x,object.y + 16), object.name))
    }
}

export async function Instruction(k, widthrec,heightrec, pos, id, content){
    let sizeFont = 20
    let adaptlecture = 0
    if(NeedLecture.getLecture()){sizeFont = 15, adaptlecture=20}
    const InstructionBox = k.add([k.rect(widthrec+adaptlecture, heightrec), k.pos(pos), k.outline(4), k.opacity(0.7),k.offscreen(),id]) 
    const textInstructionBox = InstructionBox.add([
        k.text(content, {
            font: "NiceFont",
            width : widthrec + adaptlecture -10 ,
            size :sizeFont,
            height : heightrec -10,
            lineSpacing : adaptlecture/4
        }), 
        k.color(27,29,52),
        k.pos(10,10), // par rappor à dialogbox  
        k.opacity(0.7)
    ]);
}

export function DestroyInstruction(k,id){
    k.destroyAll(id)
}

export function ShowObject(k,idInstructionE, nameSprite, pos, idObject){
    gameState.setFreezePlayer(true)
    k.destroyAll(idInstructionE)
    const objectShowed = k.add([k.sprite(nameSprite), k.pos(pos), k.offscreen(), idObject])
}

export function DestroyShowObject(k,idinstrEnter,idObject ){
    k.destroyAll(idObject)
    k.destroyAll(idinstrEnter)
    gameState.setFreezePlayer(false)
}

export function startInteractionPNJ (k, pnj, player, spriteright,spriteleft,spritedown, spriteup){
    if(player.direction === "left"){
        SetSprite(k,pnj,spriteright) 
        return
    }

    if(player.direction === "right"){
        SetSprite(k,pnj,spriteleft) 
        return
    }

    if(player.direction === "up"){
        SetSprite(k,pnj,spritedown) 
        return
    }
    if(player.direction === "down"){
        SetSprite(k,pnj,spriteup) 
        return
    }
}

export function ShowKey (k, sprite, anim, pos1, pos2, area1, area2, opacity,scale, id){
    const InstructionBox = k.add([k.sprite(sprite), k.pos(pos1,pos2),k.area({shape: new k.Rect(k.vec2(pos1,pos2), area1, area2)}), k.scale(scale), k.opacity(opacity),k.offscreen(),id,]) 
    InstructionBox.play(anim) 
}

export function ShowKeynoAnim (k, sprite, pos1, pos2, area1, area2, opacity,scale, id){
    const InstructionBox = k.add([k.sprite(sprite), k.pos(pos1,pos2),k.area({shape: new k.Rect(k.vec2(pos1,pos2), area1, area2)}), k.scale(scale), k.opacity(opacity),k.offscreen(),id]) 
}

export function PaiettesE (k){
    const InstructionPailette = k.add([k.sprite("etoile"), k.pos(1118,19), k.scale(0.2), k.opacity(1),k.offscreen(),"PailetteE",]) 
    InstructionPailette.play("etoile_anim") 
    const pailette = k.play("pailettes", {
        volume: 0.8,
    })
    k.wait(2, () => {k.destroy(InstructionPailette) })
}

