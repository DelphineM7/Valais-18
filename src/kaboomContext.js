import kaboom from "../lib/kaboom.mjs"

const k = kaboom({
    width: 1280,
    height: 720, 
    letterbox: true, //adaptation d'un écran à un autre
    global: false // k.namefunction 
})

export default k;