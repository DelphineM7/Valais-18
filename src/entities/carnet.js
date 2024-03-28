// Functions permettant de faire fonctionner le carnet

import { gameState, Meet_Torrent_ok, Torrent_ok, Beck_ok,SeenJournal } from "../state/stateManagers.js";
import { Tutodoing, TutoDone, Pottier_ok, Meet_Pottier_ok, Meet_Rivaz_ok, Rivaz_ok, Dufour_ok, Meet_Dufour_ok, Vuilloud_ok, Robriquet_ok, Meet_Robriquet_ok, Guillot_ok, Meet_Guillot_ok, DuFay_ok, Meet_DuFay_ok, Bellet_ok, Meet_Bellet_ok} from "../state/stateManagers.js";
import { SetSprite, ShowObject, Instruction,  DestroyInstruction, DestroyShowObject } from "../utils.js";

let page = 0
let proof1_Beck = false 
let proof2_Beck = false 
let proof1_Vuilloud = false 
let proof2_Vuilloud = false 
let proof1_Rivaz = false 
let proof2_Rivaz = false
let showrecto_Guillot = true
let showrecto_Dufay = true
export function generateCarnetComponents(k, pos){ 
    return [
        k.sprite("carnet"),
        k.body({isStatic : true}),
        k.area({shape: new k.Rect(k.vec2(0,0), 98, 62)}),
        k.pos(pos),
        k.offscreen(),
        "carnet", 
    ];
}
const Assets_carnet = [
    ["page_Garde", "carnet_p_1", "carnet_p_1", ],
    ["Adrien_Felix","carnet_Pottier_vide", "carnet_Pottier",205,"carnet_Pottier_plein","ligne_Pottier" ],
    ["Alphonse_Beck","carnet_Beck_vide", "carnet_Beck", 150, "carnet_Beck_plein","ligne_Beck"], 
    ["Charles_Emmanuel","carnet_Rivaz_vide", "carnet_Rivaz",270, "carnet_Rivaz_plein","ligne_Rivaz"],
    ["Dufour_Michel","carnet_Dufour_vide", "carnet_Dufour",150, "carnet_Dufour_plein","ligne_Dufour" ],
    ["Emile_Vuilloud","carnet_Vuilloud_vide", "carnet_Vuilloud",160, "carnet_Vuilloud_plein","ligne_Vuilloud"],
    ["Joseph_Torrent" ,"carnet_Torrent_vide", "carnet_Torrent",150, "carnet_Torrent_plein","ligne_Torrent"],
    ["Louis_Robriquet","carnet_Robriquet_vide", "carnet_Robriquet",170, "carnet_Robriquet_plein","ligne_Robriquet"],
    ["Pierre_Guillot", "carnet_Guillot_vide","carnet_Guillot",150, "carnet_Guillot_plein","ligne_Guillot"], 
    ["Pierre_DuFay", "carnet_DuFay_vide","carnet_DuFay",195, "carnet_DuFay_plein","ligne_DuFay"],
    ["Rey_Bellet", "carnet_Bellet_vide","carnet_Bellet", 200, "carnet_Bellet_plein","ligne_Bellet"]
]

// affiche le carnet et tient à jour l'index avec des croix
export function Carnet(k){
    const page_ouvert= k.play("book", {
        volume: 0.2,
    })
    gameState.setFreezePlayer(true)
    page = 0
    for (let i = 1; i < Assets_carnet.length; i++) {
        const Entry= k.add([  
            k.area({shape: new k.Rect(k.vec2(300,182+(i-1)*39.5), Assets_carnet[i][3], 20,)}),
            "entree",
            Assets_carnet[i][0],
        ])

    if(Pottier_ok.getinstancePottier()) {const cross = k.add([k.sprite("cross"), k.pos(300+210, 182+(1-1)*39.5),"cross" ])}
    if(Beck_ok.getinstanceBeck()) {const cross = k.add([k.sprite("cross"), k.pos(300+155, 182+(2-1)*39.5),"cross" ])}
    if(Rivaz_ok.getinstanceRivaz()) {const cross = k.add([k.sprite("cross"), k.pos(300+275, 186+(3-1)*39.5),"cross" ])}
    if(Vuilloud_ok.getinstanceVuilloud()) {const cross = k.add([k.sprite("cross"), k.pos(300+165, 182+(5-1)*39.5),"cross" ])}
    if(Torrent_ok.getinstanceTorrent()) {const cross = k.add([k.sprite("cross"), k.pos(300+155, 182+(6-1)*39.5),"cross" ])}
    if(Robriquet_ok.getinstanceRobriquet()){const cross = k.add([k.sprite("cross"), k.pos(300+175, 182+(7-1)*39.5),"cross" ])}
    if(Guillot_ok.getinstanceGuillot()){const cross = k.add([k.sprite("cross"), k.pos(300+155, 182+(8-1)*39.5),"cross" ])}
    if(DuFay_ok.getinstanceDuFay()){const cross = k.add([k.sprite("cross"), k.pos(300+210, 182+(9-1)*39.5),"cross" ])}
    if(Bellet_ok.getinstanceBellet()) {const cross = k.add([k.sprite("cross"), k.pos(300+215, 182+(10-1)*39.5),"cross" ])}
    }
}

// Souligne les noms et prénoms dans l'index
export function Souligner (k, id){
    for (let i = 1; i < Assets_carnet.length; i++) {
        if (id == Assets_carnet[i][0]){
            const ligne = k.add([k.sprite(Assets_carnet[i][5]), k.pos(300, 202+(i-1)*39.5), "ligne"])
            return;
        }
    }
}

//Adapte chaque page du carnet en fonction de l'avancé de l'enquête en 3 étapes. fonction utilisée pour tourner les pages et avec le click dans l'index
export function createProof(k,nbr,Carnetname,ManagementInfo2 , ManagementInfo1,pos1, widthProof1, heightProof1,pos2, widthProof2, heightProof2,id_proof1,id_proof2){
    
    if(!ManagementInfo2){
    page = nbr
    let Flag = ManagementInfo1 ? 2 :1
    SetSprite(k,Carnetname, Assets_carnet[nbr][Flag])
    k.destroyAll("ligne")
    k.destroyAll("entree")
    k.destroyAll("cross")

    if (!ManagementInfo1) return; 
    
    const Proof1= k.add([  
        k.area({shape: new k.Rect(pos1, widthProof1, heightProof1)}),
        "proof",
        id_proof1
    ])
    const Proof2= k.add([  
        k.area({shape: new k.Rect(pos2, widthProof2, heightProof2)}),
        "proof",
        id_proof2
    ])
    if(proof1_Beck && page == 2){
        k.add([k.rect(120,20), k.pos(390,250),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        return;
    } 
    if(proof2_Beck && page == 2){
        k.add([k.rect(50,20), k.pos(650,225),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        return;
    } 
    if(proof1_Vuilloud  && page == 5){
        k.add([k.rect(120,20), k.pos(400,260),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        return;
    } 
    if(proof2_Vuilloud  && page == 5){
        k.add([k.rect(40,20), k.pos(780, 200),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        return;
    } 
    if(proof1_Rivaz  && page == 3){
        k.add([k.rect(185,255), k.pos(410,155),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        return;
    } 
    if(proof2_Rivaz  && page == 3){
        k.add([k.rect(195,245), k.pos(295, 320),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        return;
    } 

    if(page == 8){
        Instruction(k,170,60,k.vec2(50,200),"InstructionVerso","Appuie sur e pour lire le verso du document" )
        return;
    }
    if(page == 9 ){
        Instruction(k,170,60,k.vec2(50,200),"InstructionVerso","Appuie sur e pour lire le verso du document" )
        return;
    }

    return;
    }
    if(ManagementInfo2){
    page = nbr
    if(page == 8){
        Instruction(k,170,60,k.vec2(50,200),"InstructionVerso","Appuie sur e pour lire le verso du document" )
    }
    if(page == 9 ){
        Instruction(k,170,60,k.vec2(50,200),"InstructionVerso","Appuie sur e pour lire le verso du document" )
    }
    SetSprite(k,Carnetname, Assets_carnet[nbr][4])
    k.destroyAll("ligne")
    k.destroyAll("entree")
    k.destroyAll("cross")

    return;
    }
}

// Permet de créer une animation lorsqu'un personnage est exclu des suspects
async function AllProofsfound(k, content,longeur, pos, id_text){
    const TextProof = k.add([
        k.text("", {
            font: "CarnetFont",
            width : longeur,
            lineSpacing : 3,
            size : 17,
        }),
        k.pos(pos),
        k.color(25.1,8.2,10.2),
        id_text
    ])
    for (const character of content){
        await new Promise((fini)=>{  
            setTimeout(() => {
                TextProof.text += character
                fini() // permet de signifier que promise a été effectuée, et le await peut continuer permet d'avoir un caractère après l'autre
            }, 2); // millisecondes
        })
    }
}

// permet de clicker sur les éléments dans le carnet pour exclure des personnages
export function ToDoWithProof(k,id, id_text){
    if(id === "proof1_Beck"){
        k.add([k.rect(120,20), k.pos(390,250),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        proof1_Beck = true
        k.destroyAll("proof1_Beck")
        if (!proof2_Beck)return;
        AllProofsfound(k,"Alphonse Beck n'était pas né en 1815,     ce n'est pas lui sur le tableau.",320, k.vec2(300,550),id_text)
        Beck_ok.setinstanceBeck(true)
        TutoDone.setInstanceTuto(true)
        return;

    } 
    if ( id === "proof2_Beck" ){
        k.add([k.rect(50,20), k.pos(650,225),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        proof2_Beck = true
        k.destroyAll("proof2_Beck")
        if (!proof1_Beck)return;
        AllProofsfound(k,"Alphonse Beck n'était pas né en 1815,     ce n'est pas lui sur le tableau.", 320,k.vec2(300,550),id_text)
        Beck_ok.setinstanceBeck(true)
        TutoDone.setInstanceTuto(true)
        return;
    }
    if(id === "proof1_Vuilloud"){
        k.add([k.rect(120,20), k.pos(400,260),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        proof1_Vuilloud = true
        k.destroyAll("proof1_Vuilloud")
        if (!proof2_Vuilloud)return;
        AllProofsfound(k,"Emile Vuilloud n'était pas né en 1815,         ce n'est pas lui sur le tableau.", 320, k.vec2(300,555),id_text)
        Vuilloud_ok.setinstanceVuilloud(true)
        return;

    } 
    if ( id === "proof2_Vuilloud" ){
        k.add([k.rect(40,20), k.pos(780, 200),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        proof2_Vuilloud = true
        k.destroyAll("proof2_Vuilloud")
        if (!proof1_Vuilloud)return;
        AllProofsfound(k,"Emile Vuilloud n'était pas né en 1815,         ce n'est pas lui sur le tableau.", 320, k.vec2(300,555),id_text)
        Vuilloud_ok.setinstanceVuilloud(true)
        return;
    }
    if(id === "proof1_Torrent" ||  id === "proof2_Torrent"){
        k.add([k.rect(120,25), k.pos(473,410),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        k.add([k.rect(225,55), k.pos(305, 435),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        k.destroyAll("proof1_Torrent")
        k.destroyAll("proof2_Torrent")
        AllProofsfound(k,"Ce n'est pas la personne que je cherche.", 300,k.vec2(305,500),id_text)
        Torrent_ok.setinstanceTorrent(true)
        return;
    }   
    if(id === "proof1_Rivaz"){
        k.add([k.rect(185,255), k.pos(410,155),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        proof1_Rivaz = true
        k.destroyAll("proof1_Rivaz")
        if (!proof2_Rivaz)return;
        AllProofsfound(k,"Charles Emmanuel de Rivaz ne ressemble pas à cet homme. Ce n'est pas lui que je cherche.", 120,k.vec2(295,155),id_text)
        Rivaz_ok.setinstanceRivaz(true)
        return;

    } 
    if ( id === "proof2_Rivaz" ){
        k.add([k.rect(195,245), k.pos(295, 320),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        proof2_Rivaz = true
        k.destroyAll("proof2_Rivaz")
        if (!proof1_Rivaz)return;
        AllProofsfound(k,"Charles Emmanuel de Rivaz ne ressemble pas à cet homme. Ce n'est pas lui que je cherche.", 120,k.vec2(295,155),id_text)
        Rivaz_ok.setinstanceRivaz(true)
        return;
    }
    if(id === "proof1_Guillot" && !showrecto_Guillot){
        k.add([k.rect(260,80), k.pos(320,185),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        k.destroyAll("proof1_Guillot")
        k.destroyAll("proof2_Guillot")
        AllProofsfound(k,"Il est décédé depuis 1791. Ce n'est pas la personne que je cherche.", 300,k.vec2(660,525),id_text)
        Guillot_ok.setinstanceGuillot(true)
        return;
    }
    if ( id === "proof2_Guillot" ){
        k.add([k.rect(135,20), k.pos(650,425),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        k.destroyAll("proof2_Guillot")
        k.destroyAll("proof1_Guillot")
        AllProofsfound(k,"Il est décédé depuis 1791. Ce n'est pas la personne que je cherche.", 300,k.vec2(660,525),id_text)
        Guillot_ok.setinstanceGuillot(true)
        return;
    }    
    if(id === "proof1_DuFay" ||  id === "proof2_DuFay"){
        if(showrecto_Dufay)return;
        k.add([k.rect(290,20), k.pos(300,450),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        k.add([k.rect(150,20), k.pos(300,470),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        k.destroyAll("proof1_DuFay")
        k.destroyAll("proof2_DuFay")
        AllProofsfound(k,"Je dois lui remettre le tableau en main propre. Ce n'est pas lui sur le tableau.", 320,k.vec2(660,525),id_text)
        DuFay_ok.setinstanceDuFay(true)
        return;
    }
    if(id === "proof1_Pottier" ||  id === "proof2_Pottier"){
        k.add([k.rect(285,25), k.pos(305,445),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        k.add([k.rect(285,50), k.pos(305,470),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        k.destroyAll("proof1_Pottier")
        k.destroyAll("proof2_Pottier")
        AllProofsfound(k,"Ce n'est pas la personne que je cherche.", 300,k.vec2(305,530),id_text)
        Pottier_ok.setinstancePottier(true)
        return;
    }
    if(id === "proof1_Bellet" ||  id === "proof2_Bellet"){
        k.add([k.rect(220,20), k.pos(300,305),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        k.add([k.rect(200,25), k.pos(300,325),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        k.destroyAll("proof1_Bellet")
        k.destroyAll("proof2_Bellet")
        AllProofsfound(k,"Ce n'est pas la personne que je cherche.", 300,k.vec2(305,450),id_text)
        Bellet_ok.setinstanceBellet(true)
        return; 
    }
    if(id === "proof1_Robriquet"){
        k.add([k.rect(270,80), k.pos(300,270),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        k.destroyAll("proof1_Robriquet")
        k.destroyAll("proof2_Robriquet")
        AllProofsfound(k,"Ce n'est pas la personne que je cherche.", 300,k.vec2(305,380),id_text)
        Robriquet_ok.setinstanceRobriquet(true)
        return;
    }
    if ( id === "proof2_Robriquet" ){
        k.add([k.rect(160,20), k.pos(805,195),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        k.destroyAll("proof2_Robriquet")
        k.destroyAll("proof1_Robriquet")
        AllProofsfound(k,"Ce n'est pas la personne que je cherche.", 300,k.vec2(305,380),id_text)
        Robriquet_ok.setinstanceRobriquet(true)
        return;
    } 
}

// fonction qui permet de tourner les pages  
export function setTournerPage(k, key, Carnetname){
        if (!gameState.getFreezePlayer()) return; 
        if (["left","a"].includes(key)){   
            page -= 1 
            if (page < 0) page = 0
            if (page == 0){
                k.destroyAll("proof")
                k.destroyAll("proof_color")
                k.destroyAll("texte_proof")
                k.destroyAll("cross")
                k.destroyAll("ligne")
                Carnet(k)
                SetSprite(k,Carnetname, Assets_carnet[0][1])
                return;
            }
            if (page === 1){
                k.destroyAll("proof")
                k.destroyAll("proof_color")
                k.destroyAll("texte_proof")
                k.destroyAll("cross")
                k.destroyAll("ligne")
                createProof(k,1, Carnetname, Pottier_ok.getinstancePottier(), Meet_Pottier_ok.getinstancePottier(),k.vec2(305,445),285, 25,k.vec2(305,470),285, 50, "proof1_Pottier", "proof2_Pottier")
                return;
            }
            if (page === 2){
                k.destroyAll("proof")
                k.destroyAll("proof_color")
                k.destroyAll("texte_proof")
                k.destroyAll("cross")
                k.destroyAll("ligne")
                if(!TutoDone.getInstanceTuto() && !SeenJournal.getInstanceJournal()){ 
                    Tutodoing.setInstanceTuto2(true)
                    createProof(k,2, Carnetname, Beck_ok.getinstanceBeck(), SeenJournal.getInstanceJournal(),k.vec2(390,250),120, 20,k.vec2(650,225),50 , 20, "proof1_Beck", "proof2_Beck")   
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
                    return;
                }
                if(!TutoDone.getInstanceTuto() && SeenJournal.getInstanceJournal()){
                    Tutodoing.setInstanceTuto2(true)
                    createProof(k,2, Carnetname, Beck_ok.getinstanceBeck(), SeenJournal.getInstanceJournal(),k.vec2(390,250),120, 20,k.vec2(650,225),50 , 20, "proof1_Beck", "proof2_Beck")
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
                    return;
                    
                }    
                if(TutoDone.getInstanceTuto()){
                    createProof(k,2, Carnetname, Beck_ok.getinstanceBeck(), SeenJournal.getInstanceJournal(),k.vec2(390,250),120, 20,k.vec2(650,225),50 , 20, "proof1_Beck", "proof2_Beck")
                    return;
                }
            }
            if (page === 3){
                k.destroyAll("proof")
                k.destroyAll("proof_color")
                k.destroyAll("texte_proof")
                k.destroyAll("cross")
                k.destroyAll("ligne")
                createProof(k,3, Carnetname, Rivaz_ok.getinstanceRivaz(), Meet_Rivaz_ok.getinstanceRivaz(),k.vec2(410,155),185, 255,k.vec2(295,320),195 , 245, "proof1_Rivaz", "proof2_Rivaz")
                return; 
            }
            if (page === 4){
                k.destroyAll("proof")
                k.destroyAll("proof_color")
                k.destroyAll("texte_proof")
                k.destroyAll("cross")
                k.destroyAll("ligne")
                createProof(k,4, Carnetname, Dufour_ok.getinstanceDufour(), Meet_Dufour_ok.getinstanceDufour(),k.vec2(390,250),120, 20,k.vec2(815,195),50 , 20, "proof1_Dufour", "proof2_Dufour")
                return; 
            }
            if (page === 5){
                k.destroyAll("proof")
                k.destroyAll("proof_color")
                k.destroyAll("texte_proof")
                k.destroyAll("cross")
                k.destroyAll("ligne")
                createProof(k,5, Carnetname, Vuilloud_ok.getinstanceVuilloud(), SeenJournal.getInstanceJournal(),k.vec2(400,260),120, 20,k.vec2(780, 200),50 , 20, "proof1_Vuilloud", "proof2_Vuilloud")
                return; 
            }
            if (page === 6){
                k.destroyAll("proof")
                k.destroyAll("proof_color")
                k.destroyAll("texte_proof")
                k.destroyAll("cross")
                k.destroyAll("ligne")
                createProof(k,6, Carnetname, Torrent_ok.getinstanceTorrent(), Meet_Torrent_ok.getinstanceTorrent(), k.vec2(460,410),120, 30,k.vec2(305,435),225 , 55, "proof1_Torrent", "proof2_Torrent")
                return; 
            }
            if (page === 7){
                k.destroyAll("proof")
                k.destroyAll("proof_color")
                k.destroyAll("texte_proof")
                k.destroyAll("cross")
                k.destroyAll("ligne")
                k.destroyAll("InstructionVerso")
                k.destroyAll("InstructionRecto")
                k.destroyAll("Verso_Guillot_id")
                k.destroyAll("Verso_Dufay_id")
                createProof(k,7, Carnetname, Robriquet_ok.getinstanceRobriquet(), Meet_Robriquet_ok.getinstanceRobriquet(),k.vec2(300,270),270, 80,k.vec2(805,195),160 , 20, "proof1_Robriquet", "proof2_Robriquet")
                return; 
            }
            if (page === 8){
                k.destroyAll("proof")
                k.destroyAll("proof_color")
                k.destroyAll("texte_proof")
                k.destroyAll("cross")
                k.destroyAll("ligne")
                k.destroyAll("InstructionVerso")
                k.destroyAll("InstructionRecto")
                k.destroyAll("Verso_Guillot_id")
                k.destroyAll("Verso_Dufay_id")
                createProof(k,8, Carnetname, Guillot_ok.getinstanceGuillot(), Meet_Guillot_ok.getinstanceGuillot(),k.vec2(320,185),260, 80,k.vec2(650,425),135 , 20, "proof1_Guillot", "proof2_Guillot")
                return; 
            }
            if (page === 9){
                k.destroyAll("proof")
                k.destroyAll("proof_color")
                k.destroyAll("texte_proof")
                k.destroyAll("cross")
                k.destroyAll("ligne")
                k.destroyAll("InstructionVerso")
                k.destroyAll("InstructionRecto")
                k.destroyAll("Verso_Guillot_id")
                k.destroyAll("Verso_Dufay_id")
                createProof(k,9, Carnetname, DuFay_ok.getinstanceDuFay(), Meet_DuFay_ok.getinstanceDuFay(),k.vec2(300,450),290, 20,k.vec2(300,470),290 , 20, "proof1_DuFay", "proof2_DuFay")
                return; 
            }
            if (page === 10){
                k.destroyAll("proof")
                k.destroyAll("proof_color")
                k.destroyAll("texte_proof")
                k.destroyAll("cross")
                k.destroyAll("ligne")
                k.destroyAll("InstructionVerso")
                k.destroyAll("InstructionRecto")
                k.destroyAll("Verso_Guillot_id")
                k.destroyAll("Verso_Dufay_id")
                createProof(k,10, Carnetname, Bellet_ok.getinstanceBellet(), Meet_Bellet_ok.getinstanceBellet(),k.vec2(300,305),220, 20,k.vec2(300,325),200 , 25, "proof1_Bellet", "proof2_Bellet")
                return; 
            }
        }
        if(["right","d"].includes(key)){
            page += 1
            if (page > 10) page = 10
            if (page == 0){
                k.destroyAll("proof")
                k.destroyAll("proof_color")
                k.destroyAll("texte_proof")
                k.destroyAll("cross")
                k.destroyAll("ligne")
                Carnet(k)
                SetSprite(k,Carnetname, Assets_carnet[0][1])
                return;
            }
            if (page === 1){
                k.destroyAll("proof")
                k.destroyAll("proof_color")
                k.destroyAll("texte_proof")
                k.destroyAll("cross")
                k.destroyAll("ligne")
                createProof(k,1, Carnetname, Pottier_ok.getinstancePottier(), Meet_Pottier_ok.getinstancePottier(),k.vec2(305,445),285, 25,k.vec2(305,470),285, 50, "proof1_Pottier", "proof2_Pottier")
                return;
            }
            if (page === 2){
                k.destroyAll("proof")
                k.destroyAll("proof_color")
                k.destroyAll("texte_proof")
                k.destroyAll("cross")
                k.destroyAll("ligne")
                if(!TutoDone.getInstanceTuto() && !SeenJournal.getInstanceJournal()){ 
                    Tutodoing.setInstanceTuto2(true)
                    createProof(k,2, Carnetname, Beck_ok.getinstanceBeck(), SeenJournal.getInstanceJournal(),k.vec2(390,250),120, 20,k.vec2(650,225),50 , 20, "proof1_Beck", "proof2_Beck")   
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
                    return;
                }
                if(!TutoDone.getInstanceTuto() && SeenJournal.getInstanceJournal()){
                    Tutodoing.setInstanceTuto2(true)
                    createProof(k,2, Carnetname, Beck_ok.getinstanceBeck(), SeenJournal.getInstanceJournal(),k.vec2(390,250),120, 20,k.vec2(650,225),50 , 20, "proof1_Beck", "proof2_Beck")
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
                    return;    
                }    
                if(TutoDone.getInstanceTuto()){
                    createProof(k,2, Carnetname, Beck_ok.getinstanceBeck(), SeenJournal.getInstanceJournal(),k.vec2(390,250),120, 20,k.vec2(650,225),50 , 20, "proof1_Beck", "proof2_Beck")
                    return;
                }
            }
            if (page === 3){
                k.destroyAll("proof")
                k.destroyAll("proof_color")
                k.destroyAll("texte_proof")
                k.destroyAll("cross")
                k.destroyAll("ligne")
                createProof(k,3, Carnetname, Rivaz_ok.getinstanceRivaz(), Meet_Rivaz_ok.getinstanceRivaz(),k.vec2(410,155),185, 255,k.vec2(295,320),195 , 245, "proof1_Rivaz", "proof2_Rivaz")
                return; 
            }
            if (page === 4){
                k.destroyAll("proof")
                k.destroyAll("proof_color")
                k.destroyAll("texte_proof")
                k.destroyAll("cross")
                k.destroyAll("ligne")
                createProof(k,4, Carnetname, Dufour_ok.getinstanceDufour(), Meet_Dufour_ok.getinstanceDufour(),k.vec2(390,250),120, 20,k.vec2(815,195),50 , 20, "proof1_Dufour", "proof2_Dufour")
                return; 
            }
            if (page === 5){
                k.destroyAll("proof")
                k.destroyAll("proof_color")
                k.destroyAll("texte_proof")
                k.destroyAll("cross")
                k.destroyAll("ligne")
                createProof(k,5, Carnetname, Vuilloud_ok.getinstanceVuilloud(), SeenJournal.getInstanceJournal(),k.vec2(400,260),120, 20,k.vec2(780, 200),50 , 20, "proof1_Vuilloud", "proof2_Vuilloud")
                return; 
            }
            if (page === 6){
                k.destroyAll("proof")
                k.destroyAll("proof_color")
                k.destroyAll("texte_proof")
                k.destroyAll("cross")
                k.destroyAll("ligne")
                createProof(k,6, Carnetname, Torrent_ok.getinstanceTorrent(), Meet_Torrent_ok.getinstanceTorrent(),k.vec2(460,410),120, 30,k.vec2(305,435),225 , 55, "proof1_Torrent", "proof2_Torrent")
                return; 
            }
            if (page === 7){
                k.destroyAll("proof")
                k.destroyAll("proof_color")
                k.destroyAll("texte_proof")
                k.destroyAll("cross")
                k.destroyAll("InstructionVerso")
                k.destroyAll("InstructionRecto")
                k.destroyAll("Verso_Guillot_id")
                k.destroyAll("Verso_Dufay_id")
                createProof(k,7, Carnetname, Robriquet_ok.getinstanceRobriquet(), Meet_Robriquet_ok.getinstanceRobriquet(),k.vec2(300,270),270, 80,k.vec2(805,195),160 , 20, "proof1_Robriquet", "proof2_Robriquet")
                return; 
            }
            if (page === 8){
                k.destroyAll("proof")
                k.destroyAll("proof_color")
                k.destroyAll("texte_proof")
                k.destroyAll("cross")
                k.destroyAll("ligne")
                k.destroyAll("InstructionVerso")
                k.destroyAll("InstructionRecto")
                k.destroyAll("Verso_Guillot_id")
                k.destroyAll("Verso_Dufay_id")
                createProof(k,8, Carnetname, Guillot_ok.getinstanceGuillot(), Meet_Guillot_ok.getinstanceGuillot(),k.vec2(320,185),260, 80,k.vec2(650,425),135 , 20, "proof1_Guillot", "proof2_Guillot")
                return; 
            }
            if (page === 9){
                k.destroyAll("proof")
                k.destroyAll("proof_color")
                k.destroyAll("texte_proof")
                k.destroyAll("cross")
                k.destroyAll("ligne")
                k.destroyAll("InstructionVerso")
                k.destroyAll("InstructionRecto")
                k.destroyAll("Verso_Guillot_id")
                k.destroyAll("Verso_Dufay_id")
                createProof(k,9, Carnetname, DuFay_ok.getinstanceDuFay(), Meet_DuFay_ok.getinstanceDuFay(),k.vec2(300,450),290, 20,k.vec2(300,470),290 , 20, "proof1_DuFay", "proof2_DuFay")
                return; 
            }
            if (page === 10){
                k.destroyAll("proof")
                k.destroyAll("proof_color")
                k.destroyAll("texte_proof")
                k.destroyAll("cross")
                k.destroyAll("ligne")
                k.destroyAll("InstructionVerso")
                k.destroyAll("InstructionRecto")
                k.destroyAll("Verso_Guillot_id")
                k.destroyAll("Verso_Dufay_id")
                createProof(k,10, Carnetname, Bellet_ok.getinstanceBellet(), Meet_Bellet_ok.getinstanceBellet(),k.vec2(300,305),220, 20,k.vec2(300,325),200 , 25, "proof1_Bellet", "proof2_Bellet")
                return; 
            }
        }
}

// fonction qui permet, au sein du carnet, de lire le recto et le verso des documents papier
export function RectoVersoLecture(k){
    DestroyInstruction(k,"InstructionVerso")
    if(page == 8 && Meet_Guillot_ok.getinstanceGuillot()){
        if(showrecto_Guillot){
            showrecto_Guillot = false
            ShowObject(k,"InstructionVerso", "Verso_Guillot", k.vec2(289,126), "Verso_Guillot_id")
            Instruction(k,170,60,k.vec2(50,200),"InstructionRecto","Appuie sur e pour lire le recto du document" )
            return;
        }
        if(!showrecto_Guillot){
            showrecto_Guillot = true
            DestroyInstruction(k,"InstructionRecto")
            k.destroyAll("proof_color")
            k.destroyAll("Verso_Guillot_id")
            Instruction(k,170,60,k.vec2(50,200),"InstructionVerso","Appuie sur e pour lire le verso du document" )
            return;
        }
    }
    if(page == 9 && Meet_DuFay_ok.getinstanceDuFay()){
        if(showrecto_Dufay){
            showrecto_Dufay = false
            ShowObject(k,"InstructionVerso", "Verso_Dufay", k.vec2(270,121), "Verso_Dufay_id")
            Instruction(k,170,60,k.vec2(50,200),"InstructionRecto","Appuie sur e pour lire le recto du document" )
            return;
        }
        if(!showrecto_Dufay){
            showrecto_Dufay = true
            DestroyInstruction(k,"InstructionRecto")
            k.destroyAll("proof_color")
            k.destroyAll("Verso_Dufay_id")
            Instruction(k,170,60,k.vec2(50,200),"InstructionVerso","Appuie sur e pour lire le verso du document" )
            return;
        }
    }
}
// fonction qui check pour lancer la fin du jeu
export function checkfin (){
    if(Pottier_ok.getinstancePottier() && Beck_ok.getinstanceBeck() && Rivaz_ok.getinstanceRivaz() && Vuilloud_ok.getinstanceVuilloud()&& Torrent_ok.getinstanceTorrent() && Robriquet_ok.getinstanceRobriquet() && Guillot_ok.getinstanceGuillot() && DuFay_ok.getinstanceDuFay() &&Bellet_ok.getinstanceBellet()){
        Dufour_ok.setinstanceDufour(true)
    }
}


