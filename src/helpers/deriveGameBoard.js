export function deriveGameBoard(initialGameBoard, gameTurn) {
  let gameBoard = [...initialGameBoard.map((array) => [...array])];

  for (const item of gameTurn) {
    const { square, player } = item;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}
