import {Player, PlayerColor} from "../../types";
import {discColorClass} from "../../functions/color";

type GameInfoProps = {
color: PlayerColor
    name: Player['name']
}

export function GameInfo({color, name}: GameInfoProps) {
    return <div>
        <h2 className="h2 flex">
            Au tour de {name} <div className={`${discColorClass(color)} m-inline-1`}></div> de jouer
        </h2>
    </div>
}