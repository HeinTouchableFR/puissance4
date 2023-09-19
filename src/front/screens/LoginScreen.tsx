import {NameSelector} from "../components/NameSelector";
import {Player, PlayerSession} from "../../types";
import {saveSession} from "../functions/session";

export function LoginScreen() {
    const handleLogin = async (name: Player['name']) => {
        const response: PlayerSession = await fetch('/api/players', {method: 'POST'}).then(r => r.json())
        const player = saveSession({
            ...response,
            name
        })
    }

    return <div>

        <NameSelector
            onSelect={handleLogin}
        />
    </div>
}