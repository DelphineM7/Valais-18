import { Instruction, DestroyInstruction, DestroyShowObject, colorizeBackground, drawBoundaries, drawTiles, fetchMapData, ShowObject, startInteractionPNJ, SetSprite} from "../utils.js";
import { setBigPlayerMovement, generateBigPlayerComponents } from "../entities/player.js";
import { HaveCarnet,SeenJournal,Beck_ok,Meet_Folken_ok} from "../state/stateManagers.js";
import { Carnet,createProof, ToDoWithProof} from "../entities/carnet.js";
import { pnj_FolkenLines} from "../content/pnj_dialogues.js"
import { dialog } from "../uiComponents/dialog.js";

export default async function house(k){
    colorizeBackground(k, 27,29,52 );
    const mapData = await fetchMapData("./assets/maps/bureau.json");
    const map = k.add([k.pos(0,0)])

    const entities = {
        big_player : null,
        player : null,
        pnj : [],
        tableau : null,
        pnj_Folken: null
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
                    entities.tableau = map.add([k.area({shape: new k.Rect(k.vec2(object.x, object.y), 131, 95)}),"tableau_deRivaz"]);
                    continue; 
                }
                if(Meet_Folken_ok.getinstanceFolken()){
                    if (object.name === "pnj_Folken"){
                        entities.pnj_Folken = map.add([k.sprite("pnj_Folken_down"), k.pos(object.x, object.y),k.body({isStatic : true}),k.area({shape: new k.Rect(k.vec2(0,310), 140, 110)}),"pnj-Folken" ]);
                        continue; 
                    }
                }
            }
            continue;
        }
        
        drawTiles(k, map, layer, mapData.tileheight,mapData.tilewidth, "bureau");
        
    }

    let onCollideTableau = false
    let onCollidePapier = false
    let CollidFolken = false

    setBigPlayerMovement(k, entities.big_player)
    let CarnetOpen = false
    k.onKeyPress("enter",()=>{
        if(CarnetOpen){
            DestroyShowObject(k,"InstructionExitCarnet","CarnetOPEN" ) 
            k.destroyAll("proof")
            k.destroyAll("proof_color")
            k.destroyAll("texte_proof")
        }
        if (onCollideTableau){  
            DestroyShowObject(k,"InstructionExit","Bib_tableau_deRivaz" )       
        }
        if (onCollidePapier){  
            DestroyShowObject(k,"InstructionExit","Papier_1_id" )       
        }
    })
    k.onKeyPress("e", () =>{
        if (onCollideTableau){  
            Instruction(k,170,60,k.vec2(950,200),"InstructionExit","Appuie sur enter pour arrêter l'observation" )
            ShowObject(k,"InstructionE", "Big_tabl_Rivaz", k.vec2(416,40), "Bib_tableau_deRivaz")       
        }
        if (onCollidePapier){
            Instruction(k,170,60,k.vec2(1000,200),"InstructionExit","Appuie sur enter pour arrêter la lecture" )
            ShowObject(k,"InstructionE", "Papier_1", k.vec2(400,25), "Papier_1_id")   
        }
        if(CollidFolken){
            const DialogueFolken = pnj_FolkenLines.french_Folken;
            dialog(k, k.vec2(32,16), DialogueFolken[0])
        }  
    });
    k.onKeyPress("f", () => { //TODO interdire la possibilité de repropduire f quand carnet en cour
        if(HaveCarnet.getInstanceCarnet()) {
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


   entities.big_player.onCollide("door-exit", () =>{
        k.go("world");
    });

    entities.big_player.onCollide("tableau_deRivaz", ()=>{
        onCollideTableau = true
        Instruction(k,145,55,k.vec2(484,328),"InstructionE","Appuie sur e pour observer le tableau" )
    })

    entities.big_player.onCollideEnd("tableau_deRivaz", ()=>{
        onCollideTableau = false
        DestroyInstruction(k,"InstructionE")
    })

    entities.big_player.onCollide("papier_1", ()=>{
        onCollidePapier = true
        Instruction(k,160,55,k.vec2(734,258),"InstructionE","Appuie sur e pour lire les documents" )
    })

    entities.big_player.onCollideEnd("papier_1", ()=>{
        onCollidePapier = false
        DestroyInstruction(k,"InstructionE")
    })

    entities.big_player.onCollide("pnj-Folken", ()=>{
        CollidFolken = true
        startInteractionPNJ(k, entities.pnj_Folken, entities.big_player, "pnj_Folken_right","pnj_Folken_left","pnj_Folken_down", "pnj_Folken_up")
        Instruction(k, 150,55, k.vec2(1050,218),"InstructionEFolken","Appuie sur e pour lui parler")
    })

    entities.big_player.onCollideEnd("pnj-Folken", ()=>{
        CollidFolken = false
        SetSprite(k,entities.pnj_Folken,"pnj_Folken_down")
        DestroyInstruction(k,"InstructionEFolken")
    })
}