let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameMode = 'human';
let gameOver = false;

function startGame(mode) {
  gameMode = mode;
  resetGame();
  document.getElementById("status").textContent = `Current Player: ${currentPlayer}`;
}

function handleClick(index) {
  if (gameOver || board[index]) return;

  board[index] = currentPlayer;
  document.getElementsByClassName("cell")[index].textContent = currentPlayer;

  if (checkWin()) {
    document.getElementById("status").textContent = `Player ${currentPlayer} Wins!`;
    gameOver = true;
    return;
  }

  if (board.every(cell => cell)) {
    document.getElementById("status").textContent = "It's a Draw!";
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  document.getElementById("status").textContent = `Current Player: ${currentPlayer}`;

  if (gameMode === 'computer' && currentPlayer === 'O') {
    computerMove();
  }
}

function computerMove() {
  let availableCells = board.map((cell, idx) => (cell === null ? idx : null)).filter(val => val !== null);
  let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];

  board[randomIndex] = currentPlayer;
  document.getElementsByClassName("cell")[randomIndex].textContent = currentPlayer;

  if (checkWin()) {
    document.getElementById("status").textContent = `Player ${currentPlayer} Wins!`;
    gameOver = true;
    return;
  }

  if (board.every(cell => cell)) {
    document.getElementById("status").textContent = "It's a Draw!";
    gameOver = true;
    return;
  }

  currentPlayer = 'X';
  document.getElementById("status").textContent = `Current Player: ${currentPlayer}`;
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function resetGame() {
  board.fill(null);
  currentPlayer = 'X';
  gameOver = false;
  Array.from(document.getElementsByClassName("cell")).forEach(cell => cell.textContent = '');
  document.getElementById("status").textContent = `Current Player: ${currentPlayer}`;
}
