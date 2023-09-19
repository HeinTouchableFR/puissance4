import {useGame} from "../hooks/useGame";
import {currentPlayer} from "../../functions/game";
import {Victory} from "../components/Victory";

export default function VictoryScreen() {
    const {context, send} = useGame()
    const player = currentPlayer(context)

    const restart = () => send({type: 'restart'})

    return <div>
        <Victory color={player.color!} name={player.name} onRestart={restart} />
    </div>
}