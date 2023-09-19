import {GameContext, GameEvent, GameEvents, GameStates, Player} from "../../types";
import {createContext, PropsWithChildren, useCallback, useContext} from "react";
import {useMachine} from "@xstate/react";
import {GameMachine} from "../../machine/GameMachine";

type GameContextType = {
    state: GameStates,
    context: GameContext,
    send: <T extends GameEvents['type']>(event: {type: T, playerId?: Player['id']} & Omit<GameEvent<T>, 'playerId'>) => void,
    can: <T extends GameEvents['type']>(event: {type: T, playerId?: Player['id']} & Omit<GameEvent<T>, 'playerId'>) => boolean
    playerId: Player['id']
}

const Context = createContext<GameContextType>({} as never)

export function useGame(): GameContextType {
    return useContext(Context)
}

export function GameContextProvider({children}: PropsWithChildren) {
    const [state, send] = useMachine(GameMachine)
    const playerId = state.context.currentPlayer ?? ''

    const sendCb = useCallback<GameContextType['send']>((event) => send({playerId, ...event} as GameEvents), [playerId])
    const canCb = useCallback<GameContextType['can']>((event) => !!GameMachine.transition(state, {playerId, ...event} as GameEvents).changed, [state, playerId])

    return <Context.Provider value={{
        playerId: playerId,
        state: state.value as GameStates,
        context: state.context,
        send: sendCb,
        can: canCb
    }}>
        {
            children
        }
    </Context.Provider>
}