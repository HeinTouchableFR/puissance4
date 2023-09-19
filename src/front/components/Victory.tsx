import {Player, PlayerColor} from "../../types";
import {discColorClass} from "../../functions/color";
type VictoryProps = {
    color: PlayerColor,
    name: Player['name'],
    onRestart: () => void

}

export function Victory({color, name, onRestart}: VictoryProps) {
    return <div className="flex space-between">
        <h2 className="h2 flex">
            Bravo, {name}
            <div className={`${discColorClass(color)} m-inline-1`}></div>
            a gagné
        </h2>
        <button onClick={() => onRestart()} className="btn primary-outlined">
            Rejouer
        </button>
    </div>
}