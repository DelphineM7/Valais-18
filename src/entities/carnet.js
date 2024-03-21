import { gameState, Meet_Torrent_ok, Torrent_ok, Beck_ok,SeenJournal } from "../state/stateManagers.js";
import { gameStatePont, HaveCarnet, Pottier_ok, Meet_Pottier_ok, Meet_Rivaz_ok, Rivaz_ok, Dufour_ok, Meet_Dufour_ok, Vuilloud_ok, Robriquet_ok, Meet_Robriquet_ok, Guillot_ok, Meet_Guillot_ok, DuFay_ok, Meet_DuFay_ok, Bellet_ok, Meet_Bellet_ok} from "../state/stateManagers.js";
import { SetSprite } from "../utils.js";

let page = 0
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

export function Carnet(k){
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

export function Souligner (k, id){
    for (let i = 1; i < Assets_carnet.length; i++) {
        if (id == Assets_carnet[i][0]){
            const ligne = k.add([k.sprite(Assets_carnet[i][5]), k.pos(300, 202+(i-1)*39.5), "ligne"])
            return;
        }
    }
}

export function createProof(k,nbr,Carnetname,ManagementInfo2 , ManagementInfo1,pos1, widthProof1, heightProof1,pos2, widthProof2, heightProof2,id_proof1,id_proof2){
    if(!ManagementInfo2){
    page = nbr
    console.log(page)
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
    return;
    }
    if(ManagementInfo2){
    SetSprite(k,Carnetname, Assets_carnet[nbr][4])
    k.destroyAll("ligne")
    k.destroyAll("entree")
    k.destroyAll("cross")

    return;
    }
}

async function AllProofsfound(k, content,longeur, pos, id_text){
    const TextProof = k.add([
        k.text("", {
            font: "Pristina",
            width : longeur,
            lineSpacing : 3,
            size : 21,
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
// ToDo : reinitialisé to false si les deux sont pas true ou conserver le marqueur rouge si true
let proof1_Beck = false 
let proof2_Beck = false 
let proof1_Vuilloud = false 
let proof2_Vuilloud = false 
let proof1_Rivaz = false 
let proof2_Rivaz = false
export function ToDoWithProof(k,id, id_text){
    if(id === "proof1_Beck"){
        k.add([k.rect(120,20), k.pos(390,250),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        proof1_Beck = true
        k.destroyAll("proof1_Beck")
        if (!proof2_Beck)return;
        AllProofsfound(k,"Alphonse Beck n'était pas encore né en 1815, ce n'est pas lui sur le tableau.",300, k.vec2(310,545),id_text)
        Beck_ok.setinstanceBeck(true)
        return;

    } 
    if ( id === "proof2_Beck" ){
        k.add([k.rect(50,20), k.pos(650,225),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        proof2_Beck = true
        k.destroyAll("proof2_Beck")
        if (!proof1_Beck)return;
        AllProofsfound(k,"Alphonse Beck n'était pas né en 1815, ce n'est pas lui sur le tableau.", 300,k.vec2(310,545),id_text)
        Beck_ok.setinstanceBeck(true)
        return;
    }
    if(id === "proof1_Vuilloud"){
        k.add([k.rect(120,20), k.pos(400,260),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        proof1_Vuilloud = true
        k.destroyAll("proof1_Vuilloud")
        if (!proof2_Vuilloud)return;
        AllProofsfound(k,"Emile Vuilloud n'était pas encore né en 1815, ce n'est pas lui sur le tableau.", 295, k.vec2(330,555),id_text)
        Vuilloud_ok.setinstanceVuilloud(true)
        return;

    } 
    if ( id === "proof2_Vuilloud" ){
        k.add([k.rect(40,20), k.pos(780, 200),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        proof2_Vuilloud = true
        k.destroyAll("proof2_Vuilloud")
        if (!proof1_Vuilloud)return;
        AllProofsfound(k,"Emile Vuilloud n'était pas né en 1815, ce n'est pas lui sur le tableau.", 295, k.vec2(330,555),id_text)
        Vuilloud_ok.setinstanceVuilloud(true)
        return;
    }
    if(id === "proof1_Torrent" ||  id === "proof2_Torrent"){
        k.add([k.rect(225,20), k.pos(375,400),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        k.add([k.rect(100,20), k.pos(305, 425),k.color(194,15,15),k.opacity(0.7),"proof_color"])
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
        AllProofsfound(k,"Charles Emmanuel de Rivaz ne ressemble pas à cet homme. Ce n'est pas lui que je cherche.", 100,k.vec2(300,155),id_text)
        Rivaz_ok.setinstanceRivaz(true)
        return;

    } 
    if ( id === "proof2_Rivaz" ){
        k.add([k.rect(195,245), k.pos(295, 320),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        proof2_Rivaz = true
        k.destroyAll("proof2_Rivaz")
        if (!proof1_Rivaz)return;
        AllProofsfound(k,"Charles Emmanuel de Rivaz ne ressemble pas à cet homme. Ce n'est pas lui que je cherche.", 100,k.vec2(300,155),id_text)
        Rivaz_ok.setinstanceRivaz(true)
        return;
    }
    if(id === "proof1_Guillot"){
        k.add([k.rect(250,13), k.pos(320,375),k.color(194,15,15),k.opacity(0.7),"proof_color"])
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
        k.add([k.rect(290,20), k.pos(300,550),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        k.add([k.rect(50,20), k.pos(300,570),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        k.destroyAll("proof1_DuFay")
        k.destroyAll("proof2_DuFay")
        AllProofsfound(k,"Je dois lui remettre le tableau en main propre. Ce n'est pas lui sur le tableau.", 320,k.vec2(660,525),id_text)
        DuFay_ok.setinstanceDuFay(true)
        return;
    }
    if(id === "proof1_Pottier" ||  id === "proof2_Pottier"){
        k.add([k.rect(250,25), k.pos(305,435),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        k.add([k.rect(250,25), k.pos(305,460),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        k.destroyAll("proof1_Pottier")
        k.destroyAll("proof2_Pottier")
        AllProofsfound(k,"Ce n'est pas la personne que je cherche.", 300,k.vec2(305,500),id_text)
        Pottier_ok.setinstancePottier(true)
        return;
    }
    if(id === "proof1_Bellet" ||  id === "proof2_Bellet"){
        k.add([k.rect(280,20), k.pos(300,285),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        k.add([k.rect(55,25), k.pos(300,305),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        k.destroyAll("proof1_Bellet")
        k.destroyAll("proof2_Bellet")
        AllProofsfound(k,"Ce n'est pas la personne que je cherche.", 300,k.vec2(305,400),id_text)
        Bellet_ok.setinstanceBellet(true)
        return;
    }
    if(id === "proof1_Robriquet"){
        k.add([k.rect(255,50), k.pos(300,250),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        k.destroyAll("proof1_Robriquet")
        k.destroyAll("proof2_Robriquet")
        AllProofsfound(k,"Ce n'est pas la personne que je cherche.", 300,k.vec2(305,350),id_text)
        Robriquet_ok.setinstanceRobriquet(true)
        return;
    }
    if ( id === "proof2_Robriquet" ){
        k.add([k.rect(150,20), k.pos(815,195),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        k.destroyAll("proof2_Robriquet")
        k.destroyAll("proof1_Robriquet")
        AllProofsfound(k,"Ce n'est pas la personne que je cherche.", 300,k.vec2(305,350),id_text)
        Robriquet_ok.setinstanceRobriquet(true)
        return;
    } 
}
 
export function setTournerPage(k, key, Carnetname){
        if (!gameState.getFreezePlayer()) return; 
        if (["left","a"].includes(key)){   
            page -= 1 
            console.log(page)
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
                createProof(k,1, Carnetname, Pottier_ok.getinstancePottier(), Meet_Pottier_ok.getinstancePottier(),k.vec2(305,435),250, 25,k.vec2(305,460),250 , 25, "proof1_Pottier", "proof2_Pottier")
                return;
            }
            if (page === 2){
                k.destroyAll("proof")
                k.destroyAll("proof_color")
                k.destroyAll("texte_proof")
                k.destroyAll("cross")
                k.destroyAll("ligne")
                createProof(k,2, Carnetname, Beck_ok.getinstanceBeck(), SeenJournal.getInstanceJournal(),k.vec2(390,250),120, 20,k.vec2(650,225),50 , 20, "proof1_Beck", "proof2_Beck")
                return; 
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
                createProof(k,6, Carnetname, Torrent_ok.getinstanceTorrent(), Meet_Torrent_ok.getinstanceTorrent(),k.vec2(375,400),225, 20,k.vec2(305,425),100 , 20, "proof1_Torrent", "proof2_Torrent")
                return; 
            }
            if (page === 7){
                k.destroyAll("proof")
                k.destroyAll("proof_color")
                k.destroyAll("texte_proof")
                k.destroyAll("cross")
                k.destroyAll("ligne")
                createProof(k,7, Carnetname, Robriquet_ok.getinstanceRobriquet(), Meet_Robriquet_ok.getinstanceRobriquet(),k.vec2(300,250),255, 50,k.vec2(815,195),150 , 20, "proof1_Robriquet", "proof2_Robriquet")
                return; 
            }
            if (page === 8){
                k.destroyAll("proof")
                k.destroyAll("proof_color")
                k.destroyAll("texte_proof")
                k.destroyAll("cross")
                k.destroyAll("ligne")
                createProof(k,8, Carnetname, Guillot_ok.getinstanceGuillot(), Meet_Guillot_ok.getinstanceGuillot(),k.vec2(320,375),250, 40,k.vec2(650,425),135 , 20, "proof1_Guillot", "proof2_Guillot")
                return; 
            }
            if (page === 9){
                k.destroyAll("proof")
                k.destroyAll("proof_color")
                k.destroyAll("texte_proof")
                k.destroyAll("cross")
                k.destroyAll("ligne")
                createProof(k,9, Carnetname, DuFay_ok.getinstanceDuFay(), Meet_DuFay_ok.getinstanceDuFay(),k.vec2(300,550),290, 20,k.vec2(300,570),290 , 20, "proof1_DuFay", "proof2_DuFay")
                return; 
            }
            if (page === 10){
                k.destroyAll("proof")
                k.destroyAll("proof_color")
                k.destroyAll("texte_proof")
                k.destroyAll("cross")
                k.destroyAll("ligne")
                createProof(k,10, Carnetname, Bellet_ok.getinstanceBellet(), Meet_Bellet_ok.getinstanceBellet(),k.vec2(300,285),280, 20,k.vec2(300,305),55 , 25, "proof1_Bellet", "proof2_Bellet")
                return; 
            }
        }
        if(["right","d"].includes(key)){
            page += 1
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
                k.destroyAll("proof")
                k.destroyAll("proof_color")
                k.destroyAll("texte_proof")
                k.destroyAll("cross")
                k.destroyAll("ligne")
                createProof(k,1, Carnetname, Pottier_ok.getinstancePottier(), Meet_Pottier_ok.getinstancePottier(),k.vec2(305,435),250, 25,k.vec2(305,460),250 , 25, "proof1_Pottier", "proof2_Pottier")
                return;
            }
            if (page === 2){
                k.destroyAll("proof")
                k.destroyAll("proof_color")
                k.destroyAll("texte_proof")
                k.destroyAll("cross")
                k.destroyAll("ligne")
                createProof(k,2, Carnetname, Beck_ok.getinstanceBeck(), SeenJournal.getInstanceJournal(),k.vec2(390,250),120, 20,k.vec2(650,225),50 , 20, "proof1_Beck", "proof2_Beck")
                return; 
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
                createProof(k,6, Carnetname, Torrent_ok.getinstanceTorrent(), Meet_Torrent_ok.getinstanceTorrent(),k.vec2(375,400),225, 20,k.vec2(305,425),100 , 20, "proof1_Torrent", "proof2_Torrent")
                return; 
            }
            if (page === 7){
                k.destroyAll("proof")
                k.destroyAll("proof_color")
                k.destroyAll("texte_proof")
                k.destroyAll("cross")
                createProof(k,7, Carnetname, Robriquet_ok.getinstanceRobriquet(), Meet_Robriquet_ok.getinstanceRobriquet(),k.vec2(300,250),255, 50,k.vec2(815,195),150 , 20, "proof1_Robriquet", "proof2_Robriquet")
                return; 
            }
            if (page === 8){
                k.destroyAll("proof")
                k.destroyAll("proof_color")
                k.destroyAll("texte_proof")
                k.destroyAll("cross")
                k.destroyAll("ligne")
                createProof(k,8, Carnetname, Guillot_ok.getinstanceGuillot(), Meet_Guillot_ok.getinstanceGuillot(),k.vec2(320,375),250, 40,k.vec2(650,425),135 , 20, "proof1_Guillot", "proof2_Guillot")
                return; 
            }
            if (page === 9){
                k.destroyAll("proof")
                k.destroyAll("proof_color")
                k.destroyAll("texte_proof")
                k.destroyAll("cross")
                k.destroyAll("ligne")
                createProof(k,9, Carnetname, DuFay_ok.getinstanceDuFay(), Meet_DuFay_ok.getinstanceDuFay(),k.vec2(300,550),290, 20,k.vec2(300,570),290 , 20, "proof1_DuFay", "proof2_DuFay")
                return; 
            }
            if (page === 10){
                k.destroyAll("proof")
                k.destroyAll("proof_color")
                k.destroyAll("texte_proof")
                k.destroyAll("cross")
                k.destroyAll("ligne")
                createProof(k,10, Carnetname, Bellet_ok.getinstanceBellet(), Meet_Bellet_ok.getinstanceBellet(),k.vec2(300,285),280, 20,k.vec2(300,305),55 , 25, "proof1_Bellet", "proof2_Bellet")
                return; 
            }
        }
}
