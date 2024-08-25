import {Cell} from '.';
import './style.css'

interface Props {
    cells:TicTacToeBoard;
    evaluation: BoardEvaluation;
    enabled: boolean;
    color: string;
    onMove: (cellIndex:number) => void;
    players: Player[]
    noFloating?:boolean

}

export default function Board ({cells,evaluation,players,color,enabled,onMove, noFloating}:Props){

let winner = null

if(evaluation.code != null) winner = players[evaluation.code]

    return winner ? (
      <div
        className="border-4 border-b-8 border-[#0001] relative rounded-2xl text-[#fffc] group"
        style={{
          backgroundColor: winner ? winner.color : "",
        }}
      >
        <div className="grid grid-cols-3 p-0.5 scale-90 justify-center items-center gap-0.5 opacity-30 md:opacity-20 group-hover:opacity-40">
          {
          cells.map((cellValue, cellIndex) => (
            <Cell
              value={cellValue}
              symbol={cellValue != null && players[cellValue].emoji}
              color={cellValue != null ? players[cellValue].color : null}
              onClick={() => onMove(cellIndex)}
              enabled={enabled}
            />
          ))
          }
        </div>
        <div className="text-7xl md:text-9xl size-full flex items-center justify-center absolute inset-0 backdrop-blur-sm md:backdrop-blur group-hover:backdrop-blur-0 transition-all group-hover:opacity-0 opacity-100 duration-300 font-black text-white/90">
          <span className="-rotate-3">{winner.emoji}</span>
        </div>
      </div>
    ) : (
      <div
        className={`grid gap-1 md:gap-2 md:p-1 grid-cols-3 border-4 transition-all duration-500 active:scale-[1.07] active:brightness-[150%] active:duration-100 round ${
          enabled
            ? `bg-white border-white shadow-2xl ${!noFloating && "scale-105"} `
            : "pointer-events-none bg-slate-200"
        }`}
        style={{
          boxShadow: enabled
            ? `0 4px 0 0 ${color},-3px 12px 32px -8px #0028`
            : "",
          backgroundColor: winner?.color,
        }}
      >
        {cells.map((cellValue, cellIndex) => (
          <Cell
            value={cellValue}
            symbol={cellValue != null && players[cellValue].emoji}
            color={cellValue != null ? players[cellValue].color : null}
            onClick={() => onMove(cellIndex)}
            enabled={enabled}
          />
        ))}
      </div>
    );
}