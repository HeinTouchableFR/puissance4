import {prevent} from "../../functions/dom";

type DrawProps = {
    onRestart: () => void

}

export function Draw({onRestart}: DrawProps) {
    return <div className="flex space-between">
        <h2 className="h2 flex">
            Égalité bande de nuls
        </h2>
        <button onClick={() => onRestart()} className="btn primary-outlined">
            Rejouer
        </button>
    </div>
}