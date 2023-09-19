import {useGame} from "./hooks/useGame";
import {GameStates} from "../types";
import {LobbyScreen} from "./screens/LobbyScreen";
import {PlayScreen} from "./screens/PlayScreen";
import {Grid} from "./components/Grid";
import {currentPlayer} from "../functions/game";
import VictoryScreen from "./screens/VictoryScreen";
import DrawScreen from "./screens/DrawScreen";
import {LoginScreen} from "./screens/LoginScreen";

export default function App() {
    const {state, context, send, playerId} = useGame()
    const canDrop = state === GameStates.PLAY
    const player = canDrop ? currentPlayer(context) : undefined

    const dropToken = canDrop ? (x: number) => {
        send({type: 'dropToken', x: x})
    } : undefined

    if(!playerId) {
        return <div className="container">
            <LoginScreen />
        </div>
    }

    return <div className='container'>
        {state === GameStates.LOBBY && <LobbyScreen />}
        {state === GameStates.PLAY && <PlayScreen />}
        {state === GameStates.VICTORY && <VictoryScreen />}
        {state === GameStates.DRAW && <DrawScreen />}
        <Grid grid={context.grid} onDrop={dropToken} color={player?.color} winingPositions={context.winingPositions} />
    </div>
}