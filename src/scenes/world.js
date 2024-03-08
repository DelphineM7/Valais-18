import { generatePlayerComponents, setPlayerMovement } from "../entities/player.js";
import { generatepnj_marchandComponents, startInteraction } from "../entities/pnj-marchand.js";
import { colorizeBackground, drawBoundaries, drawTiles, fetchMapData, SetSprite } from "../utils.js";

export default async function world(k){
    
    colorizeBackground(k, 27,29,52 );
    const mapData = await fetchMapData("./assets/maps/place.json");

    const map = k.add([k.pos(0,0)])

    const entities = {
        player : null,
        pnj_marchand : [],
    }

    const layers = mapData.layers;
    for (const layer of layers){
        if(layer.name === "Bundaries"){
            drawBoundaries(k, map, layer);
            continue; // Permet d'éviter le else statement 
        }

        if (layer.name === "Spawn"){
            for (const object of layer.objects){
                if (object.name === "player"){
                    entities.player = map.add(generatePlayerComponents(k,k.vec2(object.x, object.y)));
                    continue;
                }
                if (object.name === "PNJ-marchand"){
                    entities.pnj_marchand = map.add(generatepnj_marchandComponents(k,k.vec2(object.x, object.y)));
                    continue; 
                }
            }
            continue;
        }
        
        drawTiles(k, map, layer, mapData.tileheight,mapData.tilewidth, "place" );
        
    }

    // k.camScale(2) // permet de faire un zoom 
    //k.camPos(entities.player.worldPos()) // la camera suit le personnage, mais je pense que pour nous c'et pas utile car on a une vue générale de la scène 

    setPlayerMovement(k, entities.player)

    entities.player.onCollide("door-entrance", () =>{
        k.go("house");

    })

    entities.player.onCollide("door-exit", () =>{
        k.go("pont");

    })

    entities.player.onCollide("pnj-marchand", () =>{
        startInteraction(k, entities.pnj_marchand,entities.player)
    }); 

    entities.player.onCollideEnd("pnj-marchand", ()=> {
        SetSprite(k,entities.pnj_marchand,"marchand-idle-down")

    });
}