import { colorizeBackground, drawBoundaries, drawTiles, fetchMapData} from "../utils.js";
import { setBigPlayerMovement, generateBigPlayerComponents } from "../entities/player.js";
import { generateTableauDeRivazComponents, StartInteractionTabl, EndInteractionTabl} from "../entities/tableau_deRivaz.js";

export default async function house(k){
    colorizeBackground(k, 27,29,52 );
    const mapData = await fetchMapData("./assets/maps/bureau.json");
    const map = k.add([k.pos(0,0)])

    const entities = {
        big_player : null,
        player : null,
        pnj : [],
        tableau : null,
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
                    entities.big_player = map.add(generateBigPlayerComponents(k,k.vec2(object.x, object.y)));
                    continue;
                }
                if (object.name === "tableau"){
                    entities.tableau = map.add(generateTableauDeRivazComponents(k,k.vec2(object.x, object.y)));
                    continue; 
                }
            }
            continue;
        }
        
        drawTiles(k, map, layer, mapData.tileheight,mapData.tilewidth, "bureau");
        
    }

    setBigPlayerMovement(k, entities.big_player)

   entities.big_player.onCollide("door-exit", () =>{
        k.go("world");
    });

    entities.big_player.onCollide("tableau_deRivaz", ()=>{
        StartInteractionTabl(k,k.vec2(484,328))
    })

    entities.big_player.onCollideEnd("tableau_deRivaz", ()=>{
        EndInteractionTabl(k)
    })
}