import {CellState, GridState, PlayerColor, Position} from "../../types";
import {CSSProperties} from "react";
import {discColorClass} from "../../functions/color";

type GridProps = {
    grid: GridState,
    color?: PlayerColor,
    onDrop?: (x: number) => void,
    winingPositions : Position[]
}

export function Grid({grid, color, onDrop, winingPositions}: GridProps) {
    const showColumns = color && onDrop
    const isWining = (x: number, y: number) => !!winingPositions.find(p =>p.x === x && p.y === y)

    return <div className="grid" style={{'--rows': grid.length, '--cols': grid[0].length} as CSSProperties}>
        {
            grid.map((row, y) => row.map((c, x) => <Cell active={isWining(x, y)} key={`${x}-${y}`} y={y} color={c}/>))
        }
        {
            showColumns && <div className="columns">
                {new Array(grid[0].length).fill(1).map(((_, k) => <Column key={k} color={color} onDrop={() => onDrop(k)} />))}
            </div>
        }
    </div>
}

type CellProps = {
    y: number,
    color: CellState,
    active: boolean
}

function Cell({y, color, active}: CellProps) {
    return <div className={`${discColorClass(color)} ${active ? 'disc-active' : ''}`} style={{'--row': y} as CSSProperties}/>
}

type ColumnProps = {
    color: PlayerColor
    onDrop: () => void
}

function Column({color, onDrop}: ColumnProps) {
    return <button onClick={() => onDrop()} className="column">
        <div className={discColorClass(color)}></div>
    </button>
}