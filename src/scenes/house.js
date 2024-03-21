import { Instruction, DestroyInstruction, DestroyShowObject, colorizeBackground, drawBoundaries, fetchMapData, ShowObject, startInteractionPNJ, SetSprite} from "../utils.js";
import { setBigPlayerMovement, generateBigPlayerComponents } from "../entities/player.js";
import { gameState, Meet_Folken_ok, HaveCarnet,SeenJournal,Beck_ok,Meet_Torrent_ok, Torrent_ok, Pottier_ok, Meet_Pottier_ok, Meet_Rivaz_ok, Rivaz_ok, Dufour_ok, Meet_Dufour_ok, Vuilloud_ok, Robriquet_ok, Meet_Robriquet_ok, Guillot_ok, Meet_Guillot_ok, DuFay_ok, Meet_DuFay_ok, Bellet_ok, Meet_Bellet_ok} from "../state/stateManagers.js";
import { Carnet, setTournerPage, createProof,ToDoWithProof, Souligner} from "../entities/carnet.js";
import { pnj_FolkenLines} from "../content/pnj_dialogues.js"
import { dialog } from "../uiComponents/dialog.js";

export default async function house(k){
    colorizeBackground(k, 27,29,52 );
    const mapData = await fetchMapData("./assets/maps/bureau.json");
    const map = k.add([k.pos(0,0)])
    const bureau = map.add([k.sprite("assets_bureau"),k.pos(32,16),"bureau"])

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
                if (object.name === "papier_2"){
                    entities.tableau = map.add([k.area({shape: new k.Rect(k.vec2(object.x, object.y), 131, 95)}),"papier_2"]);
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
    let onCollidePapier = false
    let CollidFolken = false
    let LecturePapers_1 = false
    let LecturePapers_2 = false

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
            entities.carnet.currentSprite = "carnet_p_1"
            CarnetOpen = false
            return;  
        }
        if (onCollideTableau){  
            DestroyShowObject(k,"InstructionExit","Bib_tableau_deRivaz" ) 
            Meet_Rivaz_ok.setinstanceRivaz(true)
            return;  
                
        }
        if (onCollidePapier){  
            if(LecturePapers_1){
            DestroyShowObject(k,"InstructionExit","Papier_1_id" ) 
            k.destroyAll("InstructionFleche")
            LecturePapers_1 = false
            return
            }
            if(LecturePapers_2){
            DestroyShowObject(k,"InstructionExit","Papier_2_id" ) 
            k.destroyAll("InstructionFleche")
            LecturePapers_2 = false
            return;  
            }
                 
        }

    })
    k.onKeyPress("e", () =>{
        if (onCollideTableau){  
            Instruction(k,170,60,k.vec2(950,200),"InstructionExit","Appuie sur enter pour arrêter l'observation" )
            ShowObject(k,"InstructionE", "Big_tabl_Rivaz", k.vec2(416,40), "Bib_tableau_deRivaz")        
            return;  
        }
        if (onCollidePapier){
            LecturePapers_1 = true
            Instruction(k,170,60,k.vec2(1000,225),"InstructionExit","Appuie sur enter pour arrêter la lecture" )
            Instruction(k,170,80,k.vec2(1000,425),"InstructionFleche","Utilise les flèches gauche et droite pour changer de document" )
            ShowObject(k,"InstructionE", "Papier_1", k.vec2(330,25), "Papier_1_id") 
            Meet_Guillot_ok.setinstanceGuillot(true)  
            return;  
        }
        if(CollidFolken){
            const DialogueFolken = pnj_FolkenLines.french_Folken;
            dialog(k, k.vec2(32,16), DialogueFolken[0])
            Meet_Robriquet_ok.setinstanceRobriquet(true)
            return;  
        }

    });
    k.onKeyPress("f", () => { 
        if(HaveCarnet.getInstanceCarnet()&& !CarnetOpen && !gameState.getFreezePlayer()) {
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
            Instruction(k, 170,240, k.vec2(1050,300),"InstructionCarnet",
            "Navigue dans le carnet avec la souris et en appuyant sur les flèches droite et gauche. Pour chaque profil, trouve une ou deux preuves qui excluent la personne d'être celle reprensentée sur le tableau")
            return;  
        }
    })
    k.onKeyPress((key) => {if(["right","d"].includes(key)){
        if(LecturePapers_1){
        k.destroyAll("Papier_1_id")
        LecturePapers_1 = false
        LecturePapers_2 = true
        ShowObject(k,"InstructionE", "Papier_2", k.vec2(330,25), "Papier_2_id")  
        Meet_DuFay_ok.setinstanceDuFay(true)
        }
    }})
    k.onKeyPress((key) => {if(["left","a"].includes(key)){
        if(LecturePapers_2){
        k.destroyAll("Papier_2_id")
        LecturePapers_1 = true
        LecturePapers_2 = false
        ShowObject(k,"InstructionE", "Papier_1", k.vec2(330,25), "Papier_1_id")  
        }
    }})
        // Index carnet
        k.onKeyPress((key) => {if(CarnetOpen)setTournerPage(k, key, entities.carnet)})
        k.onClick("Adrien_Felix",() =>     createProof(k,1, entities.carnet, Pottier_ok.getinstancePottier(), Meet_Pottier_ok.getinstancePottier(),k.vec2(305,435),250, 25,k.vec2(305,460),250 , 25, "proof1_Pottier", "proof2_Pottier"))
        k.onClick("Alphonse_Beck",() =>    createProof(k,2, entities.carnet, Beck_ok.getinstanceBeck(), SeenJournal.getInstanceJournal(),k.vec2(390,250),120, 20,k.vec2(650,225),50 , 20, "proof1_Beck", "proof2_Beck"))
        k.onClick("Charles_Emmanuel",() => createProof(k,3, entities.carnet, Rivaz_ok.getinstanceRivaz(), Meet_Rivaz_ok.getinstanceRivaz(),k.vec2(410,155),185, 255,k.vec2(295,320),195 , 245, "proof1_Rivaz", "proof2_Rivaz"))
        k.onClick("Dufour_Michel",() =>    createProof(k,4, entities.carnet, Dufour_ok.getinstanceDufour(), Meet_Dufour_ok.getinstanceDufour(),k.vec2(390,250),120, 20,k.vec2(815,195),50 , 20, "proof1_Dufour", "proof2_Dufour"))
        k.onClick("Emile_Vuilloud",() =>   createProof(k,5, entities.carnet, Vuilloud_ok.getinstanceVuilloud(), SeenJournal.getInstanceJournal(),k.vec2(400,260),120, 20,k.vec2(780, 200),50 , 20, "proof1_Vuilloud", "proof2_Vuilloud"))
        k.onClick("Joseph_Torrent",() =>   createProof(k,6, entities.carnet, Torrent_ok.getinstanceTorrent(), Meet_Torrent_ok.getinstanceTorrent(),k.vec2(375,400),225, 20,k.vec2(305,425),100 , 20, "proof1_Torrent", "proof2_Torrent"))
        k.onClick("Louis_Robriquet",() =>  createProof(k,7, entities.carnet, Robriquet_ok.getinstanceRobriquet(), Meet_Robriquet_ok.getinstanceRobriquet(),k.vec2(300,250),255, 50,k.vec2(815,195),150 , 20, "proof1_Robriquet", "proof2_Robriquet"))
        k.onClick("Pierre_Guillot",() =>   createProof(k,8, entities.carnet, Guillot_ok.getinstanceGuillot(), Meet_Guillot_ok.getinstanceGuillot(),k.vec2(320,375),250, 40,k.vec2(650,425),135 , 20, "proof1_Guillot", "proof2_Guillot"))
        k.onClick("Pierre_DuFay",() =>     createProof(k,9, entities.carnet, DuFay_ok.getinstanceDuFay(), Meet_DuFay_ok.getinstanceDuFay(),k.vec2(300,550),290, 20,k.vec2(300,570),290 , 20, "proof1_DuFay", "proof2_DuFay"))
        k.onClick("Rey_Bellet",() =>       createProof(k,10, entities.carnet, Bellet_ok.getinstanceBellet(), Meet_Bellet_ok.getinstanceBellet(),k.vec2(300,285),280, 20,k.vec2(300,305),55 , 25, "proof1_Bellet", "proof2_Bellet"))
    
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

    entities.big_player.onCollide("papier_2", ()=>{
        if(!CollidFolken){
        onCollidePapier_2 = true
        Instruction(k,160,55,k.vec2(1000,190),"InstructionE","Appuie sur e pour lire les documents" )
        }
    })

    entities.big_player.onCollideEnd("papier_2", ()=>{
        onCollidePapier_2 = false
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