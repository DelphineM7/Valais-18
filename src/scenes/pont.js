import { colorizeBackground, drawBoundaries, drawTiles, fetchMapData, Instruction} from "../utils.js";
import { setMoyenPlayerMovement, generateMoyenPlayerComponents } from "../entities/player.js";
import { generatepnj_aneComponents,startInteractionAne, EndInteractionTabl} from "../entities/ane.js";
import  dialogintrogameplay from "../content/pont_innerdialogue.js";
import { gameStatePont, HaveCarnet, DoCollide} from "../state/stateManagers.js";
import { dialog } from "../uiComponents/dialog.js";
import { interactionCarnet, endInteractionCarnet, OnkeyF} from "../entities/carnet.js";
import { instructionJournalEnd, Showjournal} from "../entities/journal.js";

export default async function pont(k){
    colorizeBackground(k, 27,29,52 );
    const mapData = await fetchMapData("./assets/maps/pont.json");
    const map = k.add([k.pos(0,0)])

    const entities = {
        moyen_player : null,
        pnj_ane : []
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
                    entities.moyen_player = map.add(generateMoyenPlayerComponents(k,k.vec2(object.x, object.y)));
                    continue;
                }
                if (object.name === "ane"){
                    entities.pnj_ane = map.add(generatepnj_aneComponents(k,k.vec2(object.x, object.y)));
                    continue; 
                }
                if (object.name === "journal"){
                    entities.pnj_ane = map.add([k.sprite("journal_petit"), k.pos(object.x, object.y)]);
                    continue; 
                }
            }
            continue;
        }
        
        drawTiles(k, map, layer, mapData.tileheight,mapData.tilewidth, "pont");
        
    }

    setMoyenPlayerMovement(k, entities.moyen_player)

    if (gameStatePont.getfirstTimepont()) {
        const responses = dialogintrogameplay.french;
        dialog(k, k.vec2(32,16), responses[0])
        const transitionBox = k.add([k.rect(1280, 720), k.pos(0,0), k.opacity(1), k.color(27,29,52), "transitionBox"]) 
        k.wait(1, () => {
            transitionBox.onUpdate(()=>{
                transitionBox.opacity -= 0.4 * k.dt()
            })
        })
        k.wait(4, ()=> {
            k.destroyAll("transitionBox")
        })
        
    } 

    entities.moyen_player.onCollide("pnj-ane", ()=>{
        startInteractionAne(k,k.vec2(870,328))
    })

    entities.moyen_player.onCollideEnd("pnj-ane", ()=>{
        EndInteractionTabl (k)
    })

   entities.moyen_player.onCollide("door-entrance", () =>{
        if(HaveCarnet.getInstanceCarnet()){
        gameStatePont.setfirstTimepont(false)
        k.go("world");
        }
    });

    entities.moyen_player.onCollide("journal", () =>{
        DoCollide.setInstanceCollide(true)
        Instruction(k, 135, 55 ,k.vec2(300, 350), "InstructionJournal","Appuie sur e pour observer le journal", Showjournal)
    });

    entities.moyen_player.onCollideEnd("journal", () =>{
        DoCollide.setInstanceCollide(false)
        instructionJournalEnd(k)
        //SeenJournal.setInstanceJournal(true)

    });


    entities.moyen_player.onCollide("carnet", ()=>{
        interactionCarnet(k,k.vec2(870,628))
    })

    entities.moyen_player.onCollideEnd("carnet", ()=>{
        endInteractionCarnet(k)
        
    })
    k.onKeyPress("f", () => {
        OnkeyF(k)
    })
}