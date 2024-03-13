import { gameState, Beck_ok } from "../state/stateManagers.js";
import { SetSprite } from "../utils.js";

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
    ["Adrien_Felix","carnet_Felix_vide", "carnet_Felix",205],
    ["Alphonse_Beck","carnet_Beck_vide", "carnet_Beck", 150, "carnet_Beck_plein"], 
    ["Charles_Emmanuel","carnetEmmanuel_vide", "carnet_Emmanuel",270],
    ["Dufour_Michel","carnet_Dufour_vide", "carnet_Dufour",150],
    ["Emile_Vuilloud","carnet_Vuilloud_vide", "carnet_Vuilloud",160],
    ["Joseph_Torrent" ,"carnet_Torrent_vide", "carnet_Torrent",150],
    ["Louis_Robriquet","carnet_Robriquet_vide", "carnet_Robriquet",170],
    ["Pierre_Guillot", "carnet_Guillot_vide","carnet_Guillot",150], 
    ["Pierre_DuFay", "carnet_DuFay_vide","carnet_DuFay",195],
    ["Rey_Bellet", "carnet_Bellet_vide","carnet_Bellet", 120]
]

export function Carnet(k){
    gameState.setFreezePlayer(true)

    for (let i = 0; i < Assets_carnet.length; i++) {
        const Entry= k.add([  
            k.area({shape: new k.Rect(k.vec2(305,190+i*39.5), Assets_carnet[i][3], 20,)}),
            "entree",
            Assets_carnet[i][0],
        ])
    }   
}

export function createProof(k,nbr,Carnetname,ManagementInfo2 , ManagementInfo1,pos1, widthProof1, heightProof1,pos2, widthProof2, heightProof2,id_proof1,id_proof2){
    if(!ManagementInfo2){
    let Flag = ManagementInfo1 ? 2 :1
    SetSprite(k,Carnetname, Assets_carnet[nbr][Flag])
    k.destroyAll("entree")

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
    return;
    }
}


async function AllProofsfound(k, content, pos, id_text){
    Beck_ok.setinstanceBeck(true)
    const TextProof = k.add([
        k.text("", {
            font: "Pristina",
            width : 300,
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

let proof1 = false 
let proof2 = false 
export function ToDoWithProof(k,id, id_text){
    if(id === "proof1_Beck"){
        k.add([k.rect(120,20), k.pos(390,250),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        proof1 = true
        k.destroyAll("proof1_Beck")
        if (!proof2)return;
        AllProofsfound(k,"Alphonse Beck n'était pas encore né en 1815, ce n'est pas lui sur le tableau.", k.vec2(310,545),id_text)
        return;

    } 
    if ( id === "proof2_Beck" ){
        k.add([k.rect(50,20), k.pos(815,195),k.color(194,15,15),k.opacity(0.7),"proof_color"])
        proof2 = true
        k.destroyAll("proof2_Beck")
        if (!proof1)return;
        AllProofsfound(k,"Alphonse Beck n'était pas né en 1815, ce n'est pas lui sur le tableau.", k.vec2(310,545),id_text)
        return;
    }
    //TO DO ADD action 
}

