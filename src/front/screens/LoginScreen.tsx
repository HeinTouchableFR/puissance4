import {NameSelector} from "../components/NameSelector";
import {Player, PlayerSession, QueryParams} from "../../types";
import {saveSession} from "../functions/session";
import {updateQueryParams, urlSearchParams} from "../../front/functions/url";
import {v4} from "uuid";
import {useGame} from "../../front/hooks/useGame";

export function LoginScreen() {
    const {connect} = useGame()
    const handleLogin = async (name: Player['name']) => {
        const response: PlayerSession = await fetch('/api/players', {method: 'POST'}).then(r => r.json())
        const player = saveSession({
            ...response,
            name
        })
        const gameId = urlSearchParams().get(QueryParams.GAMEID) ?? v4()
        connect(player, gameId)
        updateQueryParams({[QueryParams.GAMEID]: gameId})
    }

    return <div>

        <NameSelector
            onSelect={handleLogin}
        />
    </div>
}