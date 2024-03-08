import {DoCollide} from "./state/stateManagers.js"

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

export function drawTiles(k, map, layer, tileheight, tilewidth, where) {
    let nbOfDrawnTiles = 0;
    const tilePos = k.vec2(0,0);
    for (const tile of layer.data){
        if (nbOfDrawnTiles % layer.width === 0){
            tilePos.x = 0;
            tilePos.y += tileheight;
        } else {
            tilePos.x += tilewidth;
        }

        nbOfDrawnTiles++;
        if(tile === 0) continue;

        if( where === "place") {
            map.add([
                k.sprite('assets_place', {frame : tile-1}),
                k.pos(tilePos),
                k.offscreen(), // c'est pour aider à faire tourner le jeu 
            ])
            continue;    
        }
        if( where === "bureau") {
            map.add([
                k.sprite('assets_bureau', {frame : tile-1}),
                k.pos(tilePos),
                k.offscreen(), 
            ])
            continue;

        }
        if( where === "pont") {
            map.add([
                k.sprite('assets_pont', {frame : tile-1}),
                k.pos(tilePos),
                k.offscreen(), 
            ])
            continue;
        }
        if( where === "intro_1") {
            map.add([
                k.sprite('assets_intro_1', {frame : tile-1}),
                k.pos(tilePos),
                k.offscreen(), 
            ])
            continue; 

        }
        if( where === "intro_2") {
            map.add([
                k.sprite('assets_intro_2', {frame : tile-1}),
                k.pos(tilePos),
                k.offscreen(), 
            ])
            continue; 

        }
    }
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

export function Instruction(k, widthrec,heightrec, pos, id, content,functionInstru){
    const InstructionBox = k.add([k.rect(widthrec, heightrec), k.pos(pos), k.outline(4), k.opacity(0.7),k.offscreen(),id]) 
    const textInstructionBox = InstructionBox.add([
        k.text(content, {
            font: "NiceFont",
            width : 150,
            size : 20
        }), 
        k.color(27,29,52),
        k.pos(10,10), // par rappor à dialogbox  
        k.opacity(0.7)
    ]);

    if(DoCollide.getInstanceCollide){
        k.onKeyPress("e", () =>{ 
            functionInstru(k)       
        });
    }
}