
import { gameState, SeenJournal} from "../state/stateManagers.js";
import { Instruction } from "../utils.js";

export function Showjournal(k){
    gameState.setFreezePlayer(true)
    k.destroyAll("InstructionJournal")
    const Journal = k.add([k.sprite("journal_grand"), k.pos(400, 100), k.offscreen(), "journal_grand"])

    const BoxInstructionjournalexit = k.add([k.rect(170, 60), k.pos(880,150), k.fixed(), k.outline(4), k.opacity(0.5),k.offscreen(),"InstructionjournalExit"])
    const Instructionjournalexit = BoxInstructionjournalexit.add([
        k.text("Appuie sur enter pour arrêter la lecture", {
            font: "NiceFont",
            width : 180,
            size : 20
        }), 
        k.color(27,29,52),
        k.pos(10,10), 
        k.fixed(),  
        k.opacity(0.7)
    ]);
    

    k.onKeyPress("enter",() =>{  
            k.destroy(Journal)
            k.destroyAll("InstructionjournalExit")
            gameState.setFreezePlayer(false)
            SeenJournal.setInstanceJournal(true)
    })
}

export function instructionJournalEnd(k){
    k.destroyAll("InstructionJournal")
}