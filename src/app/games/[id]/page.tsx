'use client'
import { games } from "@/stores/gamesStore"
interface Props{
    params:{id:string}
}
function GameInfo({params}:Props) {
    const {id} = params
    const GameElement = games.find(game=>game.code == id)?.element
    return ( <div>Welcome to the game {id}
    
        {GameElement && <GameElement/>}
    
    </div> );
}

export default GameInfo;