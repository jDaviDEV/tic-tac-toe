import { useState } from "react";
import { deriveActivePlayer } from "./helpers/deriveActivePlayer";
import { winningCombinations } from "./helpers/winningCombinations";
import { initialGameBoard } from "./helpers/initialGameBoard";
import { initialPlayers } from "./helpers/initialPlayers";
import { deriveGameBoard } from "./helpers/deriveGameBoard";
import { deriveWinner } from "./helpers/deriveWinner";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

function App() {
  const [gameTurn, setGameTurn] = useState([]);
  const [player, setPlayer] = useState(initialPlayers);

  const activePlayer = deriveActivePlayer(gameTurn);

  let gameBoard = deriveGameBoard(initialGameBoard, gameTurn);
  let winner = deriveWinner(gameBoard, winningCombinations, player);
  const hasDraw = gameTurn.length === 9 && !winner;

  function handleActivePlayer(rowIndex, colIndex) {
    setGameTurn((prevTurn) => {
      const currentPlayer = deriveActivePlayer(prevTurn);
      const updatedTurn = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurn,
      ];
      return updatedTurn;
    });
  }

  function handleRematch() {
    setGameTurn([]);
  }

  function handlePlayerName(symbol, newName) {
    setPlayer((prevPlayer) => {
      return {
        ...prevPlayer,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={player.X}
            symbol={"X"}
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerName}
          />
          <Player
            initialName={player.O}
            symbol={"O"}
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerName}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRematch={handleRematch} />
        )}
        <GameBoard
          activePlayerSymbol={activePlayer}
          onSelectSquare={handleActivePlayer}
          board={gameBoard}
        />
      </div>
      <Log turn={gameTurn} />
    </main>
  );
}

export default App;
