import { colorizeBackground, drawBoundaries, drawTiles, fetchMapData, Instruction,DestroyInstruction, ShowObject, DestroyShowObject,startInteractionPNJ,SetSprite } from "../utils.js";
import { setMoyenPlayerMovement, generateMoyenPlayerComponents } from "../entities/player.js";
import  dialogintrogameplay from "../content/pont_innerdialogue.js";
import { pnj_TorrentLines} from "../content/pnj_dialogues.js"
import { gameStatePont, HaveCarnet,SeenJournal,Beck_ok,Meet_Torrent_ok} from "../state/stateManagers.js";
import { dialog } from "../uiComponents/dialog.js";
import { generateCarnetComponents, Carnet,createProof, ToDoWithProof} from "../entities/carnet.js";

export default async function pont(k){
    colorizeBackground(k, 27,29,52 );
    const mapData = await fetchMapData("./assets/maps/pont.json");
    const map = k.add([k.pos(0,0)])

    const entities = {
        moyen_player : null,
        pnj_ane : [],
        carnet : [],
        pnj_Torrent : []
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
                    entities.pnj_ane = map.add([k.sprite("ane"), k.pos(object.x, object.y),k.body({isStatic : true}),k.area({shape: new k.Rect(k.vec2(0,0), 393, 255)}),"pnj-ane" ]);
                    continue; 
                }
                if (object.name === "journal"){
                    entities.pnj_ane = map.add([k.sprite("journal_petit"), k.pos(object.x, object.y)]);
                    continue; 
                }
                if (!gameStatePont.getfirstTimepont()){
                    if (object.name === "pnj-Torrent"){
                        entities.pnj_Torrent = map.add([k.sprite("pnj_Torrent_down"), k.pos(object.x, object.y),k.body({isStatic : true}),k.area({shape: new k.Rect(k.vec2(0,0), 75, 202)}),"pnj-Torrent" ]);
                        continue; 
                    }
                }
            }
            continue;
        }
        
        drawTiles(k, map, layer, mapData.tileheight,mapData.tilewidth, "pont");
        
    }

    setMoyenPlayerMovement(k, entities.moyen_player)
    let CollideJournal = false
    let CollideCarnet = false
    let CollideAne = false
    let CarnetOpen = false
    let CollidTorrent = false 

    k.onKeyPress("e",()=>{
        if(CollideJournal){
            ShowObject(k,"InstructionEJournal", "journal_grand", k.vec2(400,100), "journal_grand")
            Instruction(k,170,60,k.vec2(880, 150),"InstructionjournalExit","Appuie sur enter pour arrêter la lecture") 
            return;   
        }
        if(CollideCarnet){
            DestroyShowObject(k,"InstructionECarnet","carnet" )
            HaveCarnet.setInstanceCarnet(true)
            Instruction(k, 135,55, k.vec2(1115,25),"InstructionF","Appuie sur f pour ouvrir le carnet")
            k.wait(7, () => {
                k.destroyAll("InstructionF")
            })
            k.destroyAll(CollideCarnet)
            return;   
        }
        if(CollideAne){
            ShowObject(k,"InstructionEAne", "Dufour", k.vec2(416,32), "Bib_tableau_Dufour")
            Instruction(k, 170,60, k.vec2(950,280),"InstructionExitAne","Appuie sur enter pour arrêter l'observation")
            return;   
        }
        if(CollidTorrent){
            const DialogueTorrent = pnj_TorrentLines.french_Torrent;
            dialog(k, k.vec2(32,16), DialogueTorrent[0])
            Meet_Torrent_ok.setinstanceTorrent(true)

        }   
    })

    k.onKeyPress("enter",()=>{
        if (CollideJournal){
            SeenJournal.setInstanceJournal(true)
            DestroyShowObject(k,"InstructionjournalExit","journal_grand" )
            return;   
        } if(CollideAne){
            DestroyShowObject(k,"InstructionExitAne","Bib_tableau_Dufour" ) 
            if(gameStatePont.getfirstTimepont() && !HaveCarnet.getInstanceCarnet()){
                const carnet = k.add(generateCarnetComponents(k,k.vec2(1000, 645)));
            }
            return; 
        } if(CarnetOpen){
            DestroyShowObject(k,"InstructionExitCarnet","CarnetOPEN" ) 
            k.destroyAll("proof")
            k.destroyAll("proof_color")
            k.destroyAll("texte_proof")
            CarnetOpen = false
            return;   

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

    entities.moyen_player.onCollide("door-entrance", () =>{
        if(HaveCarnet.getInstanceCarnet()){
        gameStatePont.setfirstTimepont(false)
        k.go("world");
        }
    });

    entities.moyen_player.onCollide("pnj-ane", ()=>{
        CollideAne = true
        Instruction(k, 130,75, k.vec2(850,320),"InstructionEAne","Appuie sur e pour observer dans la charette")
    })

    entities.moyen_player.onCollideEnd("pnj-ane", ()=>{
        CollideAne = false
        DestroyInstruction(k,"InstructionEAne")
    })

    entities.moyen_player.onCollide("journal", () =>{
        CollideJournal = true
        Instruction(k, 135, 55 ,k.vec2(300, 350), "InstructionEJournal","Appuie sur e pour observer le journal")
    });

    entities.moyen_player.onCollideEnd("journal", () =>{
        CollideJournal = false
        DestroyInstruction(k,"InstructionEJournal")
    });


    entities.moyen_player.onCollide("carnet", ()=>{
        CollideCarnet = true
        Instruction(k, 145,55, k.vec2(830,628),"InstructionECarnet","Appuie sur e pour ramasser le carnet")
    })

    entities.moyen_player.onCollideEnd("carnet", ()=>{
        CollideCarnet = false
        DestroyInstruction(k,"InstructionECarnet")
    })

    entities.moyen_player.onCollide("pnj-Torrent", ()=>{
        CollidTorrent = true
        startInteractionPNJ(k, entities.pnj_Torrent, entities.moyen_player, "pnj_Torrent_right","pnj_Torrent_left","pnj_Torrent_down", "pnj_Torrent_up")
        Instruction(k, 150,55, k.vec2(200,328),"InstructionETorrent","Appuie sur e pour lui parler")
    })

    entities.moyen_player.onCollideEnd("pnj-Torrent", ()=>{
        CollidTorrent = false
        SetSprite(k,entities.pnj_Torrent,"pnj_Torrent_down")
        DestroyInstruction(k,"InstructionETorrent")
    })
}