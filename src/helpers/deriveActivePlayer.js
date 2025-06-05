export function deriveActivePlayer(turn) {
  let currentPlayer = "X";
  if (turn.length > 0 && turn[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}
