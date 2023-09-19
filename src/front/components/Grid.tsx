import {CellState, GridState, PlayerColor} from "../../types";
import {CSSProperties} from "react";
import {discColorClass} from "../../functions/color";
import {prevent} from "../../functions/dom";

type GridProps = {
    grid: GridState,
    color?: PlayerColor,
    onDrop?: (x: number) => void
}

export function Grid({grid, color, onDrop}: GridProps) {
    const showColumns = color && onDrop
    return <div className="grid" style={{'--rows': grid.length, '--cols': grid[0].length} as CSSProperties}>
        {
            grid.map((row, y) => row.map((c, x) => <Cell key={`${x}-${y}`} y={y} color={c}/>))
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
}

function Cell({y, color}: CellProps) {
    return <div className={discColorClass(color)} style={{'--row': y} as CSSProperties}/>
}

type ColumnProps = {
    color: PlayerColor
    onDrop: () => void
}

function Column({color, onDrop}: ColumnProps) {
    return <button onClick={() => prevent(onDrop)} className="column">
        <div className={discColorClass(color)}></div>
    </button>
}