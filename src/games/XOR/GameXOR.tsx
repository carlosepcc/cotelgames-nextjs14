'use client'
import { useEffect, useState } from "react";
import {
  getSavedGame,
  saveGame,
  getMoveFromHi,
  buildGlobal,
  evaluateAllBoards,
} from "./helpers";

//Components
import { GameSettings, Board, gameXORInfo } from ".";
import { playSound } from "./helpers/sfx";
import { BLANK_HISTORY } from "./helpers/saving";
// import { useTranslation } from "react-i18next";
const { title } = gameXORInfo;
export const style = {
  round: "rounded-lg sm:rounded-xl lg:rounded-2xl",
};
// Main Component

const GameXOR = () => {
  // const { t, i18n } = useTranslation();
  const startingGameData = getSavedGame();
  const [history, setHistory] = useState<GameHistory>(startingGameData.history);

  const lastHi = history?.at(-1);
  const lastMove: Move | false | null = lastHi ? getMoveFromHi(lastHi) : null;
  const currentPlayer = lastMove && lastMove?.player ? 0 : 1;

  const [player0, setPlayer0] = useState<Player>(startingGameData.players[0]);
  const [player1, setPlayer1] = useState<Player>(startingGameData.players[1]);

  const global = buildGlobal(history);
  const globalEval: BoardEvaluation[] = evaluateAllBoards(global);

  //Players proxy array
  const players: { value: Player; set: Function }[] = [
    { value: player0, set: setPlayer0 },
    { value: player1, set: setPlayer1 },
  ];

  const resetBoard = () => {
    if (
      confirm(
        "Are you sure? You will loose all progress once you do another move"
      )
    ) {
      setHistory(BLANK_HISTORY);
      // localStorage.removeItem(LOCAL_SAVE_KEY) // Erase saved data
      playSound(140);
    }
  };

  function pushHistory(historyItem: HistoryItem) {
    let newHistory: GameHistory = history.slice();
    newHistory.push(historyItem);
    setHistory(newHistory);
    return newHistory;
  }

  useEffect(
    () => saveGame(history, [player0, player1]),
    [history, player0, player1]
  );

  function setMove(
    boardIndex: number,
    cellIndex: number,
    value: PlayerValue = currentPlayer
  ): Move | null {
    const newHistoryI = [boardIndex, cellIndex, value];
    pushHistory(newHistoryI);

    playSound((currentPlayer + 3) * 100); //Play a different starting tone for every player

    return getMoveFromHi(newHistoryI);
  }
  function undo() {
    console.info("UNDO");
    const nextHistory = history.slice();
    nextHistory.pop();

    setHistory(nextHistory);
    if (nextHistory.length) {
      playSound(200);
    } else {
      resetBoard();
    }
  }

  return (
    <div className="flex flex-col gap-8 items-center justify-center  text-slate-500 pb-20">
      <h1 className="text-2xl font-bold">
          <span>
            TicTacToe <span className="text-slate-400">Recursive</span>
          </span>
      </h1>

      <GameSettings players={players} currentPlayer={currentPlayer} />
      <div
        className={`grid grid-cols-3 gap-2 bg-slate-300 shadow p-2 lg:p-4 lg:gap-4 round`}
      >
        {global.map((board, boardIndex) => (
          <Board
            cells={board}
            evaluation={globalEval[boardIndex]}
            players={[players[0].value, players[1].value]}
            color={players[currentPlayer].value.color}
            onMove={(cellIndex) => setMove(boardIndex, cellIndex)}
            enabled={
              lastMove && globalEval[lastMove.cellIndex].code == null
                ? boardIndex == lastMove.cellIndex
                : true
            }
            noFloating={
              !(lastMove && globalEval[lastMove.cellIndex].code == null)
            }
          />
        ))}
      </div>

      <div className="flex gap-2 fixed bottom-0 left-0 right-0 p-3 pt-4 bg-slate-200 border-t">
        <div className="flex gap-4 w-full max-w-[1024px] m-auto">
          <button
            className={`bg-slate-500 text-slate-100 py-2 px-4 pb-1 border-b-4 border-slate-600 shadow-md active:shadow-sm transition-all active:translate-y-1 active:brightness-90 active:scale-100 uppercase font-mono tracking-widest md:text-4xl md:py-4 md:px-8 md:pb-2 hover:scale-[1.02] hover:brightness-105  font-black grow ${style.round}`}
            onClick={undo}
          >
            Undo
          </button>
          <button
            className={`bg-orange-500 text-orange-100 py-2 px-4 pb-1 border-b-4 border-orange-600 shadow-md active:shadow-sm transition-all active:translate-y-1 active:brightness-90 active:scale-100 uppercase font-mono font-black tracking-widest md:text-4xl md:py-4 md:px-8 md:pb-2 hover:scale-[1.02] hover:brightness-105 grow ${style.round}`}
            onClick={resetBoard}
          >
            Reset
          </button>
        </div>
      </div>
      <details className="max-h-52 m-auto text-slate-200 mb-20">
        <summary className="cursor-pointer hover:text-black">
        Details
        </summary>
        <div className="p-4 pb-20 rounded-xl shadow-inner bg-slate-800 text-slate-300 font-mono max-h-52 overflow-auto max-w-80 border-4 ">
          <h3 className="my-1 font-bold m-auto text-slate-400">History</h3>
          <ul className="flex flex-col gap-2 items-end">
            {history.map((hi) => (
              <li className="flex items-center gap-2 font-bold text-slate-300">
                <span
                  className="font-black"
                  style={{ color: players[hi[2]].value.color }}
                >
                  {players[hi[2]].value.emoji}
                </span>
                <MiniGrid color={players[hi[2]].value.color} index={hi[0]} />
                <div>
                  <span> {hi[0] + 1}</span>
                  <span className="text-slate-500">;</span>
                  <span>{hi[1] + 1}</span>
                </div>
                <MiniGrid color={players[hi[2]].value.color} index={hi[1]} />
              </li>
            ))}
          </ul>
        </div>
      </details>
    </div>
  );
};

const MiniGrid = ({ index, color }: { index: number; color?: string }) => (
  <div className="overflow-hidden rounded gap-0.5 grid grid-cols-3 size-fit">
    {Array(9)
      .fill(null)
      .map((i, cellIndex) => (
        <div
          className="p-1 size-2 bg-slate-700"
          style={{ background: cellIndex == index && (color || "dodgerblue") }}
        ></div>
      ))}
  </div>
);

export default GameXOR;
