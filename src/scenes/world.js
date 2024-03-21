import { generatePlayerComponents, setPlayerMovement } from "../entities/player.js";
import { generatepnj_marchandComponents, EventMarieAnneFolken} from "../entities/pnj_other.js";
import { colorizeBackground, drawBoundaries, fetchMapData, SetSprite, Instruction, DestroyShowObject,startInteractionPNJ, DestroyInstruction,} from "../utils.js";
import { Carnet, setTournerPage, createProof, ToDoWithProof, Souligner} from "../entities/carnet.js";
import { gameState, Meet_Folken_ok, HaveCarnet,SeenJournal,Beck_ok,Meet_Torrent_ok, Torrent_ok, Pottier_ok, Meet_Pottier_ok, Meet_Rivaz_ok, Rivaz_ok, Dufour_ok, Meet_Dufour_ok, Vuilloud_ok, Robriquet_ok, Meet_Robriquet_ok, Guillot_ok, Meet_Guillot_ok, DuFay_ok, Meet_DuFay_ok, Bellet_ok, Meet_Bellet_ok} from "../state/stateManagers.js";
import { pnj_BelletLines, pnj_PottierLines}  from "../content/pnj_dialogues.js"
import { dialog } from "../uiComponents/dialog.js";

export default async function world(k){
    
    colorizeBackground(k, 27,29,52 );
    const mapData = await fetchMapData("./assets/maps/place.json")
    const map = k.add([k.pos(0,0)])
    const place = map.add([k.sprite("assets_place"),k.pos(32,16),"place"])

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
                if (object.name === "fontaine"){
                    entities.fontaine = map.add([k.sprite("fontaine"), k.pos(object.x, object.y),"fontaine" ]);
                    continue; 
                }
            }
            
            continue;
        }

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
            k.destroyAll("entree")
            k.destroyAll("cross")
            k.destroyAll("ligne")
            k.destroyAll("InstructionCarnet")
            entities.carnet.currentSprite = "carnet_p_1"
            CarnetOpen = false
            return;   
        }
    })
    k.onKeyPress("e", async ()=>{
        if(OnCollideBellet){
            const DialogueBellet = pnj_BelletLines.french_Bellet;
            await dialog(k, k.vec2(32,16), DialogueBellet[0])
            Meet_Bellet_ok.setinstanceBellet(true)
            EventMarieAnneFolken(k)            
        }
        if(OnCollidePottier){
            const DialoguePottier = pnj_PottierLines.french_pottier;
            await dialog(k, k.vec2(32,16), DialoguePottier[0])
            Meet_Pottier_ok.setinstancePottier(true)
            console.log(Meet_Folken_ok.getinstanceFolken())
            EventMarieAnneFolken(k)
            
        }
    })

    k.onKeyPress("f", () => { //TODO interdire la possibilité de repropduire f quand carnet en cour
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
        }

    })

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
        Instruction(k, 150,55, k.vec2(490,580),"InstructionEPottier","Appuie sur e pour lui parler")
    }); 

    entities.player.onCollideEnd("pnj-Pottier", ()=> {
        OnCollidePottier = false
        SetSprite(k,entities.pnj_pottier,"pnj_Pottier_down")
        DestroyInstruction(k,"InstructionEPottier")
    });
} 