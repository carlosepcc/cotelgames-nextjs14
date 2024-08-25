import evaluateBoard from "./evaluateBoard";
import {
  saveGame,
  getSavedGame,
  BLANK_GLOBAL_BOARD,
  getMoveFromHi,
  BLANK_GLOBAL_EVALUATION,
  buildGlobal,
} from "./saving";

export const copy = (value: any) => JSON.parse(JSON.stringify(value));

export function evaluateAllBoards(boards: TicTacToeBoardGlobal) {
  let evaluations = BLANK_GLOBAL_EVALUATION;
  boards.forEach((board, boardIndex) => {
    let evaluation = evaluateBoard(board);
    evaluations[boardIndex] = evaluation;
  });

  return evaluations;
}

export {
  evaluateBoard,
  saveGame,
  getSavedGame,
  BLANK_GLOBAL_BOARD,
  BLANK_GLOBAL_EVALUATION,
  getMoveFromHi,
  buildGlobal,
};


