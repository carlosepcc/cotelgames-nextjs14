import Cell from "./Cell";
import GameSettings from "./GameSettings";
import Board from "./Board";
const gameXORInfo: GameInfo = {
  title: {
    default: "XO Recursive",
    "es-CU": "Cruz y Cero Recursivo",
    en: "TicTacToe Recursive",
    es: "XO Recursivo",
  },
  description: {
    es: "Un giro al original juego de Cruz y Cero. Ahora los jugadores deben ganar una serie de tableros ubicados en un tablero más grande. Quien gane tres tableros en línea, gana el juego. Pero hay una restricción importante, comienza a jugar y verás lo que pasa.",
    en: "An interesting version of the classic TicTacToe Game. Now the players must win a series of boards placed inside a bigger board. Whoever wins three boards in placed in a row, wins the game. But there is a cool restriction, start playing and you'll see what happens.",
  },
};

export { gameXORInfo, Cell, GameSettings, Board };
