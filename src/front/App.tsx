import {useGame} from "./hooks/useGame";
import {GameStates, ServerErrors} from "../types";
import {LobbyScreen} from "./screens/LobbyScreen";
import {PlayScreen} from "./screens/PlayScreen";
import {Grid} from "./components/Grid";
import {currentPlayer} from "../functions/game";
import VictoryScreen from "./screens/VictoryScreen";
import DrawScreen from "./screens/DrawScreen";
import {LoginScreen} from "./screens/LoginScreen";
import {useEffect} from "react";
import {getSession, logout} from "./functions/session";

export default function App() {
    const {state, context, send, playerId} = useGame()
    const canDrop = state === GameStates.PLAY
    const player = canDrop ? currentPlayer(context) : undefined

    useEffect(() => {
        if(playerId) {
            const searchParams = new URLSearchParams({
                id: playerId,
                signature: getSession()!.signature!,
                name: getSession()!.name!,
                gameId: 'test'
            })
            const socket = new WebSocket(
                `${window.location.protocol.replace('http', 'ws')}//${window.location.host}/ws?${searchParams.toString()}`
            )
            socket.addEventListener('message', (event) => {
                const message = JSON.parse(event.data)
                if(message.type === 'error' && message.code === ServerErrors.AuthError) {
                    logout()
                }
            })
        }
    }, [playerId])

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