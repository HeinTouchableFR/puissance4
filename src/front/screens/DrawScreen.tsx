import {useGame} from "../hooks/useGame";
import {Draw} from "../components/Draw";

export default function DrawScreen() {
    const {send} = useGame()
    const restart = () => send({type: 'restart'})
    return <div>
        <Draw onRestart={restart}/>
    </div>
}