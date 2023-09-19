import {NameSelector} from "../components/NameSelector";
import {useGame} from "../hooks/useGame";
import {ColorSelector} from "../components/ColorSelector";
import {PlayerColor} from "../../types";
import {prevent} from "../../functions/dom";

type LobbyScreenProps = {}

export function LobbyScreen({}: LobbyScreenProps) {
    const {send, context, can} = useGame()
    const colors = [PlayerColor.RED, PlayerColor.YELLOW]

    const joinGame = (name: string) => send({type: 'join', name: name, playerId: name})
    const chooseColor = (color: PlayerColor) => send({type: 'chooseColor', color: color, playerId: color === PlayerColor.YELLOW ? 'Théo' : 'Aymeric'})
    const startGame = () => send({type: 'start'})

    const canStart = can({type: 'start'})

    return <div>
        <ColorSelector
            onSelect={chooseColor}
            players={context.players}
            colors={colors}
        />
        <button disabled={!canStart} className="btn primary" onClick={prevent(startGame)}>Démarrer</button>
    </div>
}