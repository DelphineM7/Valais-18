import { colorizeBackground, drawBoundaries, fetchMapData,Instruction, DestroyInstruction, ShowObject, DestroyShowObject, startInteractionPNJ, SetSprite} from "../utils.js";
import { generateBigMediumPlayerComponents, setBigMediumPlayerMovement } from "../entities/player.js";
import { NeedLecture, gameState, HaveCarnet,SeenJournal,Beck_ok,Meet_Torrent_ok, Torrent_ok, Pottier_ok, Meet_Pottier_ok, Meet_Rivaz_ok, Rivaz_ok, Dufour_ok, Meet_Dufour_ok, Vuilloud_ok, Robriquet_ok, Meet_Robriquet_ok, Guillot_ok, Meet_Guillot_ok, DuFay_ok, Meet_DuFay_ok, Bellet_ok, Meet_Bellet_ok} from "../state/stateManagers.js";
import { Carnet, setTournerPage, createProof,ToDoWithProof, Souligner, RectoVersoLecture, checkfin} from "../entities/carnet.js";
import { pnj_PottierLines} from "../content/pnj_dialogues.js"
import { dialog } from "../uiComponents/dialog.js";
import { Beck_proof2_y, Beck_proof1_width, Beck_proof2_x,Vuilloud_proof2_y,Vuilloud_proof2_x, Dufay_proof_y, Dufay_proof_x, Robriquet_x, Robriquet_y, Robriquet_width, Robriquet_height, Guillot_x} from "./menu.js";
import { Textes_Salon} from "../content/Instruction_texte.js"

export default async function salon(k){
    
    colorizeBackground(k, 27,29,52 );
    const mapData = await fetchMapData("./assets/maps/salon.json")
    const map = k.add([k.pos(0,0)])
    const place = map.add([k.sprite("assets_salon"),k.pos(32,16),"salon"])
    const Textes = Textes_Salon.french_Salon

    const entities = {
        big_player : null,
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
                    entities.big_player = map.add(generateBigMediumPlayerComponents(k,k.vec2(object.x, object.y)));
                    continue;
                }
                if (object.name === "pnj-Pottier"){
                    entities.pnj_pottier = map.add([k.sprite("pnj_Pottier_down"), k.pos(object.x, object.y),k.body({isStatic : true}),k.area({shape: new k.Rect(k.vec2(0,170), 80, 70)}),"pnj-Pottier" ]);
                    continue; 
                }
                if (object.name === "papier_2"){
                    entities.tableau = map.add([k.area({shape: new k.Rect(k.vec2(object.x, object.y), 150, 150)}),"papier_2"]);
                    continue; 
                }
            }
            
            continue;
        }

    }

    let onCollidePapier = false
    let OnCollidePottier = false 
    let LecturePapers_1 = false
    let LecturePapers_2 = false
    let ReadingPapers = false
    let CollidDoorExit = false 
    let Sprite_Carnet = "carnet_Index"
    let papier_1 = "Papier_2_1"
    let papier_2 = "Papier_2_2"
    let adaptlectureJ = 0
    if(NeedLecture.getLecture()){
        Sprite_Carnet = "Lecture_carnet_Index"
        papier_1 = "Papier_2_1_Lecture"
        papier_2 = "Papier_2_2_Lecture"
        adaptlectureJ = 20
    }
    Instruction(k, 135,55, k.vec2(1115-adaptlectureJ,25),"InstructionF",Textes[0]);

    const inside = k.play("inside", {
        volume: 0.02,
        loop: true
    })

    setBigMediumPlayerMovement(k, entities.big_player)
    let CarnetOpen = false
    k.onKeyPress("enter",()=>{
        if(CarnetOpen){
            DestroyShowObject(k,"InstructionExitCarnet","CarnetOPEN" ) 
            k.destroyAll("proof")
            k.destroyAll("entree")
            k.destroyAll("proof_color")
            k.destroyAll("texte_proof")
            k.destroyAll("cross")
            k.destroyAll("ligne")
            k.destroyAll("InstructionCarnet")
            k.destroyAll("InstructionVerso")
            k.destroyAll("InstructionRecto")
            k.destroyAll("Verso_Guillot_id")
            k.destroyAll("Verso_Dufay_id")
            entities.carnet.currentSprite = Sprite_Carnet
            CarnetOpen = false
            const page_ferme= k.play("book", {
                volume: 0.2,
            })
            checkfin ()
            return;  
        }
        if (onCollidePapier){  
            ReadingPapers = false
            if(LecturePapers_1){
                DestroyShowObject(k,"InstructionExit","Papier_1_id" ) 
                k.destroyAll("InstructionFleche")
                LecturePapers_1 = false
                const page_ferme= k.play("book", {
                    volume: 0.2,
                })
            return
            }
            if(LecturePapers_2){
                DestroyShowObject(k,"InstructionExit","Papier_2_id" ) 
                k.destroyAll("InstructionFleche")
                LecturePapers_2 = false
                const page_ferme= k.play("book", {
                    volume: 0.2,
                })
            return;  
            } 
                 
        }

    })
    k.onKeyPress("e", async() =>{
        if (onCollidePapier && !CarnetOpen && !ReadingPapers){
            LecturePapers_1 = true
            ReadingPapers = true
            Instruction(k,170,60,k.vec2(1000,225),"InstructionExit",Textes[4])
            Instruction(k,170,80,k.vec2(1000,425),"InstructionFleche",Textes[5] )
            ShowObject(k,"InstructionE", papier_1, k.vec2(330,25), "Papier_1_id") 
            Meet_Guillot_ok.setinstanceGuillot(true)  
            const page_ferme= k.play("book", {
                volume: 0.2,
            })
            return;  
        }
        if(OnCollidePottier  && !CarnetOpen){
            const DialoguePottier = pnj_PottierLines.french_pottier;
            await dialog(k, k.vec2(32,16), DialoguePottier[0])
            Meet_Pottier_ok.setinstancePottier(true)
            
        }
        if(CollidDoorExit && !CarnetOpen){
            inside.stop()
            k.go("world");
            return
        }
        if(CarnetOpen){
            RectoVersoLecture(k)
        }
        
 
    });
    k.onKeyPress("c", () => { 
        if(HaveCarnet.getInstanceCarnet()&& !CarnetOpen && !gameState.getFreezePlayer()) {
            CarnetOpen = true
            entities.carnet = k.add([
                k.sprite(Sprite_Carnet), 
                k.pos(230,100),
                k.area({shape: new k.Rect(k.vec2(0,0), 816, 533)}),
                k.offscreen(),
                {
                    currentSprite : Sprite_Carnet,
                },
                "CarnetOPEN"
            ])
            Carnet(k)
            Instruction(k, 170,60, k.vec2(1050,200),"InstructionExitCarnet",Textes[1])
            Instruction(k, 170,260, k.vec2(1050,300),"InstructionCarnet", Textes[2])
            return;  
        }
    })
    k.onKeyPress((key) => {if(["right","d"].includes(key)){
        if(LecturePapers_1){
        k.destroyAll("Papier_1_id")
        LecturePapers_1 = false
        LecturePapers_2 = true
        ShowObject(k,"InstructionE", papier_2, k.vec2(330,25), "Papier_2_id")  
        }
    }})
    k.onKeyPress((key) => {if(["left","a"].includes(key)){
        if(LecturePapers_2){
        k.destroyAll("Papier_2_id")
        LecturePapers_1 = true
        LecturePapers_2 = false
        ShowObject(k,"InstructionE", papier_1, k.vec2(330,25), "Papier_1_id")  
        }
    }})
        // Index carnet
        k.onKeyPress((key) => {if(CarnetOpen)setTournerPage(k, key, entities.carnet)})
        k.onClick("Adrien_Felix",() =>     createProof(k,1, entities.carnet, Pottier_ok.getinstancePottier(), Meet_Pottier_ok.getinstancePottier(),k.vec2(305,445),285, 25,k.vec2(305,470),285, 50, "proof1_Pottier", "proof2_Pottier"))
        k.onClick("Alphonse_Beck",() =>    createProof(k,2, entities.carnet, Beck_ok.getinstanceBeck(), SeenJournal.getInstanceJournal(),k.vec2(390,250),Beck_proof1_width, 20,k.vec2(Beck_proof2_x,Beck_proof2_y),50 , 20, "proof1_Beck", "proof2_Beck"))
        k.onClick("Charles_Emmanuel",() => createProof(k,3, entities.carnet, Rivaz_ok.getinstanceRivaz(), Meet_Rivaz_ok.getinstanceRivaz(),k.vec2(410,155),185, 255,k.vec2(295,320),195 , 245, "proof1_Rivaz", "proof2_Rivaz"))
        k.onClick("Dufour_Michel",() =>    createProof(k,4, entities.carnet, Dufour_ok.getinstanceDufour(), Meet_Dufour_ok.getinstanceDufour(),k.vec2(390,250),120, 20,k.vec2(815,195),50 , 20, "proof1_Dufour", "proof2_Dufour"))
        k.onClick("Emile_Vuilloud",() =>   createProof(k,5, entities.carnet, Vuilloud_ok.getinstanceVuilloud(), SeenJournal.getInstanceJournal(),k.vec2(400,260),Beck_proof1_width, 20,k.vec2(Vuilloud_proof2_x, Vuilloud_proof2_y),50 , 20, "proof1_Vuilloud", "proof2_Vuilloud"))
        k.onClick("Joseph_Torrent",() =>   createProof(k,6, entities.carnet, Torrent_ok.getinstanceTorrent(), Meet_Torrent_ok.getinstanceTorrent(),k.vec2(460,410),120, 30,k.vec2(305,435),225 , 55, "proof1_Torrent", "proof2_Torrent"))
        k.onClick("Louis_Robriquet",() =>  createProof(k,7, entities.carnet, Robriquet_ok.getinstanceRobriquet(), Meet_Robriquet_ok.getinstanceRobriquet(),k.vec2(300,270),270, 80,k.vec2(Robriquet_x,Robriquet_y),Robriquet_width , Robriquet_height, "proof1_Robriquet", "proof2_Robriquet"))
        k.onClick("Pierre_Guillot",() =>   createProof(k,8, entities.carnet, Guillot_ok.getinstanceGuillot(), Meet_Guillot_ok.getinstanceGuillot(),k.vec2(320,185),260, 80,k.vec2(Guillot_x,425),135 , 20, "proof1_Guillot", "proof2_Guillot"))
        k.onClick("Pierre_DuFay",() =>     createProof(k,9, entities.carnet, DuFay_ok.getinstanceDuFay(), Meet_DuFay_ok.getinstanceDuFay(),k.vec2(Dufay_proof_x,Dufay_proof_y),290, 20,k.vec2(Dufay_proof_x,Dufay_proof_y +20),290 , 20, "proof1_DuFay", "proof2_DuFay"))
        k.onClick("Rey_Bellet",() =>       createProof(k,10, entities.carnet, Bellet_ok.getinstanceBellet(), Meet_Bellet_ok.getinstanceBellet(),k.vec2(300,305),220, 20,k.vec2(300,325),200 , 25, "proof1_Bellet", "proof2_Bellet"))
    
        // Proof
        k.onClick("proof1_Beck",() => ToDoWithProof(k,"proof1_Beck", "texte_proof"))
        k.onClick("proof2_Beck",() => ToDoWithProof(k,"proof2_Beck", "texte_proof"))
        k.onClick("proof1_Vuilloud",() => ToDoWithProof(k,"proof1_Vuilloud", "texte_proof"))
        k.onClick("proof2_Vuilloud",() => ToDoWithProof(k,"proof2_Vuilloud", "texte_proof"))
        k.onClick("proof1_Torrent",() => ToDoWithProof(k,"proof1_Torrent", "texte_proof"))
        k.onClick("proof2_Torrent",() => ToDoWithProof(k,"proof2_Torrent", "texte_proof"))
        k.onClick("proof1_Rivaz",() => ToDoWithProof(k,"proof1_Rivaz", "texte_proof"))
        k.onClick("proof2_Rivaz",() => ToDoWithProof(k,"proof2_Rivaz", "texte_proof"))
        k.onClick("proof1_Guillot",() => ToDoWithProof(k,"proof1_Guillot", "texte_proof"))
        k.onClick("proof2_Guillot",() => ToDoWithProof(k,"proof2_Guillot", "texte_proof"))
        k.onClick("proof1_Guillot",() => ToDoWithProof(k,"proof1_Guillot", "texte_proof"))
        k.onClick("proof2_Guillot",() => ToDoWithProof(k,"proof2_Guillot", "texte_proof"))
        k.onClick("proof1_DuFay",() => ToDoWithProof(k,"proof1_DuFay", "texte_proof"))
        k.onClick("proof2_DuFay",() => ToDoWithProof(k,"proof2_DuFay", "texte_proof"))
        k.onClick("proof1_Pottier",() => ToDoWithProof(k,"proof1_Pottier", "texte_proof"))
        k.onClick("proof2_Pottier",() => ToDoWithProof(k,"proof2_Pottier", "texte_proof"))
        k.onClick("proof1_Bellet",() => ToDoWithProof(k,"proof1_Bellet", "texte_proof"))
        k.onClick("proof2_Bellet",() => ToDoWithProof(k,"proof2_Bellet", "texte_proof"))
        k.onClick("proof1_Robriquet",() => ToDoWithProof(k,"proof1_Robriquet", "texte_proof"))
        k.onClick("proof2_Robriquet",() => ToDoWithProof(k,"proof2_Robriquet", "texte_proof"))

        // surligner les noms 
        k.onHover("Adrien_Felix",() => Souligner(k,"Adrien_Felix")) 
        k.onHoverEnd("Adrien_Felix",() => k.destroyAll("ligne")) 
        k.onHover("Alphonse_Beck",() => Souligner(k,"Alphonse_Beck"))
        k.onHoverEnd("Alphonse_Beck",() => k.destroyAll("ligne")) 
        k.onHover("Charles_Emmanuel",() =>Souligner(k,"Charles_Emmanuel"))
        k.onHoverEnd("Charles_Emmanuel",() => k.destroyAll("ligne")) 
        k.onHover("Dufour_Michel",() =>Souligner(k,"Dufour_Michel"))
        k.onHoverEnd("Dufour_Michel",() => k.destroyAll("ligne")) 
        k.onHover("Emile_Vuilloud",() =>Souligner(k,"Emile_Vuilloud"))
        k.onHoverEnd("Emile_Vuilloud",() => k.destroyAll("ligne")) 
        k.onHover("Joseph_Torrent",() =>Souligner(k,"Joseph_Torrent"))
        k.onHoverEnd("Joseph_Torrent",() => k.destroyAll("ligne")) 
        k.onHover("Louis_Robriquet",() =>Souligner(k,"Louis_Robriquet"))
        k.onHoverEnd("Louis_Robriquet",() => k.destroyAll("ligne")) 
        k.onHover("Pierre_Guillot",() =>Souligner(k,"Pierre_Guillot"))
        k.onHoverEnd("Pierre_Guillot",() => k.destroyAll("ligne")) 
        k.onHover("Pierre_DuFay",() =>Souligner(k,"Pierre_DuFay"))
        k.onHoverEnd("Pierre_DuFay",() => k.destroyAll("ligne")) 
        k.onHover("Rey_Bellet",() =>Souligner(k,"Rey_Bellet"))
        k.onHoverEnd("Rey_Bellet",() => k.destroyAll("ligne")) 

    entities.big_player.onCollide("door-exit", () =>{
        CollidDoorExit = true
        Instruction(k, 160,60, k.vec2(170,620),"InstructionEExit",Textes[6])
    });

    entities.big_player.onCollideEnd("door-exit", () =>{
        CollidDoorExit = false
        DestroyInstruction(k,"InstructionEExit")
    });


    entities.big_player.onCollide("papier_2", ()=>{
        onCollidePapier = true
        Instruction(k,140,55,k.vec2(950,300),"InstructionE",Textes[7] )
    })

    entities.big_player.onCollideEnd("papier_2", ()=>{
        onCollidePapier = false
        DestroyInstruction(k,"InstructionE")
        
    })

    entities.big_player.onCollide("pnj-Pottier", () =>{
        OnCollidePottier= true
        startInteractionPNJ (k, entities.pnj_pottier, entities.big_player, "pnj_Pottier_right","pnj_Pottier_left","pnj_Pottier_down", "pnj_Pottier_up" )
        Instruction(k, 150,55, k.vec2(410,220),"InstructionEPottier",Textes[3])
    }); 

    entities.big_player.onCollideEnd("pnj-Pottier", ()=> {
        OnCollidePottier = false
        SetSprite(k,entities.pnj_pottier,"pnj_Pottier_down")
        DestroyInstruction(k,"InstructionEPottier")
    });
}    