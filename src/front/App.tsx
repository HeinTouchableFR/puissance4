import {useGame} from "./hooks/useGame";
import {GameStates} from "../types";
import {LobbyScreen} from "./screens/LobbyScreen";
import {PlayScreen} from "./screens/PlayScreen";
import {Grid} from "./components/Grid";
import VictoryScreen from "./screens/VictoryScreen";
import DrawScreen from "./screens/DrawScreen";
import {LoginScreen} from "./screens/LoginScreen";
import {currentPlayer} from "../functions/game";

export default function App() {
    const {state, context, send, playerId, can} = useGame()
    const showGrid = state != GameStates.LOBBY

    const dropToken = (x: number) => {
        send({type: 'dropToken', x: x})
    }

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
        {showGrid && <Grid
            grid={context!.grid}
            onDrop={dropToken}
            color={currentPlayer(context)?.color}
            winingPositions={context.winingPositions}
            canDrop={(x) => can({type: 'dropToken', x})}
        />}
    </div>
}