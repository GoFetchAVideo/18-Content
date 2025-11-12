// Tic Tac Toe Game (VS CPU)
let board = Array(9).fill(null);
let humanPlayer = 'X';
let cpuPlayer = 'O';
let isGameOver = false;

function playTicTacToe() {
  board = Array(9).fill(null);
  isGameOver = false;
  // Human (X) always goes first
  renderTicTacToe();
  document.getElementById("output").innerHTML += "<p>You are X. Click a square to start!</p>";
}

function renderTicTacToe() {
  let boardHtml = '<div class="tic-tac-toe-board">';
  for (let i = 0; i < 9; i++) {
    // Disable clicks if game is over or square is filled
    const isDisabled = isGameOver || board[i];
    boardHtml += `<div class="square ${board[i] ? 'filled' : ''}" data-index="${i}" onclick="handleTicTacToeClick(${i})">${board[i] || ''}</div>`;
  }
  boardHtml += '</div>';

  let winner = calculateTicTacToeWinner(board);
  let statusText;

  if (winner) {
    statusText = winner === humanPlayer ? "Congratulations! You Win!" : "The CPU Wins!";
    isGameOver = true;
  } else if (board.every(cell => cell !== null)) {
    statusText = "It's a Draw!";
    isGameOver = true;
  } else {
    // Only show current player if game is not over
    const currentPlayer = board.filter(cell => cell !== null).length % 2 === 0 ? humanPlayer : cpuPlayer;
    statusText = `Your Turn: ${humanPlayer}`;
  }

  document.getElementById("output").innerHTML = `<h3>${statusText}</h3>` + boardHtml;
  
  // If it's the CPU's turn, make a move
  if (!isGameOver && board.filter(cell => cell !== null).length % 2 !== 0) {
    setTimeout(cpuMove, 700); // Add a small delay for better UX
  }
}

function handleTicTacToeClick(i) {
  if (isGameOver || board[i]) {
    return;
  }
  
  // Human Move
  board[i] = humanPlayer;
  renderTicTacToe();
}

function cpuMove() {
  if (isGameOver) return;
  
  const move = findBestMove(board, cpuPlayer);
  if (move !== null) {
    board[move] = cpuPlayer;
    renderTicTacToe();
  }
}

// Simple CPU Logic: Prioritizes win > block > center/corners/sides
function findBestMove(currentBoard, player) {
  const opponent = player === humanPlayer ? cpuPlayer : humanPlayer;
  const emptySquares = currentBoard.map((val, index) => val === null ? index : null).filter(val => val !== null);
  
  // 1. Check for immediate winning move
  for (const i of emptySquares) {
    let nextBoard = [...currentBoard];
    nextBoard[i] = player;
    if (calculateTicTacToeWinner(nextBoard) === player) {
      return i;
    }
  }

  // 2. Check for immediate blocking move (stop opponent from winning)
  for (const i of emptySquares) {
    let nextBoard = [...currentBoard];
    nextBoard[i] = opponent;
    if (calculateTicTacToeWinner(nextBoard) === opponent) {
      return i;
    }
  }

  // 3. Take the center (index 4)
  if (emptySquares.includes(4)) {
    return 4;
  }

  // 4. Take a random corner (indices 0, 2, 6, 8)
  const corners = [0, 2, 6, 8].filter(i => emptySquares.includes(i));
  if (corners.length > 0) {
    return corners[Math.floor(Math.random() * corners.length)];
  }

  // 5. Take a random side (indices 1, 3, 5, 7)
  const sides = [1, 3, 5, 7].filter(i => emptySquares.includes(i));
  if (sides.length > 0) {
    return sides[Math.floor(Math.random() * sides.length)];
  }

  // 6. Fallback (shouldn't happen unless board is full)
  return emptySquares.length > 0 ? emptySquares[0] : null;
}

function calculateTicTacToeWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// Memory Game (New Interactive, Visual, and Descriptive Implementation)
const CARD_ICONS = ['⭐', '💖', '🍀', '🍕', '🎶', '💡'];
let memoryBoard = []; // Contains the shuffled icons
let flippedIndices = []; // Indices of the currently two flipped cards
let matchedIndices = []; // Indices of cards that have been matched
let awaitingSecondClick = false;
let statusMessage = "Click 'Play Memory Game' to begin!";

function playMemoryGame() {
  // Create a 12-card deck (6 pairs)
  memoryBoard = [...CARD_ICONS, ...CARD_ICONS];
  
  // Shuffle cards (Fisher-Yates)
  for (let i = memoryBoard.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [memoryBoard[i], memoryBoard[j]] = [memoryBoard[j], memoryBoard[i]];
  }
  
  flippedIndices = [];
  matchedIndices = [];
  awaitingSecondClick = false;
  statusMessage = "Select your first card!";
  renderMemoryGame();
}

function renderMemoryGame() {
  let gameHtml = '<div class="memory-grid">';
  
  for (let i = 0; i < memoryBoard.length; i++) {
    const isMatched = matchedIndices.includes(i);
    const isFlipped = flippedIndices.includes(i) || isMatched;
    const content = isFlipped ? memoryBoard[i] : '?';
    
    // Determine card class based on state
    let cardClass = 'card';
    if (isMatched) {
        cardClass += ' matched';
    } else if (flippedIndices.includes(i)) {
        cardClass += ' flipped';
    } else if (awaitingSecondClick) {
        // Visually disable non-flipped cards during the check delay
        cardClass += ' disabled';
    }

    // Disable clicking if card is matched, already flipped, or during the check delay
    const onClickAction = (isFlipped || awaitingSecondClick) ? 'void(0)' : `handleMemoryClick(${i})`;

    gameHtml += `<div class="${cardClass}" data-index="${i}" onclick="${onClickAction}"><span>${content}</span></div>`;
  }
  gameHtml += '</div>';

  document.getElementById("output").innerHTML = `<h3>${statusMessage}</h3>` + gameHtml;
}

function handleMemoryClick(index) {
  // Ignore clicks if the card is already flipped/matched or if we are awaiting the check
  if (flippedIndices.includes(index) || matchedIndices.includes(index) || awaitingSecondClick) {
    return;
  }
  
  // Flip the card
  flippedIndices.push(index);
  
  if (flippedIndices.length === 1) {
    // First card flipped
    statusMessage = "Now select your second card.";
    renderMemoryGame();
    
  } else if (flippedIndices.length === 2) {
    // Second card flipped, now check for match
    const [idx1, idx2] = flippedIndices;
    awaitingSecondClick = true; // Block further clicks
    
    if (memoryBoard[idx1] === memoryBoard[idx2]) {
      // It's a match!
      statusMessage = "It's a MATCH! Find the next pair.";
      
      // Permanently mark as matched
      matchedIndices.push(idx1, idx2);
      
      // Clear flipped cards and allow new clicks after a brief pause
      setTimeout(() => {
        flippedIndices = [];
        awaitingSecondClick = false;
        
        // Check for win condition
        if (matchedIndices.length === memoryBoard.length) {
          statusMessage = "🎉 CONGRATULATIONS! You won the Memory Game!";
        } else {
          statusMessage = "Select your first card!";
        }
        renderMemoryGame();
      }, 700);
      
    } else {
      // Not a match, flip back
      statusMessage = "No match! They will flip back.";
      
      // Flip the cards back after a delay
      setTimeout(() => {
        flippedIndices = [];
        awaitingSecondClick = false;
        statusMessage = "Select your first card!";
        renderMemoryGame();
      }, 1500); // 1.5 second delay to let the user see the cards
    }
    
    // Initial render after second click to show both cards
    renderMemoryGame();
  }
}

// Rock Paper Scissors Game (unchanged)
function playRockPaperScissors() {
  const options = ["Rock", "Paper", "Scissors"];
  const userChoice = prompt("Choose Rock, Paper, or Scissors:");
  
  // Basic input validation
  if (!userChoice) {
      document.getElementById("output").innerHTML = "<p>Game cancelled.</p>";
      return;
  }
  const normalizedUserChoice = userChoice.trim().charAt(0).toUpperCase() + userChoice.trim().slice(1).toLowerCase();
  if (!options.includes(normalizedUserChoice)) {
      document.getElementById("output").innerHTML = "<p>Invalid choice. Please try again!</p>";
      return;
  }
  
  const computerChoice = options[Math.floor(Math.random() * options.length)];
  let result = "";

  if (normalizedUserChoice === computerChoice) {
    result = "It's a tie!";
  } else if (
    (normalizedUserChoice === "Rock" && computerChoice === "Scissors") ||
    (normalizedUserChoice === "Paper" && computerChoice === "Rock") ||
    (normalizedUserChoice === "Scissors" && computerChoice === "Paper")
  ) {
    result = "You win!";
  } else {
    result = "You lose!";
  }

  document.getElementById("output").innerHTML = `
    <p>You chose: ${normalizedUserChoice}</p>
    <p>Computer chose: ${computerChoice}</p>
    <p><strong>Result: ${result}</strong></p>
  `;
}