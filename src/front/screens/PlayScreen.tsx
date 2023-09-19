import {useGame} from "../hooks/useGame";
import {GameInfo} from "../components/GameInfo";
import {currentPlayer} from "../../functions/game";

type PlayScreenProps = {}

export function PlayScreen({}: PlayScreenProps) {
    const {context} = useGame()
    const player = currentPlayer(context)!

    return <div>
        <GameInfo name={player.name} color={player.color!} />
    </div>
}