import {PlayerSession} from "../../types";

export function saveSession(session: PlayerSession): PlayerSession {
    localStorage.setItem('playerId', session.id)
    localStorage.setItem('signature', session.signature)
    localStorage.setItem('name', session.name)

    return session
}

export function getSession(): PlayerSession | null {
    const playerId = localStorage.getItem('playerId')
    const signature = localStorage.getItem('signature')
    const name = localStorage.getItem('name')

    if (!name || !playerId || !signature) {
        return null
    }

    return {
        id: playerId,
        name: name,
        signature: signature
    }
}

export function logout(): void {
    localStorage.clear()
}