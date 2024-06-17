// Functions permettant de faire fonctionner le carnet

import { gameState, Meet_Torrent_ok, Torrent_ok, Beck_ok,SeenJournal } from "../state/stateManagers.js";
import { NeedLecture, Tutodoing, TutoDone, Pottier_ok, Meet_Pottier_ok, Meet_Rivaz_ok, Rivaz_ok, Dufour_ok, Meet_Dufour_ok, Vuilloud_ok, Robriquet_ok, Meet_Robriquet_ok, Guillot_ok, Meet_Guillot_ok, DuFay_ok, Meet_DuFay_ok, Bellet_ok, Meet_Bellet_ok} from "../state/stateManagers.js";
import { SetSprite, ShowObject, Instruction,  DestroyInstruction, DestroyShowObject, ShowKey} from "../utils.js";
import { Assets_carnet, Verso_DuFay_Show, Verso_Guillot_Show,  Beck_proof2_y, Beck_proof1_width, Beck_proof2_x,Vuilloud_proof2_y,Vuilloud_proof2_x, Dufay_proof_y, Dufay_proof_x, Dufay_red, Robriquet_x, Robriquet_y, Robriquet_width, Robriquet_height, Guillot_x} from "../scenes/menu.js"
import { Textes_Carnet } from "../content/Instruction_texte.js"

let page = 0
let proof1_Beck = false 
let proof2_Beck = false  
let proof1_Vuilloud = false 
let proof2_Vuilloud = false 
let proof1_Rivaz = false 
let proof2_Rivaz = false
let showrecto_Guillot = true
let showrecto_Dufay = true
const Textes = Textes_Carnet.french_carnet
let BeckXLecture = 370
let VuilloudXLecture = 380


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

// affiche le carnet et tient à jour l'index avec des croix
export function Carnet(k){
    let x_entree_default = 182
    let y_multi_default =  39.5
    let adapt_cross_x = 0
    let adapt_cross_y = 0
    let adapt_cross_multi = 39.5
    if(NeedLecture.getLecture()){
        x_entree_default = 195
        y_multi_default = 36
        adapt_cross_x = 35
        adapt_cross_y =10
        adapt_cross_multi = 37

    }

    const page_ouvert= k.play("book", {
        volume: 0.2,
    })
    gameState.setFreezePlayer(true)
    page = 0
    for (let i = 1; i < Assets_carnet.length; i++) {
        const Entry= k.add([  
            k.area({shape: new k.Rect(k.vec2(300,x_entree_default+(i-1)*y_multi_default), Assets_carnet[i][3], 20,)}),
            "entree",
            Assets_carnet[i][0],
        ])

    if(Pottier_ok.getinstancePottier()) {const cross = k.add([k.sprite("cross"), k.pos(300+210+adapt_cross_x, adapt_cross_y+182+(2-1)*adapt_cross_multi),"cross" ])}
    if(Beck_ok.getinstanceBeck()) {const cross = k.add([k.sprite("cross"), k.pos(300+155+adapt_cross_x, adapt_cross_y+182+(1-1)*adapt_cross_multi),"cross" ])}
    if(Rivaz_ok.getinstanceRivaz()) {const cross = k.add([k.sprite("cross"), k.pos(300+275+adapt_cross_x, adapt_cross_y+186+(3-1)*adapt_cross_multi),"cross" ])}
    if(Vuilloud_ok.getinstanceVuilloud()) {const cross = k.add([k.sprite("cross"), k.pos(300+165+adapt_cross_x, adapt_cross_y+182+(5-1)*adapt_cross_multi),"cross" ])}
    if(Torrent_ok.getinstanceTorrent()) {const cross = k.add([k.sprite("cross"), k.pos(300+155+adapt_cross_x, adapt_cross_y+182+(6-1)*adapt_cross_multi),"cross" ])}
    if(Robriquet_ok.getinstanceRobriquet()){const cross = k.add([k.sprite("cross"), k.pos(300+175+adapt_cross_x, adapt_cross_y+ 182+(7-1)*adapt_cross_multi),"cross" ])}
    if(Guillot_ok.getinstanceGuillot()){const cross = k.add([k.sprite("cross"), k.pos(300+155+adapt_cross_x, adapt_cross_y+182+(8-1)*adapt_cross_multi),"cross" ])}
    if(DuFay_ok.getinstanceDuFay()){const cross = k.add([k.sprite("cross"), k.pos(300+210+adapt_cross_x, adapt_cross_y+182+(9-1)*adapt_cross_multi),"cross" ])}
    if(Bellet_ok.getinstanceBellet()) {const cross = k.add([k.sprite("cross"), k.pos(300+215+adapt_cross_x, adapt_cross_y+182+(10-1)*adapt_cross_multi),"cross" ])}
    }
}

// Souligne les noms et prénoms dans l'index
export function Souligner (k, id){
    let x_ligne_default = 202
    let y_ligne_default =  39.5
    if(NeedLecture.getLecture()){
        x_ligne_default = 215
        y_ligne_default = 36
    }
    for (let i = 1; i < Assets_carnet.length; i++) {
        if (id == Assets_carnet[i][0]){
            const ligne = k.add([k.sprite(Assets_carnet[i][5]), k.pos(300, x_ligne_default+(i-1)*y_ligne_default), "ligne"])
            return;
        }
    }
}

//Adapte chaque page du carnet en fonction de l'avancé de l'enquête en 3 étapes. fonction utilisée pour tourner les pages et avec le click dans l'index
export function createProof(k,nbr,Carnetname,ManagementInfo2 , ManagementInfo1,pos1, widthProof1, heightProof1,pos2, widthProof2, heightProof2,id_proof1,id_proof2){
    
    k.destroyAll("InstructionCarnetDroite")
    k.destroyAll("InstructionCarnetGauche")
    ShowKey (k, "fleche_droite",  "fleche_droite-down", 1050, 400, 289, 359, 1, 0.3,"InstructionCarnetDroite")
    ShowKey (k, "fleche_gauche",  "fleche_gauche-down", 150, 400, 289, 359, 1, 0.3,"InstructionCarnetGauche")

    if(id_proof1 !== "proof1_Beck"){
        k.onHover(id_proof1,() => {k.setCursor("pointer")})
        k.onHoverEnd(id_proof1,() => {k.setCursor("auto")})

        k.onHover(id_proof2,() => {k.setCursor("pointer")})
        k.onHoverEnd(id_proof2,() => {k.setCursor("auto")})
    }

    if(!ManagementInfo2){
    page = nbr
    let Flag = ManagementInfo1 ? 2 :1
    SetSprite(k,Carnetname, Assets_carnet[nbr][Flag])
    k.destroyAll("ligne")
    k.destroyAll("entree")
    k.destroyAll("cross")
    k.destroyAll("clignoterBeck")
    if (page==10){k.destroyAll("InstructionCarnetDroite")}

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
        k.add([k.rect(Beck_proof1_width,20), k.pos(370,250),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        return;
    } 
    if(proof2_Beck && page == 2){
        k.add([k.rect(50,20), k.pos(Beck_proof2_x,Beck_proof2_y),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        return;
    } 
    if(proof1_Vuilloud  && page == 5){
        k.add([k.rect(Beck_proof1_width,20), k.pos(370,260),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        return;
    } 
    if(proof2_Vuilloud  && page == 5){
        k.add([k.rect(42,20), k.pos(Vuilloud_proof2_x, Vuilloud_proof2_y),k.color(194,15,15),k.opacity(0.7),"proof_color"])
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
        ShowKey (k, "e","e-down", 540, 515, 225, 240, 1, 0.15,"InstructionEExit")
        return;
    }
    if(page == 9 ){
        ShowKey (k, "e","e-down", 570, 545, 225, 240, 1, 0.15,"InstructionEExit")
        return;
    }

    return;
    }
    if(ManagementInfo2){
    page = nbr
    if(page == 8){
        ShowKey (k, "e","e-down", 540, 515, 225, 240, 1, 0.15,"InstructionEExit")
    }
    if(page == 9 ){
        ShowKey (k, "e","e-down", 570, 545, 225, 240, 1, 0.15,"InstructionEExit")
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
    if(NeedLecture.getLecture()){
        BeckXLecture = 385
        VuilloudXLecture = 395
    }
    if(id === "proof1_Beck"){
        k.add([k.rect(Beck_proof1_width,20), k.pos(BeckXLecture,250),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        proof1_Beck = true
        k.destroyAll("proof1_Beck")
        k.setCursor("auto")
        if (!proof2_Beck)return;
        AllProofsfound(k,Textes[1][0],320, k.vec2(300,550),id_text)
        ShowKey (k, "fleche_droite",  "fleche_droite-down", 1050, 400, 289, 359, 1, 0.3,"InstructionCarnetDroite")
        Beck_ok.setinstanceBeck(true)
        TutoDone.setInstanceTuto(true)
        return;

    } 
    if ( id === "proof2_Beck" ){
        k.add([k.rect(50,20), k.pos(Beck_proof2_x,Beck_proof2_y),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        proof2_Beck = true
        k.destroyAll("proof2_Beck")
        k.setCursor("auto")
        if (!proof1_Beck)return;
        AllProofsfound(k,Textes[1][0], 320,k.vec2(300,550),id_text)
        ShowKey (k, "fleche_droite",  "fleche_droite-down", 1050, 400, 289, 359, 1, 0.3,"InstructionCarnetDroite")
        Beck_ok.setinstanceBeck(true)
        TutoDone.setInstanceTuto(true)
        return;
    }
    if(id === "proof1_Vuilloud"){
        k.add([k.rect(Beck_proof1_width,20), k.pos(VuilloudXLecture,260),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        proof1_Vuilloud = true
        k.destroyAll("proof1_Vuilloud")
        k.setCursor("auto")
        if (!proof2_Vuilloud)return;
        AllProofsfound(k,Textes[2][0], 320, k.vec2(300,555),id_text)
        Vuilloud_ok.setinstanceVuilloud(true)
        return;

    } 
    if ( id === "proof2_Vuilloud" ){
        k.add([k.rect(42,20), k.pos(Vuilloud_proof2_x, Vuilloud_proof2_y),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        proof2_Vuilloud = true
        k.destroyAll("proof2_Vuilloud")
        k.setCursor("auto")
        if (!proof1_Vuilloud)return;
        AllProofsfound(k,Textes[2][0], 320, k.vec2(300,555),id_text)
        Vuilloud_ok.setinstanceVuilloud(true)
        return;
    }
    if(id === "proof1_Torrent" ||  id === "proof2_Torrent"){
        k.add([k.rect(120,25), k.pos(473,410),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        k.add([k.rect(225,55), k.pos(305, 435),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        k.destroyAll("proof1_Torrent")
        k.destroyAll("proof2_Torrent")
        k.setCursor("auto")
        AllProofsfound(k,Textes[3][0], 300,k.vec2(305,500),id_text)
        Torrent_ok.setinstanceTorrent(true)
        return;
    }   
    if(id === "proof1_Rivaz"){
        k.add([k.rect(185,255), k.pos(410,155),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        proof1_Rivaz = true
        k.destroyAll("proof1_Rivaz")
        k.setCursor("auto")
        if (!proof2_Rivaz)return;
        AllProofsfound(k,Textes[4][0], 120,k.vec2(295,155),id_text)
        Rivaz_ok.setinstanceRivaz(true)
        return;

    } 
    if ( id === "proof2_Rivaz" ){
        k.add([k.rect(195,245), k.pos(295, 320),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        proof2_Rivaz = true
        k.destroyAll("proof2_Rivaz")
        k.setCursor("auto")
        if (!proof1_Rivaz)return;
        AllProofsfound(k,Textes[4][0], 120,k.vec2(295,155),id_text)
        Rivaz_ok.setinstanceRivaz(true)
        return;
    }
    if(id === "proof1_Guillot" && !showrecto_Guillot){
        k.add([k.rect(260,80), k.pos(320,185),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        k.destroyAll("proof1_Guillot")
        k.destroyAll("proof2_Guillot")
        k.setCursor("auto")
        if(NeedLecture.getLecture()){AllProofsfound(k,Textes[5][0], 300,k.vec2(655,535),id_text)}
        if(!NeedLecture.getLecture()){AllProofsfound(k,Textes[5][0], 300,k.vec2(660,525),id_text)}
        Guillot_ok.setinstanceGuillot(true)
        return;
    }
    if ( id === "proof2_Guillot" ){
        k.add([k.rect(135,20), k.pos(Guillot_x,425),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        k.destroyAll("proof2_Guillot")
        k.destroyAll("proof1_Guillot")
        k.setCursor("auto")
        if(NeedLecture.getLecture()){AllProofsfound(k,Textes[5][0], 300,k.vec2(655,535),id_text)}
        if(!NeedLecture.getLecture()){AllProofsfound(k,Textes[5][0], 300,k.vec2(660,525),id_text)}
        Guillot_ok.setinstanceGuillot(true)
        return;
    }    
    if(id === "proof1_DuFay" ||  id === "proof2_DuFay"){
        if(showrecto_Dufay)return;
        k.add([k.rect(290,20), k.pos(Dufay_proof_x,Dufay_proof_y),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        k.add([k.rect(Dufay_red,20), k.pos(Dufay_proof_x,Dufay_proof_y +20),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        k.destroyAll("proof1_DuFay")
        k.destroyAll("proof2_DuFay")
        k.setCursor("auto")
        if(NeedLecture.getLecture()){AllProofsfound(k,Textes[6][0], 320,k.vec2(300,520),id_text)}
        if(!NeedLecture.getLecture()){AllProofsfound(k,Textes[6][0], 320,k.vec2(660,525),id_text)}
        DuFay_ok.setinstanceDuFay(true)
        return;
    }
    if(id === "proof1_Pottier" ||  id === "proof2_Pottier"){
        k.add([k.rect(285,25), k.pos(305,445),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        k.add([k.rect(285,50), k.pos(305,470),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        k.destroyAll("proof1_Pottier")
        k.destroyAll("proof2_Pottier")
        k.setCursor("auto")
        AllProofsfound(k,Textes[3][0], 300,k.vec2(305,530),id_text)
        Pottier_ok.setinstancePottier(true)
        return;
    }
    if(id === "proof1_Bellet" ||  id === "proof2_Bellet"){
        k.add([k.rect(220,20), k.pos(300,305),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        k.add([k.rect(200,25), k.pos(300,325),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        k.destroyAll("proof1_Bellet")
        k.destroyAll("proof2_Bellet")
        k.setCursor("auto")
        AllProofsfound(k,Textes[3][0], 300,k.vec2(305,450),id_text)
        Bellet_ok.setinstanceBellet(true)
        return; 
    }
    if(id === "proof1_Robriquet"){
        k.add([k.rect(270,80), k.pos(300,270),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        k.destroyAll("proof1_Robriquet")
        k.destroyAll("proof2_Robriquet")
        k.setCursor("auto")
        AllProofsfound(k,Textes[3][0], 300,k.vec2(305,380),id_text)
        Robriquet_ok.setinstanceRobriquet(true)
        return;
    }
    if ( id === "proof2_Robriquet" ){ 
        if(NeedLecture.getLecture()){
            k.add([k.rect(110,20), k.pos(860,Robriquet_y),k.color(194,15,15),k.opacity(0.7),"proof_color"])
            k.add([k.rect(45,20), k.pos(658,Robriquet_y+20),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        }
        if(!NeedLecture.getLecture()){
            k.add([k.rect(160,20), k.pos(805,195),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        }
        k.destroyAll("proof2_Robriquet")
        k.destroyAll("proof1_Robriquet")
        k.setCursor("auto")
        AllProofsfound(k,Textes[3][0], 300,k.vec2(305,380),id_text)
        Robriquet_ok.setinstanceRobriquet(true)
        return;
    } 
}

// fonction qui permet de tourner les pages  
export function setTournerPage(k, key, Carnetname){
    if(NeedLecture.getLecture()){
        BeckXLecture = 385
        VuilloudXLecture = 395
    }
    k.setCursor("auto")
        if (!gameState.getFreezePlayer()) return; 
        if (["left","a"].includes(key)){   
            if (!TutoDone.getInstanceTuto()){
                page = 0
            }
            if (TutoDone.getInstanceTuto()){
                page -= 1
            }
            console.log(page)
            if (page < 0) page = 0
            if (page == 0){
                k.destroyAll("InstructionCarnetDroite")
                k.destroyAll("proof")
                k.destroyAll("proof_color")
                k.destroyAll("texte_proof")
                k.destroyAll("cross")
                k.destroyAll("ligne")
                k.destroyAll("InstructionCarnetGauche")
                Carnet(k)
                if (TutoDone.getInstanceTuto()){SetSprite(k,Carnetname, Assets_carnet[0][2])}else{SetSprite(k,Carnetname, Assets_carnet[0][1])}
                ShowKey (k, "fleche_droite",  "fleche_droite-down", 1050, 400, 289, 359, 1, 0.3,"InstructionCarnetDroite")
                if(Tutodoing.getInstanceTuto2()){ k.destroyAll("InstructionTutoCarnet"); Tutodoing.setInstanceTuto2(false);}
                return;
            }
            if (page === 1){
                k.destroyAll("proof")
                k.destroyAll("proof_color")
                k.destroyAll("texte_proof")
                k.destroyAll("cross")
                k.destroyAll("ligne")
                createProof(k,1, Carnetname, Pottier_ok.getinstancePottier(), Meet_Pottier_ok.getinstancePottier(),k.vec2(305,445),285, 25,k.vec2(305,470),285, 50, "proof1_Pottier", "proof2_Pottier")
                let FontSize = 35
                let fontSize2 = 30
                let adaptlecture =0
                if(!TutoDone.getInstanceTuto() && !SeenJournal.getInstanceJournal()){ 
                    Tutodoing.setInstanceTuto2(true)
                    createProof(k,1, Carnetname, Beck_ok.getinstanceBeck(), SeenJournal.getInstanceJournal(),k.vec2(BeckXLecture,250),Beck_proof1_width, 20,k.vec2(Beck_proof2_x,Beck_proof2_y),50 , 20, "proof1_Beck", "proof2_Beck")   
                    if(NeedLecture.getLecture()){FontSize = 30, adaptlecture = 20}
                    const InstructionBoxtuto = k.add([k.rect(500, 350+adaptlecture), k.pos(375,200), k.outline(4), k.opacity(0.7),k.offscreen(),"InstructionTutoCarnet"]) 
                    const textInstructionBoxtuto = InstructionBoxtuto.add([
                        k.text(Textes[7], 
                        {   font: "NiceFont",
                            width : 490,
                            size : FontSize,
                            lineSpacing : 10,
                        }), 
                        k.color(27,29,52),
                        k.pos(10,10), // par rappor à dialogbox  
                        k.opacity(0.7)
                    ]);
                    const textInstructionBoxOut = InstructionBoxtuto.add([
                        k.text(Textes[8], 
                        {   font: "NiceFont",
                            width : 490,
                            size : FontSize,
                            lineSpacing : 10,
                        }), 
                        k.color(27,29,52),
                        k.pos(300-adaptlecture*3,313+adaptlecture), // par rappor à dialogbox  
                        k.opacity(0.5)
                    ]);
                    return;
                }
                if(!TutoDone.getInstanceTuto() && SeenJournal.getInstanceJournal()){
                    Tutodoing.setInstanceTuto2(true)
                    createProof(k,1, Carnetname, Beck_ok.getinstanceBeck(), SeenJournal.getInstanceJournal(),k.vec2(BeckXLecture,250),Beck_proof1_width, 20,k.vec2(Beck_proof2_x,Beck_proof2_y),50 , 20, "proof1_Beck", "proof2_Beck")
                    if(NeedLecture.getLecture()){adaptlecture = 20, fontSize2=23.5}
                    const InstructionBoxtuto = k.add([k.rect(665, 530), k.pos(300,100), k.outline(4), k.opacity(0.9),k.offscreen(),"InstructionTutoCarnet"]) 
                    const textInstructionBoxtuto = InstructionBoxtuto.add([
                        k.text(Textes[9], 
                        {   font: "NiceFont",
                            width : 660,
                            size : fontSize2,
                            lineSpacing : 7,
                        }), 
                        k.color(27,29,52),
                        k.pos(10,10), // par rappor à dialogbox  
                        k.opacity(0.7)
                    ]);
                    const textInstructionBoxOut = InstructionBoxtuto.add([
                        k.text(Textes[8], 
                        {   font: "NiceFont",
                            width : 490,
                            size : fontSize2,
                            lineSpacing : 10,
                        }), 
                        k.color(27,29,52),
                        k.pos(490-adaptlecture*1.5,490+adaptlecture/2), // par rappor à dialogbox  
                        k.opacity(0.5)
                    ]);
                    return;
                    
                }    
                if(TutoDone.getInstanceTuto()){
                    createProof(k,1, Carnetname, Beck_ok.getinstanceBeck(), SeenJournal.getInstanceJournal(),k.vec2(BeckXLecture,250),Beck_proof1_width, 20,k.vec2(Beck_proof2_x,Beck_proof2_y),50 , 20, "proof1_Beck", "proof2_Beck")
                    return;
                }
                return;
            }
            if (page === 2){
                k.destroyAll("proof")
                k.destroyAll("proof_color")
                k.destroyAll("texte_proof")
                k.destroyAll("cross")
                k.destroyAll("ligne")
                createProof(k,2, Carnetname, Pottier_ok.getinstancePottier(), Meet_Pottier_ok.getinstancePottier(),k.vec2(305,445),285, 25,k.vec2(305,470),285, 50, "proof1_Pottier", "proof2_Pottier")    
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
                createProof(k,5, Carnetname, Vuilloud_ok.getinstanceVuilloud(), SeenJournal.getInstanceJournal(),k.vec2(VuilloudXLecture,260),Beck_proof1_width, 20,k.vec2(Vuilloud_proof2_x, Vuilloud_proof2_y),50 , 20, "proof1_Vuilloud", "proof2_Vuilloud")
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
                k.destroyAll("InstructionEExit")
                createProof(k,7, Carnetname, Robriquet_ok.getinstanceRobriquet(), Meet_Robriquet_ok.getinstanceRobriquet(),k.vec2(300,270),270, 80,k.vec2(Robriquet_x,Robriquet_y),Robriquet_width , Robriquet_height, "proof1_Robriquet", "proof2_Robriquet")
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
                k.destroyAll("InstructionEExit")
                createProof(k,8, Carnetname, Guillot_ok.getinstanceGuillot(), Meet_Guillot_ok.getinstanceGuillot(),k.vec2(320,185),260, 80,k.vec2(Guillot_x,425),135 , 20, "proof1_Guillot", "proof2_Guillot")
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
                createProof(k,9, Carnetname, DuFay_ok.getinstanceDuFay(), Meet_DuFay_ok.getinstanceDuFay(),k.vec2(Dufay_proof_x,Dufay_proof_y),290, 20,k.vec2(Dufay_proof_x,Dufay_proof_y +20),290 , 20, "proof1_DuFay", "proof2_DuFay")
                k.destroyAll("InstructionCarnetDroite")
                ShowKey (k, "fleche_droite",  "fleche_droite-down", 1050, 400, 289, 359, 1, 0.3,"InstructionCarnetDroite")
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
            if (!TutoDone.getInstanceTuto()){
                page = 1
            }
            if (TutoDone.getInstanceTuto()){
                page += 1
            }
            console.log(page)
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
                k.destroyAll("InstructionTutoCarnet")
                k.destroyAll("proof")
                k.destroyAll("proof_color")
                k.destroyAll("texte_proof")
                k.destroyAll("cross")
                k.destroyAll("ligne")
                let FontSize = 35
                let fontSize2 = 30
                let adaptlecture =0
                if(!TutoDone.getInstanceTuto() && !SeenJournal.getInstanceJournal()){ 
                    Tutodoing.setInstanceTuto2(true)
                    createProof(k,1, Carnetname, Beck_ok.getinstanceBeck(), SeenJournal.getInstanceJournal(),k.vec2(BeckXLecture,250),Beck_proof1_width, 20,k.vec2(Beck_proof2_x,Beck_proof2_y),50 , 20, "proof1_Beck", "proof2_Beck")   
                    k.destroyAll("InstructionCarnetDroite")
                    if(NeedLecture.getLecture()){FontSize = 30, adaptlecture = 20}
                    const InstructionBoxtuto = k.add([k.rect(500, 350+adaptlecture), k.pos(375,200), k.outline(4), k.opacity(0.7),k.offscreen(),"InstructionTutoCarnet"]) 
                    const textInstructionBoxtuto = InstructionBoxtuto.add([
                        k.text(Textes[7], 
                        {   font: "NiceFont",
                            width : 490,
                            size : FontSize,
                            lineSpacing : 10,
                        }), 
                        k.color(27,29,52),
                        k.pos(10,10), // par rappor à dialogbox  
                        k.opacity(0.7)
                    ]);
                    const textInstructionBoxOut = InstructionBoxtuto.add([
                        k.text(Textes[8], 
                        {   font: "NiceFont",
                            width : 490,
                            size : FontSize,
                            lineSpacing : 10,
                        }), 
                        k.color(27,29,52),
                        k.pos(300-adaptlecture*3,313+adaptlecture), // par rappor à dialogbox  
                        k.opacity(0.5)
                    ]);
                    return;
                }
                if(!TutoDone.getInstanceTuto() && SeenJournal.getInstanceJournal()){
                    Tutodoing.setInstanceTuto2(true)
                    createProof(k,1, Carnetname, Beck_ok.getinstanceBeck(), SeenJournal.getInstanceJournal(),k.vec2(BeckXLecture,250),Beck_proof1_width, 20,k.vec2(Beck_proof2_x,Beck_proof2_y),50 , 20, "proof1_Beck", "proof2_Beck")
                    k.destroyAll("InstructionCarnetDroite")
                    if(NeedLecture.getLecture()){adaptlecture = 20, fontSize2=23.5}
                    const InstructionBoxtuto = k.add([k.rect(665, 530), k.pos(300,100), k.outline(4), k.opacity(0.9),k.offscreen(),"InstructionTutoCarnet"]) 
                    const textInstructionBoxtuto = InstructionBoxtuto.add([
                        k.text(Textes[9], 
                        {   font: "NiceFont",
                            width : 660,
                            size : fontSize2,
                            lineSpacing : 7,
                        }), 
                        k.color(27,29,52),
                        k.pos(10,10), // par rappor à dialogbox  
                        k.opacity(0.7)
                    ]);
                    const textInstructionBoxOut = InstructionBoxtuto.add([
                        k.text(Textes[8], 
                        {   font: "NiceFont",
                            width : 490,
                            size : fontSize2,
                            lineSpacing : 10,
                        }), 
                        k.color(27,29,52),
                        k.pos(490-adaptlecture*1.5,490+adaptlecture/2), // par rappor à dialogbox  
                        k.opacity(0.5)
                    ]);
                    return;    
                }    
                if(TutoDone.getInstanceTuto()){
                    createProof(k,1, Carnetname, Beck_ok.getinstanceBeck(), SeenJournal.getInstanceJournal(),k.vec2(BeckXLecture,250),Beck_proof1_width, 20,k.vec2(Beck_proof2_x,Beck_proof2_y),50 , 20, "proof1_Beck", "proof2_Beck")
                    return;
                }
                return;
            }
            if (page === 2){
                k.destroyAll("InstructionCarnetGauche")
                k.destroyAll("proof")
                k.destroyAll("proof_color")
                k.destroyAll("texte_proof")
                k.destroyAll("cross")
                k.destroyAll("ligne")
                k.destroyAll("InstructionTutoCarnet")
                createProof(k,2, Carnetname, Pottier_ok.getinstancePottier(), Meet_Pottier_ok.getinstancePottier(),k.vec2(305,445),285, 25,k.vec2(305,470),285, 50, "proof1_Pottier", "proof2_Pottier")
            }
            if (page === 3){
                k.destroyAll("proof")
                k.destroyAll("proof_color")
                k.destroyAll("texte_proof")
                k.destroyAll("cross")
                k.destroyAll("ligne")
                createProof(k,3, Carnetname, Rivaz_ok.getinstanceRivaz(), Meet_Rivaz_ok.getinstanceRivaz(),k.vec2(410,155),185, 255,k.vec2(295,320),195 , 245, "proof1_Rivaz", "proof2_Rivaz")
                if(Tutodoing.getInstanceTuto2()){ k.destroyAll("InstructionTutoCarnet"); Tutodoing.setInstanceTuto2(false)}
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
                createProof(k,5, Carnetname, Vuilloud_ok.getinstanceVuilloud(), SeenJournal.getInstanceJournal(),k.vec2(VuilloudXLecture,260),Beck_proof1_width, 20,k.vec2(Vuilloud_proof2_x, Vuilloud_proof2_y),50 , 20, "proof1_Vuilloud", "proof2_Vuilloud")
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
                createProof(k,7, Carnetname, Robriquet_ok.getinstanceRobriquet(), Meet_Robriquet_ok.getinstanceRobriquet(),k.vec2(300,270),270, 80,k.vec2(Robriquet_x,Robriquet_y),Robriquet_width , Robriquet_height, "proof1_Robriquet", "proof2_Robriquet")
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
                createProof(k,8, Carnetname, Guillot_ok.getinstanceGuillot(), Meet_Guillot_ok.getinstanceGuillot(),k.vec2(320,185),260, 80,k.vec2(Guillot_x,425),135 , 20, "proof1_Guillot", "proof2_Guillot")
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
                k.destroyAll("InstructionEExit")
                createProof(k,9, Carnetname, DuFay_ok.getinstanceDuFay(), Meet_DuFay_ok.getinstanceDuFay(),k.vec2(Dufay_proof_x,Dufay_proof_y),290, 20,k.vec2(Dufay_proof_x,Dufay_proof_y +20),290 , 20, "proof1_DuFay", "proof2_DuFay")
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
                k.destroyAll("InstructionEExit")
                createProof(k,10, Carnetname, Bellet_ok.getinstanceBellet(), Meet_Bellet_ok.getinstanceBellet(),k.vec2(300,305),220, 20,k.vec2(300,325),200 , 25, "proof1_Bellet", "proof2_Bellet")
                k.destroyAll("InstructionCarnetDroite")
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
            ShowObject(k,"InstructionVerso", Verso_Guillot_Show, k.vec2(289,126), "Verso_Guillot_id")
            k.destroyAll("InstructionEExit")
            ShowKey (k, "e","e-down", 540, 515, 225, 240, 1, 0.15,"InstructionEExit")
            return;
        }
        if(!showrecto_Guillot){
            showrecto_Guillot = true
            DestroyInstruction(k,"InstructionRecto")
            k.destroyAll("proof_color")
            k.destroyAll("Verso_Guillot_id")
            k.destroyAll("InstructionEExit")
            ShowKey (k, "e","e-down", 540, 515, 225, 240, 1, 0.15,"InstructionEExit")
            return;
        }
    }
    if(page == 9 && Meet_DuFay_ok.getinstanceDuFay()){
        if(showrecto_Dufay){
            showrecto_Dufay = false
            ShowObject(k,"InstructionVerso", Verso_DuFay_Show , k.vec2(270,121), "Verso_Dufay_id")
            k.destroyAll("InstructionEExit")
            ShowKey (k, "e","e-down", 570, 545, 225, 240, 1, 0.15,"InstructionEExit")
            return;
        }
        if(!showrecto_Dufay){
            showrecto_Dufay = true
            DestroyInstruction(k,"InstructionRecto")
            k.destroyAll("InstructionEExit")
            k.destroyAll("proof_color")
            k.destroyAll("Verso_Dufay_id")
            ShowKey (k, "e","e-down", 570, 545, 225, 240, 1, 0.15,"InstructionEExit")
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


