import { colorizeBackground, drawBoundaries, fetchMapData, Instruction,DestroyInstruction, ShowObject, DestroyShowObject,startInteractionPNJ,SetSprite } from "../utils.js";
import { setMoyenPlayerMovement, generateMoyenPlayerComponents } from "../entities/player.js";
import  dialogintrogameplay from "../content/pont_innerdialogue.js";
import { pnj_TorrentLines} from "../content/pnj_dialogues.js"
import { gameState, gameStatePont, TutoDone, Tutodoing,HaveCarnet,HaveReadCarnet,SeenJournal,Beck_ok,Meet_Torrent_ok, Torrent_ok, Pottier_ok, Meet_Pottier_ok, Meet_Rivaz_ok, Rivaz_ok, Dufour_ok, Meet_Dufour_ok, Vuilloud_ok, Robriquet_ok, Meet_Robriquet_ok, Guillot_ok, Meet_Guillot_ok, DuFay_ok, Meet_DuFay_ok, Bellet_ok, Meet_Bellet_ok} from "../state/stateManagers.js";
import { dialog } from "../uiComponents/dialog.js";
import { generateCarnetComponents, Carnet,createProof, setTournerPage, ToDoWithProof, Souligner, RectoVersoLecture, checkfin} from "../entities/carnet.js";

export default async function pont(k){

    colorizeBackground(k, 27,29,52 );
    const mapData = await fetchMapData("./assets/maps/pont.json");
    const map = k.add([k.pos(0,0)])
    const pont = map.add([k.sprite("assets_pont"),k.pos(32,16),"pont"])

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
        
    }

    const river = k.play("river", {
        volume: 0.2,
        loop: true
    })
    if(!gameStatePont.getfirstTimepont())Instruction(k, 135,55, k.vec2(1115,25),"InstructionF","Appuie sur J pour ouvrir le carnet");
    setMoyenPlayerMovement(k, entities.moyen_player)
    let CollideJournal = false
    let CollideCarnet = false
    let CollideAne = false
    let CarnetOpen = false
    let CollidTorrent = false 
    let CollidDoorEntrance = false
    const responses = dialogintrogameplay.french;

    k.onKeyPress("e", async ()=>{
        if(CollideJournal){
            ShowObject(k,"InstructionEJournal", "journal_grand", k.vec2(400,100), "journal_grand")
            Instruction(k,170,60,k.vec2(880, 150),"InstructionjournalExit","Appuie sur enter pour arrêter la lecture") 
            if(SeenJournal.getInstanceJournal(true))return;
            await dialog(k, k.vec2(32,16), responses[3])
            gameState.setFreezePlayer(true)
            SeenJournal.setInstanceJournal(true)
        }
        if(CollideCarnet){
            DestroyShowObject(k,"InstructionECarnet","carnet" )
            HaveCarnet.setInstanceCarnet(true)
            Instruction(k, 135,55, k.vec2(1115,25),"InstructionF","Appuie sur J pour ouvrir le carnet")
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
        if(CollidDoorEntrance){
            gameStatePont.setfirstTimepont(false)
            river.stop()
            k.go("world");
        }  
        if(CarnetOpen){
            RectoVersoLecture(k)
        }
    })


    k.onKeyPress("enter",()=>{
        if(CarnetOpen){
            if(HaveReadCarnet.getInstanceCarnet_lecture()) return;
            if(Tutodoing.getInstanceTuto2()){ k.destroyAll("InstructionTutoCarnet"); Tutodoing.setInstanceTuto2(false); return}
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
            entities.carnet.currentSprite = "carnet_p_1"
            CarnetOpen = false
            const page_ferme= k.play("book", {
                volume: 0.2,
            })
            checkfin ()
            return;   

        }
        if (CollideJournal ){
            if(!SeenJournal.getInstanceJournal())return
            DestroyShowObject(k,"InstructionjournalExit","journal_grand" )
            return;   
        } if(CollideAne ){
            DestroyShowObject(k,"InstructionExitAne","Bib_tableau_Dufour" ) 
            if(gameStatePont.getfirstTimepont() && !HaveCarnet.getInstanceCarnet()){
                const carnet = k.add(generateCarnetComponents(k,k.vec2(1000, 645)));
            }
            return; 
        }
    })
    k.onKeyPress("j", async ()  => { 
        if(HaveCarnet.getInstanceCarnet() && !CarnetOpen && !gameState.getFreezePlayer()) {
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
            if (HaveReadCarnet.getInstanceCarnet_lecture()){
                await dialog(k, k.vec2(32,16), responses[2])
                HaveReadCarnet.setInstanceCarnet_lecture(false)
                gameState.setFreezePlayer(true)
            }
        }
    })
        // Index carnet
        k.onKeyPress((key) => {if(CarnetOpen && !HaveReadCarnet.getInstanceCarnet_lecture())setTournerPage(k, key, entities.carnet)})
        k.onClick("Adrien_Felix",() =>     createProof(k,1, entities.carnet, Pottier_ok.getinstancePottier(), Meet_Pottier_ok.getinstancePottier(),k.vec2(305,445),285, 25,k.vec2(305,470),285, 50, "proof1_Pottier", "proof2_Pottier"))
        k.onClick("Alphonse_Beck",() =>   {
            if(!TutoDone.getInstanceTuto() && !SeenJournal.getInstanceJournal()){ 
                Tutodoing.setInstanceTuto2(true)
                createProof(k,2, entities.carnet, Beck_ok.getinstanceBeck(), SeenJournal.getInstanceJournal(),k.vec2(390,250),120, 20,k.vec2(650,225),50 , 20, "proof1_Beck", "proof2_Beck")   
                const InstructionBoxtuto = k.add([k.rect(500, 350), k.pos(375,200), k.outline(4), k.opacity(0.7),k.offscreen(),"InstructionTutoCarnet"]) 
                const textInstructionBoxtuto = InstructionBoxtuto.add([
                    k.text("Pour découvrire à qui appartient le mytérieux tableau, tu vas devoir éliminier un profil après l'autre. Pour cela, tu auras besoin d'indices que tu découvriras en explorant les environs. Découvre ton premier indice et reviens sur cette page !", 
                    {   font: "NiceFont",
                        width : 490,
                        size : 35,
                        lineSpacing : 10,
                    }), 
                    k.color(27,29,52),
                    k.pos(10,10), // par rappor à dialogbox  
                    k.opacity(0.7)
                ]);
                const textInstructionBoxOut = InstructionBoxtuto.add([
                    k.text("Appuie sur Enter", 
                    {   font: "NiceFont",
                        width : 490,
                        size : 35,
                        lineSpacing : 10,
                    }), 
                    k.color(27,29,52),
                    k.pos(300,313), // par rappor à dialogbox  
                    k.opacity(0.5)
                ]);
            }
            if(!TutoDone.getInstanceTuto() && SeenJournal.getInstanceJournal()){
                Tutodoing.setInstanceTuto2(true)
                createProof(k,2, entities.carnet, Beck_ok.getinstanceBeck(), SeenJournal.getInstanceJournal(),k.vec2(390,250),120, 20,k.vec2(650,225),50 , 20, "proof1_Beck", "proof2_Beck")
                const InstructionBoxtuto = k.add([k.rect(665, 500), k.pos(300,115), k.outline(4), k.opacity(0.9),k.offscreen(),"InstructionTutoCarnet"]) 
                const textInstructionBoxtuto = InstructionBoxtuto.add([
                    k.text("Afin de découvrire à qui appartient le mytérieux tableau, tu vas devoir éliminier un profil après l'autre. Pour se faire, tu vas partir à la chasse à l'indice... quel élément du text de la page de droite ou du document en page gauche t'indique que cette personne n'est pas la bonne ? Dans le cas d'Alphonse Beck, le journal du jour nous indique que nous sommes le 31 octobre 1815, mais Alphonse Beck naît en 1822, il ne peut donc pas être le destinataire du tableau. Dans le profil de Beck, tu vas pouvoir clicker avec ta souris sur 1822 et sur 1815, afin d'éliminer Beck de la liste des potentiels propriétaires. Fais de même avec les autres profils jusqu'à ce qu'il ne t'en reste qu'un seul! Tous les profils ne nécessitent pas deux preuves, parfois il te faudra cliquer une fois, parfois deux. Bonne Chance !", 
                    {   font: "NiceFont",
                        width : 660,
                        size : 30,
                        lineSpacing : 7,
                    }), 
                    k.color(27,29,52),
                    k.pos(10,10), // par rappor à dialogbox  
                    k.opacity(0.7)
                ]);
                const textInstructionBoxOut = InstructionBoxtuto.add([
                    k.text("Appuie sur Enter", 
                    {   font: "NiceFont",
                        width : 490,
                        size : 35,
                        lineSpacing : 10,
                    }), 
                    k.color(27,29,52),
                    k.pos(470,455), // par rappor à dialogbox  
                    k.opacity(0.5)
                ]);
                
            }    
            if(TutoDone.getInstanceTuto()){
                createProof(k,2, entities.carnet, Beck_ok.getinstanceBeck(), SeenJournal.getInstanceJournal(),k.vec2(390,250),120, 20,k.vec2(650,225),50 , 20, "proof1_Beck", "proof2_Beck")
            }
        })
        k.onClick("Charles_Emmanuel",() => createProof(k,3, entities.carnet, Rivaz_ok.getinstanceRivaz(), Meet_Rivaz_ok.getinstanceRivaz(),k.vec2(410,155),185, 255,k.vec2(295,320),195 , 245, "proof1_Rivaz", "proof2_Rivaz"))
        k.onClick("Dufour_Michel",() =>    createProof(k,4, entities.carnet, Dufour_ok.getinstanceDufour(), Meet_Dufour_ok.getinstanceDufour(),k.vec2(390,250),120, 20,k.vec2(815,195),50 , 20, "proof1_Dufour", "proof2_Dufour"))
        k.onClick("Emile_Vuilloud",() =>   createProof(k,5, entities.carnet, Vuilloud_ok.getinstanceVuilloud(), SeenJournal.getInstanceJournal(),k.vec2(400,260),120, 20,k.vec2(780, 200),50 , 20, "proof1_Vuilloud", "proof2_Vuilloud"))
        k.onClick("Joseph_Torrent",() =>   createProof(k,6, entities.carnet, Torrent_ok.getinstanceTorrent(), Meet_Torrent_ok.getinstanceTorrent(),k.vec2(460,410),120, 30,k.vec2(305,435),225 , 55, "proof1_Torrent", "proof2_Torrent"))
        k.onClick("Louis_Robriquet",() =>  createProof(k,7, entities.carnet, Robriquet_ok.getinstanceRobriquet(), Meet_Robriquet_ok.getinstanceRobriquet(),k.vec2(300,270),270, 80,k.vec2(805,195),160 , 20, "proof1_Robriquet", "proof2_Robriquet"))
        k.onClick("Pierre_Guillot",() =>   createProof(k,8, entities.carnet, Guillot_ok.getinstanceGuillot(), Meet_Guillot_ok.getinstanceGuillot(),k.vec2(320,185),260, 80,k.vec2(650,425),135 , 20, "proof1_Guillot", "proof2_Guillot"))
        k.onClick("Pierre_DuFay",() =>     createProof(k,9, entities.carnet, DuFay_ok.getinstanceDuFay(), Meet_DuFay_ok.getinstanceDuFay(),k.vec2(300,450),290, 20,k.vec2(300,470),290 , 20, "proof1_DuFay", "proof2_DuFay"))
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

    if (gameStatePont.getfirstTimepont()) {
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
        CollidDoorEntrance = true 
        if(!Beck_ok.getinstanceBeck()){
        Instruction(k, 155,105, k.vec2(740,230),"InstructionEDoor","Pour l'instant, tu ne peux pas poursuivre ton aventure au-delà du pont!")
        }
        if(Beck_ok.getinstanceBeck()){
        Instruction(k, 135,60, k.vec2(740,230),"InstructionEDoor","Appuie sur e pour traverser le pont")
        }
    });

    entities.moyen_player.onCollideEnd("door-entrance", ()=>{
        CollidDoorEntrance = false
        DestroyInstruction(k,"InstructionEDoor")
    })

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
        if(gameStatePont.getfirstTimepont() && !HaveCarnet.getInstanceCarnet()){
            dialog(k, k.vec2(32,16), responses[1])}
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