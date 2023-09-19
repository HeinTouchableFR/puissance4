import {Player, PlayerColor} from "../../types";
import {discColorClass} from "../../functions/color";

type ColorSelectorProps = {
    onSelect: (color: PlayerColor) => void,
    players: Player[],
    colors: PlayerColor[]
}

export function ColorSelector({onSelect, players, colors}: ColorSelectorProps) {
    return <div className="p-block-2">
        <div className="players">
            {
                players.map(player => <div key={player.id} className="player">
                    {player.name}
                    {player.color && <div className={discColorClass(player.color)}></div>}
                </div>)
            }
        </div>
        <h3 className="h3">Sélectionnez une couleur</h3>
        <div className="selector">
            {
                colors.map(color => <button onClick={() => onSelect(color)} className={`${discColorClass(color)} m-2`} key={color}></button>)
            }
        </div>
    </div>
}