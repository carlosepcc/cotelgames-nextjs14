import { Heading } from "@/components/Typography/Heading"
import { games } from "@/stores/gamesStore"
interface Props{
    params:{id:string}
}
export function generateStaticParams(){
    return games.map(game=>({id:game.code}))
}
function GameInfo({params}:Props) {

    const {id} = params
    const GameElement = games.find(game=>game.code == id)?.element

    return GameElement ? <GameElement/> : <Heading text={`Game "${id}" not found`}/>
}

export default GameInfo;