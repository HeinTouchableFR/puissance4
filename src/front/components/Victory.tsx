import {Player, PlayerColor} from "../../types";
import {discColorClass} from "../../functions/color";
import {prevent} from "../../functions/dom";

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
        <button onClick={() => prevent(onRestart)} className="btn primary-outlined">
            Rejouer
        </button>
    </div>
}