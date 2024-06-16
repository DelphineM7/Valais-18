import { Instruction, DestroyInstruction, DestroyShowObject, colorizeBackground, drawBoundaries, fetchMapData, ShowObject, startInteractionPNJ, SetSprite, ShowKey, PaiettesE} from "../utils.js";
import { setBigPlayerMovement, generateBigPlayerComponents } from "../entities/player.js";
import { NeedLecture, gameState, Meet_Folken_ok, HaveCarnet,SeenJournal,Beck_ok,Meet_Torrent_ok, Torrent_ok, Pottier_ok, Meet_Pottier_ok, Meet_Rivaz_ok, Rivaz_ok, Dufour_ok, Meet_Dufour_ok, Vuilloud_ok, Robriquet_ok, Meet_Robriquet_ok, Guillot_ok, Meet_Guillot_ok, DuFay_ok, Meet_DuFay_ok, Bellet_ok, Meet_Bellet_ok} from "../state/stateManagers.js";
import { Carnet, setTournerPage, createProof,ToDoWithProof, Souligner, RectoVersoLecture, checkfin} from "../entities/carnet.js";
import { pnj_FolkenLines} from "../content/pnj_dialogues.js"
import { dialog } from "../uiComponents/dialog.js";
import { Beck_proof2_y, Beck_proof1_width, Beck_proof2_x, Vuilloud_proof2_y, Vuilloud_proof2_x, Dufay_proof_y, Dufay_proof_x, Robriquet_x, Robriquet_y, Robriquet_width, Robriquet_height, Guillot_x} from "./menu.js";
import {Textes_Bureau} from "../content/Instruction_texte.js"

export default async function house(k){
    colorizeBackground(k, 27,29,52 );
    const mapData = await fetchMapData("./assets/maps/bureau.json");
    const map = k.add([k.pos(0,0)])
    const bureau = map.add([k.sprite("assets_bureau"),k.pos(32,16),"bureau"])
    const Textes = Textes_Bureau.french_Bureau

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
                if (object.name === "papier_1"){
                    entities.tableau = map.add([k.area({shape: new k.Rect(k.vec2(object.x, object.y), 131, 95)}),"papier_1"]);
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
    }

    let onCollideTableau = false
    let ReadingTableau = false
    let onCollidePapier = false
    let CollidFolken = false
    let LecturePapers_1 = false
    let LecturePapers_2 = false
    let ReadingPapers = false
    let CollidDoorExit = false 
    let Sprite_Carnet = "carnet_Index"
    let Papier_1 = "Papier_1_1"
    let Papier_2 = "Papier_1_2"
    let PortraiDerivaz = "Big_tabl_Rivaz"
    let adaptlectureJ =0
    if(NeedLecture.getLecture()){
        Sprite_Carnet = "Lecture_carnet_Index"
        Papier_1 = "Papier_1_1_Lecture"
        Papier_2 = "Papier_1_2_Lecture"
        PortraiDerivaz = "Big_tabl_Rivaz_Lecture"
        adaptlectureJ = 20
    }
    ShowKey (k, "c",  "c-down", 1150, 55, 289, 359, 1, 0.2,"InstructionF")

    const inside = k.play("inside", {
        volume: 0.02,
        loop: true
    })
    setBigPlayerMovement(k, entities.big_player)
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
            k.destroyAll("InstructionCarnetDroite") 
            k.destroyAll("InstructionCarnetGauche") 
            k.destroyAll("InstructionEExit")
            ShowKey (k, "c",  "c-down", 1150, 55, 289, 359, 1, 0.2,"InstructionF")
            entities.carnet.currentSprite = Sprite_Carnet
            CarnetOpen = false
            const page_ferme= k.play("book", {
                volume: 0.2,
            })
            checkfin ()
            return;  
        }
        if (onCollideTableau){  
            DestroyShowObject(k,"InstructionExit","Bib_tableau_deRivaz" ) 
            if(!Meet_Rivaz_ok.getinstanceRivaz()){
                PaiettesE(k)
            }
            Meet_Rivaz_ok.setinstanceRivaz(true)
            ReadingTableau = false
            k.destroyAll("InstructionExitCarnet")
            ShowKey (k, "c",  "c-down", 1150, 55, 289, 359, 1, 0.2,"InstructionF")
            return;  
                
        }
        if (onCollidePapier){ 
            ReadingPapers = false 
            k.destroyAll("InstructionExitCarnet")
            if(LecturePapers_1){
                ShowKey (k, "c",  "c-down", 1150, 55, 289, 359, 1, 0.2,"InstructionF")
                DestroyShowObject(k,"InstructionExit","Papier_1_id" ) 
                k.destroyAll("InstructionCarnetDroite")
                LecturePapers_1 = false
                const page_ferme= k.play("book", {
                    volume: 0.2,
                })
                if(!Meet_DuFay_ok.getinstanceDuFay()){
                    PaiettesE(k)
                }
                Meet_DuFay_ok.setinstanceDuFay(true)  
                return
            }

            if(LecturePapers_2){
                DestroyShowObject(k,"InstructionExit","Papier_2_id" ) 
                k.destroyAll("InstructionCarnetGauche")
                LecturePapers_2 = false
                const page_ferme= k.play("book", {
                    volume: 0.2,
                })
                if(!Meet_DuFay_ok.getinstanceDuFay()){
                    PaiettesE(k)
                }
                Meet_DuFay_ok.setinstanceDuFay(true)  
                return;  
            }
                 
        } 
 
    })
    k.onKeyPress("e", async () =>{
        if (onCollideTableau && !CarnetOpen && !ReadingTableau){  
            ReadingTableau = true
            ShowKey (k, "enter",  "enter-down", 950, 200, 289, 359, 1, 0.3,"InstructionExitCarnet")
            k.destroyAll("InstructionF") 
            ShowObject(k,"InstructionE", PortraiDerivaz, k.vec2(416,40), "Bib_tableau_deRivaz")    
            return;  
        }
        if (onCollidePapier && !CarnetOpen && !ReadingPapers){
            LecturePapers_1 = true
            ReadingPapers = true
            k.destroyAll("InstructionF") 
            ShowKey (k, "fleche_droite",  "fleche_droite-down", 1020, 400, 289, 359, 1, 0.3,"InstructionCarnetDroite")
            ShowKey (k, "enter",  "enter-down", 1000, 200, 289, 359, 1, 0.3,"InstructionExitCarnet")
            ShowObject(k,"InstructionE", Papier_1, k.vec2(330,25), "Papier_1_id") 
            const page_ferme= k.play("book", {
                volume: 0.2,
            })
            return;  
        }
        if(CollidFolken && !CarnetOpen){
            const DialogueFolken = pnj_FolkenLines.french_Folken;
            if(!Meet_Robriquet_ok.getinstanceRobriquet()){
                await dialog(k, k.vec2(32,16), DialogueFolken[0])
                PaiettesE(k)
                Meet_Robriquet_ok.setinstanceRobriquet(true)
            } else{
                dialog(k, k.vec2(32,16), DialogueFolken[1])
            }
            return;  
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
                k.area({shape: new k.Rect(k.vec2(0,0), 816, 533)}),
                k.pos(230,100),
                k.offscreen(),
                {
                    currentSprite : Sprite_Carnet,
                },
                "CarnetOPEN"
            ])
            Carnet(k)
            k.destroyAll("PailetteE")
            k.destroyAll("InstructionF") 
            ShowKey (k, "enter",  "enter-down", 130, 200, 289, 359, 1, 0.3,"InstructionExitCarnet")
            ShowKey (k, "fleche_droite",  "fleche_droite-down", 1050, 400, 289, 359, 1, 0.3,"InstructionCarnetDroite")
            return;  
        }
    })
    k.onKeyPress((key) => {if(["right","d"].includes(key)){
        if(LecturePapers_1){
        k.destroyAll("Papier_1_id")
        k.destroyAll("InstructionCarnetDroite")
        LecturePapers_1 = false
        LecturePapers_2 = true
        ShowObject(k,"InstructionE", Papier_2, k.vec2(330,25), "Papier_2_id")  
        ShowKey (k, "fleche_gauche",  "fleche_gauche-down", 250, 400, 289, 359, 1, 0.3,"InstructionCarnetGauche")
        }
    }})
    k.onKeyPress((key) => {if(["left","a"].includes(key)){
        if(LecturePapers_2){
        ShowKey (k, "fleche_droite",  "fleche_droite-down", 1020, 400, 289, 359, 1, 0.3,"InstructionCarnetDroite")
        k.destroyAll("Papier_2_id")
        k.destroyAll("InstructionCarnetGauche")
        LecturePapers_1 = true
        LecturePapers_2 = false
        ShowObject(k,"InstructionE", Papier_1, k.vec2(330,25), "Papier_1_id")  
        }
    }})
        // Index carnet
        k.onKeyPress((key) => {if(CarnetOpen)setTournerPage(k, key, entities.carnet)})
        k.onClick("Adrien_Felix",() =>     createProof(k,1, entities.carnet, Pottier_ok.getinstancePottier(), Meet_Pottier_ok.getinstancePottier(),k.vec2(305,445),285, 25,k.vec2(305,470),285, 50, "proof1_Pottier", "proof2_Pottier"))
        k.onClick("Alphonse_Beck",() =>    createProof(k,2, entities.carnet, Beck_ok.getinstanceBeck(), SeenJournal.getInstanceJournal(),k.vec2(390,250), Beck_proof1_width, 20,k.vec2(Beck_proof2_x,Beck_proof2_y),50 , 20, "proof1_Beck", "proof2_Beck"))
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
        ShowKey (k, "e","e-down", 190, 80, 225, 240, 1, 0.2,"InstructionEExit")
    });

    entities.big_player.onCollideEnd("door-exit", () =>{
        CollidDoorExit = false
        DestroyInstruction(k,"InstructionEExit")
    });

    entities.big_player.onCollide("tableau_deRivaz", ()=>{
        onCollideTableau = true
        ShowKey (k, "e","e-down", 590, 160, 225, 240, 1, 0.2,"InstructionE")
    })

    entities.big_player.onCollideEnd("tableau_deRivaz", ()=>{
        onCollideTableau = false
        DestroyInstruction(k,"InstructionE")
    })

    entities.big_player.onCollide("papier_1", ()=>{
        onCollidePapier = true
        ShowKey (k, "e","e-down", 734, 158, 225, 240, 1, 0.2,"InstructionE")
    })

    entities.big_player.onCollideEnd("papier_1", ()=>{
        onCollidePapier = false
        DestroyInstruction(k,"InstructionE")
    })

    entities.big_player.onCollide("pnj-Folken", ()=>{
        CollidFolken = true
        startInteractionPNJ(k, entities.pnj_Folken, entities.big_player, "pnj_Folken_right","pnj_Folken_left","pnj_Folken_down", "pnj_Folken_up")
        ShowKey (k, "e","e-down", 990, 208, 225, 240, 1, 0.2,"InstructionEFolken")
    })

    entities.big_player.onCollideEnd("pnj-Folken", ()=>{
        CollidFolken = false
        SetSprite(k,entities.pnj_Folken,"pnj_Folken_down")
        DestroyInstruction(k,"InstructionEFolken")
    })
}