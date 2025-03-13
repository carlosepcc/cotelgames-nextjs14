type PlayerValue = 1 | 0;
type CellValue = PlayerValue | null;
type TicTacToeBoard = CellValue[];
type TicTacToeBoardGlobal = TicTacToeBoard[];
type Player = {value:PlayerValue; emoji: string; name: string; color: string };

type SaveItem = {
  history: GameHistory;
  players: Player[];
};

  type GameHistory = HistoryItem[];
  type HistoryItem = number[];


  type Move = { player: number; boardIndex: number; cellIndex: number };

  type BoardEvaluationCode = 1 | 0  | 4 | null
  type BoardEvaluationDetail =
    | "empty"
    | "playing"
    | "won1"
    | "won0"
    | "table"
    | "full"; 
type BoardEvaluation = {
  detail:BoardEvaluationDetail ,
  code: BoardEvaluationCode ,
}
//null Board is empty
//4 Board is blocked