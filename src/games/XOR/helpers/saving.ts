import { copy } from ".";
const DEFAULT_PLAYER_X: Player = {
  value: 0,
  color: "red",
  emoji: "X",
  name: "Player X",
};
const DEFAULT_PLAYER_O: Player = {
  value: 1,
  color: "dodgerblue",
  emoji: "O",
  name: "Player O",
};
export const DEFAULT_PLAYERS: Player[] = [DEFAULT_PLAYER_X, DEFAULT_PLAYER_O];
export const BLANK_HISTORY = [];
export const DEFAULT_GAME_DATA = {
  history: BLANK_HISTORY,
  players: DEFAULT_PLAYERS,
};

const LOCAL_SAVE_KEY = "tictactoer_autosave";
export const BLANK_GLOBAL_BOARD: TicTacToeBoardGlobal = Array.from(
  { length: 9 },
  () => Array(9).fill(null)
);
export const BLANK_GLOBAL_EVALUATION: BoardEvaluation[] = Array(9).fill({
  code: null,
  detail: "empty",
});

export function saveGame(
  history: GameHistory,
  players: Player[],
  key: string = LOCAL_SAVE_KEY
) {
  console.log("Saving game with history: ", history);
  console.log("Saving game with players: ", players);

  let gameData = { history, players };
  console.log("Saving game with data: ", gameData);

  //Validate data
  if (history?.length && players?.length > 1)
    localStorage.setItem(key, JSON.stringify(gameData));
}

const isValidPlayerValue = (value: number): value is PlayerValue => {
  return value === 1 || value === 0; // Type guard to ensure the value is PlayerValue
};

export function buildGlobal(h: GameHistory) {
  let newGlobal: TicTacToeBoardGlobal = copy(BLANK_GLOBAL_BOARD);

  try {
    h.forEach((hi) => {
      let boardIndex = hi[0];
      let cellIndex = hi[1];
      let playerValue = hi[2];

      // Validate the player value
      if (isValidPlayerValue(playerValue)) {
        newGlobal[boardIndex][cellIndex] = playerValue; // Assign valid player value
      } else {
        throw new Error(
          `Invalid player value: ${playerValue} at ${boardIndex};${cellIndex} when building global board from history`
        );
      }
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
  }

  return newGlobal; // Return the new global board
}

export function getMoveFromHi(hi: HistoryItem) {
  let newMove: Move | null = null;
  try {
    if (hi?.length == 3 && isValidPlayerValue(hi[2])) {
      newMove = {
        boardIndex: hi[0],
        cellIndex: hi[1],
        player: hi[2],
      };
    } else throw new Error("Invalid move data");
  } catch (error) {
    console.error(error);
  }
  return newMove;
}

export const getSavedGame = (key: string = LOCAL_SAVE_KEY): SaveItem => {
   if (typeof window !== "undefined"){
     const savedGameItem = localStorage.getItem(key);
  console.info("getting saved game...", savedGameItem);

  let savedGame: SaveItem = savedGameItem
    ? JSON.parse(savedGameItem)
    : DEFAULT_GAME_DATA;

  console.log("decided saved game: ", savedGame);
  //Ensure a granular starting data for nested properties
  savedGame.players ||= DEFAULT_GAME_DATA.players;
  savedGame.history ||= DEFAULT_GAME_DATA.history;
  console.log("decided saved game after properties check: ", savedGame);
  return savedGame;
   }
   return DEFAULT_GAME_DATA
};
