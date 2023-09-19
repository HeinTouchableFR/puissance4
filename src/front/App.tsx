import {NameSelector} from "./components/NameSelector";
import {ColorSelector} from "./components/ColorSelector";
import {PlayerColor} from "../types";
import {GameInfo} from "./components/GameInfo";
import {Grid} from "./components/Grid";
import {Victory} from "./components/Victory";

export default function App() {
    return <div className='container'>
        <GameInfo color={PlayerColor.YELLOW} name={'Théo'}/>
        <Victory color={PlayerColor.YELLOW} name={'Théo'}/>
        <Grid
            color={PlayerColor.RED}
            grid={[
                ["E", "E", "E", "E", "E", "E", "R"],
                ["E", "E", "E", "E", "E", "R", "Y"],
                ["E", "E", "E", "E", "E", "R", "R"],
                ["E", "E", "E", "E", "E", "R", "Y"],
                ["E", "E", "E", "E", "E", "Y", "R"],
                ["E", "E", "E", "E", "E", "Y", "Y"]
            ]}
            onDrop={() => console.log('drop')}
        />
        <NameSelector disabled onSelect={() => {
        }}/>
        <ColorSelector
            onSelect={() => {
            }}
            players={[
                {
                    id: '1',
                    name: 'Aymeric',
                    color: PlayerColor.RED
                },
                {
                    id: '2',
                    name: 'Théo',
                    color: PlayerColor.YELLOW
                }
            ]}
            colors={[PlayerColor.RED, PlayerColor.YELLOW]}
        />

    </div>
}