"use client";
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
import { evaluateGlobalBoard } from "./helpers/evaluateBoard";
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
  const globalEvaluation = evaluateGlobalBoard(globalEval);
  // Add game over state
  const [gameOver, setGameOver] = useState(false);
  // Update useEffect to check game state
  useEffect(() => {
    if (globalEvaluation.code !== null) {
      setGameOver(true);
      setBlocked(true);
    }
  }, [globalEvaluation]);
  //Players proxy array
  const players: { value: Player; set: Function }[] = [
    { value: player0, set: setPlayer0 },
    { value: player1, set: setPlayer1 },
  ];
  const [aiPlayer, setAiPlayer] = useState<0 | 1 | null>(null);
  const [blocked, setBlocked] = useState<boolean>(false);
  const [aiPlaying, setAiPlaying] = useState<boolean>(false);

  const resetBoard = () => {
    if (
      confirm(
        "Are you sure? You will loose all progress once you do another move"
      )
    ) {
      setHistory(BLANK_HISTORY);
      setBlocked(false);
      setGameOver(false);
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
  function aiMakeMove() {
    if (aiPlayer === null) return;

    // Determine the target board from the last move's cell index
    let targetBoard: number = 0;
    if (lastMove) targetBoard = lastMove.cellIndex;

    // Check if the target board is playable (not won and has empty cells)
    const targetEval = globalEval[targetBoard];
    const targetCells = global[targetBoard];
    const isTargetPlayable =
      targetEval.code === null && targetCells.some((cell) => cell === null);

    let allowedBoards: number[] = [];

    if (isTargetPlayable) {
      // Must play in the target board
      allowedBoards = [targetBoard];
    } else {
      // Find all playable boards (not won and have empty cells)
      allowedBoards = globalEval
        .map((evalObj, index) => ({
          eval: evalObj,
          cells: global[index],
          index,
        }))
        .filter(
          ({ eval: evaluation, cells }) =>
            evaluation.code === null && cells.some((cell) => cell === null)
        )
        .map(({ index }) => index);
    }

    // No valid boards available (game over)
    if (allowedBoards.length === 0) return;

    // Select a random board from allowed boards
    const selectedBoardIndex =
      allowedBoards[Math.floor(Math.random() * allowedBoards.length)];
    const selectedBoard = global[selectedBoardIndex];

    // Get all empty cell indices in the selected board
    const emptyCells: number[] = [];
    selectedBoard.forEach((cell, index) => {
      if (cell === null) emptyCells.push(index);
    });

    if (emptyCells.length === 0) return; // Should never happen due to previous checks

    // Select a random empty cell
    const selectedCellIndex =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];

    // Make the move and unblock the UI
    setMove(selectedBoardIndex, selectedCellIndex, currentPlayer);
    setBlocked(false);
  }
  useEffect(
    () => saveGame(history, [player0, player1]),
    [history, player0, player1]
  );
  useEffect(() => {
    if (gameOver || currentPlayer !== aiPlayer) return;
    setBlocked(true);
    setTimeout(() => {
      aiMakeMove();
    }, Math.floor(Math.random() * 3000 + 2000));
  }, [currentPlayer, gameOver]);

  useEffect(() => {
    if (currentPlayer === aiPlayer) aiMakeMove();
  }, []);
  function setMove(
    boardIndex: number,
    cellIndex: number,
    value: PlayerValue = currentPlayer
  ): Move | null {
    if (gameOver) return null;
    const newHistoryItem = [boardIndex, cellIndex, value];
    pushHistory(newHistoryItem);

    playSound((currentPlayer + 3) * 100); //Play a different starting tone for every player

    return getMoveFromHi(newHistoryItem);
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
  // Add victory message component
  const renderGameOver = () => {
    if (!gameOver) return null;

    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 backdrop-blur flex items-center justify-center z-50">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl text-center">
          <h2 className="text-2xl font-bold mb-4">
            {globalEvaluation.code === 4
              ? "Game Draw!"
              : `${players[globalEvaluation.code!]?.value.emoji} ${
                  players[globalEvaluation.code!]?.value.name
                } Wins!`}
          </h2>
          <button
            className="bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600"
            onClick={resetBoard}
          >
            Play Again
          </button>
        </div>
      </div>
    );
  };
  return (
    <div className="flex flex-col gap-8 items-center justify-center  text-slate-500 pb-20">
      {renderGameOver()}
      <h1 className="text-2xl font-bold">
        <span>
          TicTacToe <span className="text-slate-400">Recursive</span>
        </span>
      </h1>
      <div className="flex gap-6">
        <b className="text-sm flex gap-1">
          <span className="-mt-0.5">🤖</span>
          <span className="opacity-80">Use Dumb AI for</span>
        </b>
        {players.map((player) => (
          <button
            key={player.value.value}
            className={`uppercase text-sm font-bold ${
              aiPlayer === player.value.value ? "text-amber-500" : ""
            }`}
            onClick={() =>
              setAiPlayer(
                player.value.value != aiPlayer ? player.value.value : null
              )
            }
          >
            Player {player.value.emoji}
          </button>
        ))}
      </div>
      {aiPlaying && (
        <div
          className="text-7xl p-1 rotate-45 animate-bounce "
          style={{
            position: "fixed",
            left: "0",
            top: "20%",
          }}
        >
          🤖
        </div>
      )}
      <GameSettings players={players} currentPlayer={currentPlayer} />
      <div
        className={`grid grid-cols-3 gap-2 bg-slate-300 dark:bg-muted shadow p-2 lg:p-4 lg:gap-4 round ${
          blocked || aiPlaying ? "pointer-events-none" : ""
        }`}
      >
        {global.map((board, boardIndex) => (
          <Board
            key={boardIndex}
            cells={board}
            evaluation={globalEval[boardIndex]}
            players={[players[0].value, players[1].value]}
            color={players[currentPlayer].value.color}
            onMove={(cellIndex) => setMove(boardIndex, cellIndex)}
            enabled={
              !gameOver &&
              (lastMove && globalEval[lastMove.cellIndex].code == null
                ? boardIndex == lastMove.cellIndex
                : true)
            }
            noFloating={
              gameOver ||
              !(lastMove && globalEval[lastMove.cellIndex].code == null)
            }
          />
        ))}
      </div>

      <div className="flex gap-2 fixed bottom-0 left-0 right-0 p-3 pt-4 bg-slate-200 dark:bg-muted-dark dark:border-muted-dark border-t backdrop-blur-2xl">
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
      <details className="max-h-52 m-auto text-muted dark:text-muted-dark mb-20">
        <summary className="cursor-pointer hover:text-black dark:hover:text-white">
          Details
        </summary>
        <div className="p-4 pb-20 rounded-xl shadow-inner bg-slate-800 text-slate-300 font-mono max-h-52 overflow-auto max-w-[20rem] border-4 dark:border-muted-dark transition-all">
          <h3 className="my-1 font-bold m-auto text-slate-400">History</h3>
          <ul className="flex flex-col gap-2 items-end">
            {history.map((hi, index) => (
              <li
                key={index}
                className="flex items-center gap-2 font-bold text-slate-300"
              >
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
          key={cellIndex}
          className="p-1 size-2 bg-slate-700"
          style={{
            background: cellIndex == index ? color || "dodgerblue" : "",
          }}
        ></div>
      ))}
  </div>
);

export default GameXOR;
