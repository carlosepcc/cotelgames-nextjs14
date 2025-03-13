const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6],
];
const initialEvaluation: BoardEvaluation = { code: null, detail: 'playing' }
const DETAILS_CODE_MAPPINGS: { [key: string]: BoardEvaluationCode } = {
  'won0': 0,
  'won1': 1,
  'full': 4,
  'empty': null,
  'draw': null,
  'playing': null,
}


export default function evaluateBoard(board: TicTacToeBoard): BoardEvaluation {
  let evaluation: BoardEvaluation = initialEvaluation
console.log('evaluating board: ',board)
  for(let i = 0; i < WINNING_COMBINATIONS.length; i++) {

  
  //sum of all the values of the cells in every winning line
  const [a,b,c] = WINNING_COMBINATIONS[i]
  const firstCellValue = board[a]

  if (firstCellValue != null &&
      firstCellValue == board[b] &&
      firstCellValue == board[c]) {
        evaluation =  {
          code: firstCellValue,
          detail: firstCellValue ? 'won1' : 'won0'
        }
      return evaluation
    }
  }

  return evaluation
}

export function evaluateGlobalBoard(
  evaluations: BoardEvaluation[]
): BoardEvaluation {
  // Check for winning combinations using board evaluations as cells
  for (const combo of WINNING_COMBINATIONS) {
    const [a, b, c] = combo;
    const codeA = evaluations[a]?.code;
    const codeB = evaluations[b]?.code;
    const codeC = evaluations[c]?.code;

    if (codeA !== null && codeA === codeB && codeB === codeC) {
      return {
        code: codeA,
        detail: codeA === 0 ? "globalWon0" : "globalWon1",
      };
    }
  }

  // Check for draw (all boards completed)
  const allCompleted = evaluations.every((e) => e.code !== null);
  return allCompleted
    ? { code: 4, detail: "globalDraw" }
    : { code: null, detail: "globalPlaying" };
}