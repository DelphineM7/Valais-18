import { generatePlayerComponents, setPlayerMovement } from "../entities/player.js";
import { generatepnj_marchandComponents, EventMarieAnneFolken} from "../entities/pnj_other.js";
import { colorizeBackground, drawBoundaries, drawTiles, fetchMapData, SetSprite, Instruction, DestroyShowObject,startInteractionPNJ, DestroyInstruction,} from "../utils.js";
import { Carnet,createProof, ToDoWithProof} from "../entities/carnet.js";
import { HaveCarnet,SeenJournal,Beck_ok,Meet_Pottier_ok,Meet_Bellet_ok} from "../state/stateManagers.js";
import { pnj_BelletLines, pnj_PottierLines}  from "../content/pnj_dialogues.js"
import { dialog } from "../uiComponents/dialog.js";

export default async function world(k){
    
    colorizeBackground(k, 27,29,52 );
    const mapData = await fetchMapData("./assets/maps/place.json")
    const map = k.add([k.pos(0,0)])
    const test = map.add([k.sprite("assets_place"),
    //k.body({isStatic : true}),
    //k.area({shape: new k.Rect(k.vec2(0,0), 98, 62)}),
    k.pos(32,16),
    //k.offscreen(),
    "test",])

    const entities = {
        player : null,
        pnj_marchand : [],
        pnj_pottier : [],
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
                if (object.name === "PNJ-Pottier"){
                    entities.pnj_pottier = map.add([k.sprite("pnj_Pottier_down"), k.pos(object.x, object.y),k.body({isStatic : true}),k.area({shape: new k.Rect(k.vec2(0,70), 34, 22)}),"pnj-Pottier" ]);
                    continue; 
                }
            }
            continue;
        }
        
        //drawTiles(k, map, layer, mapData.tileheight,mapData.tilewidth, "place" );
        //const test = k.add([k.sprite("assets_place"), k.pos(0,0)])
        //const carnet = k.add(generateCarnetComponents(k,k.vec2(1000, 645)));
    }

    // k.camScale(2) // permet de faire un zoom 
    //k.camPos(entities.player.worldPos()) // la camera suit le personnage, mais je pense que pour nous c'et pas utile car on a une vue générale de la scène 
    let OnCollideBellet = false
    let CarnetOpen = false
    let OnCollidePottier = false 

    setPlayerMovement(k, entities.player)
    k.onKeyPress("enter",()=>{
        if(CarnetOpen){
            DestroyShowObject(k,"InstructionExitCarnet","CarnetOPEN" ) 
            k.destroyAll("proof")
            k.destroyAll("proof_color")
            k.destroyAll("texte_proof")
 

        }
    })
    k.onKeyPress("e",()=>{
        if(OnCollideBellet){
            const DialogueBellet = pnj_BelletLines.french_Bellet;
            dialog(k, k.vec2(32,16), DialogueBellet[0])
            Meet_Bellet_ok.setinstanceBellet(true)
            EventMarieAnneFolken(k)            
        }
        if(OnCollidePottier){
            const DialoguePottier = pnj_PottierLines.french_pottier;
            dialog(k, k.vec2(32,16), DialoguePottier[0])
            Meet_Pottier_ok.setinstancePottier(true)
            EventMarieAnneFolken(k)
            
        }
    })

    k.onKeyPress("f", () => { //TODO interdire la possibilité de repropduire f quand carnet en cour
        if(HaveCarnet.getInstanceCarnet() && !CarnetOpen) {
            CarnetOpen = true
            entities.carnet = k.add([
                k.sprite("carnet_p_1"),
                k.pos(230,100),
                k.offscreen(),
                {
                    currentSprite : 'carnet_p_1',
                },
                "CarnetOPEN"
            ])
            Carnet(k)
            Instruction(k, 170,60, k.vec2(1050,200),"InstructionExitCarnet","Appuie sur enter pour fermer le carnet")
        }
    })
    // Index carnet
    k.onClick("Adrien_Felix",() =>{ console.log(k.get("CarnetOPEN")[0].currentSprite)})
    k.onClick("Alphonse_Beck",() => createProof(k,1, entities.carnet,Beck_ok.getinstanceBeck(), SeenJournal.getInstanceJournal(),k.vec2(390,250),120, 20,k.vec2(815,195),50 , 20, "proof1_Beck", "proof2_Beck"))
    k.onClick("Charles_Emmanuel",() =>{ console.log("ohhh")})
    k.onClick("Dufour_Michel",() =>{ console.log("uuuuuuuuuuu")})
    k.onClick("Emile_Vuilloud",() =>{ console.log("zzzzzzz")})
    k.onClick("Joseph_Torrent",() =>{ console.log("gggggg")})
    k.onClick("Louis_Robriquet",() =>{ console.log("hhhhhhhh")})
    k.onClick("Pierre_Guillot",() =>{ console.log("iiiiiii")})
    k.onClick("Pierre_DuFay",() =>{ console.log("lllllll")})
    k.onClick("Rey_Bellet",() =>{ console.log("mmmmmmmm")})

    // Proof
    k.onClick("proof1_Beck",() => ToDoWithProof(k,"proof1_Beck", "texte_proof"))
    k.onClick("proof2_Beck",() => ToDoWithProof(k,"proof2_Beck", "texte_proof"))

    entities.player.onCollide("door-entrance", () =>{
        k.go("house");

    })

    entities.player.onCollide("door-exit", () =>{
        k.go("pont");

    })

    entities.player.onCollide("pnj-marchand", () =>{
        OnCollideBellet = true
        startInteractionPNJ (k, entities.pnj_marchand, entities.player, "marchand-side-right","marchand-side-left","marchand-down", 'marchand-up')
        Instruction(k, 150,55, k.vec2(870,378),"InstructionEBellet","Appuie sur e pour lui parler")
    }); 

    entities.player.onCollideEnd("pnj-marchand", ()=> {
        OnCollideBellet = false
        SetSprite(k,entities.pnj_marchand,"marchand-idle-down")
        DestroyInstruction(k,"InstructionEBellet")

    });

    entities.player.onCollide("pnj-Pottier", () =>{
        OnCollidePottier= true
        startInteractionPNJ (k, entities.pnj_pottier, entities.player, "pnj_Pottier_right","pnj_Pottier_left","pnj_Pottier_down", "pnj_Pottier_up" )
        Instruction(k, 150,55, k.vec2(470,538),"InstructionEPottier","Appuie sur e pour lui parler")
    }); 

    entities.player.onCollideEnd("pnj-Pottier", ()=> {
        OnCollidePottier = false
        SetSprite(k,entities.pnj_pottier,"pnj_Pottier_down")
        DestroyInstruction(k,"InstructionEPottier")

    });
} 