import {interpret} from "xstate";
import {GameMachine, GameModel} from "./machine/GameMachine";

const machine = interpret(GameMachine).start()
console.log(machine.send(GameModel.events.join('1', 'name')).changed)
console.log(machine.send(GameModel.events.join('1', 'name')).changed)