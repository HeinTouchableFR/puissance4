import {CellState, GridState, PlayerColor, Position} from "../../types";
import {CSSProperties} from "react";
import {discColorClass} from "../../functions/color";

type GridProps = {
    grid: GridState,
    color?: PlayerColor,
    onDrop: (x: number) => void,
    winingPositions : Position[],
    canDrop: (x: number) => boolean
}

export function Grid({grid, color, onDrop, winingPositions, canDrop}: GridProps) {
    const showColumns = color && onDrop
    const isWining = (x: number, y: number) => !!winingPositions.find(p =>p.x === x && p.y === y)

    return <div className="grid" style={{'--rows': grid.length, '--cols': grid[0].length} as CSSProperties}>
        {
            grid.map((row, y) => row.map((c, x) => <Cell active={isWining(x, y)} key={`${x}-${y}`} y={y} color={c}/>))
        }
        {
            showColumns && <div className="columns">
                {new Array(grid[0].length).fill(1).map(((_, k) => <Column
                    key={k}
                    x={k}
                    color={color}
                    onDrop={onDrop}
                    disabled={!canDrop(k)}
                />))}
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
    x: number,
    color: PlayerColor,
    onDrop: (x: number) => void,
    disabled?: boolean,
}

function Column({color, onDrop, x, disabled}: ColumnProps) {
    return <button disabled={disabled} onClick={() => onDrop(x)} className="column">
        <div className={discColorClass(color)}></div>
    </button>
}