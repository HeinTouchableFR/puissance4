import {FormEvent, useState} from "react";

type NameSelectorProps = {
    onSelect: (name: string) => void,
    disabled?: boolean
}


export function NameSelector({onSelect, disabled}: NameSelectorProps) {
    const [error, setError] = useState("")
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        const name = new FormData(e.currentTarget as HTMLFormElement).get('name')
        if (!name || name.toString().trim() === '') {
            setError('Vous devez choisir un pseudo')
            return;
        }
        onSelect(name.toString())
    }

    return <div className="p-block-2">
        <h1 className="h1">Choisir un pseudo</h1>
        {
            error && <div className="alert">{error}</div>
        }
        <form action="src/front/screens" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Votre pseudo</label>
                <input disabled={disabled} type="text" id="name" name="name" required/>
            </div>

            <button className="btn primary m-top-2" disabled={disabled}>
                Choisir
            </button>
        </form>
    </div>
}