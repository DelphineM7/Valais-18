export function generateAigu1Components(k, pos){
    return [
        k.sprite("Aigu1"),
        k.pos(pos),
        k.rotate(0),
        "Aigu1", 
    ];
}

export function generateAigu2Components(k, pos){
    return [
        k.sprite("Aigu2"),
        k.pos(pos),
        k.rotate(0),
        "Aigu2", 
    ];
}

export function rotateAigu(k,aigu, speed){
   aigu.onUpdate(()=>{
        aigu.angle += speed * k.dt()
   }) 
}