let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let xWins = 0;
let oWins = 0;

// Win conditions
const winningConditions = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]  
];

const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restart-button');
const xWinsDisplay = document.getElementById('x-wins');
const oWinsDisplay = document.getElementById('o-wins');

// Function to handle cell clicks
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedIndex = clickedCell.getAttribute('data-index');

    // If the cell is already clicked or the game is over, do nothing
    if (board[clickedIndex] !== "" || !gameActive) {
        return;
    }

    // Update the game state
    board[clickedIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    
    checkResult();
}

// Function to check if a player has won or if the game is a draw
function checkResult() {
    let roundWon = false;

    // Check all winning conditions
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] === "" || board[b] === "" || board[c] === "") {
            continue;
        }
        if (board[a] === board[b] && board[b] === board[c]) {
            roundWon = true;
            break;
        }
    }

    // If a player has won
    if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer} has won!`;
        gameActive = false;

        // Update score text
        if (currentPlayer === "X") { 
            xWins++;
            xWinsDisplay.textContent = xWins;
        } else {
            oWins++;
            oWinsDisplay.textContent = oWins;
        }

        return;
    }

    // Check for a draw
    if (!board.includes("")) {
        statusDisplay.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
}

// Function to restart the game
function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;

    cells.forEach(cell => {
        cell.textContent = "";
    });
}

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

statusDisplay.textContent = `It's ${currentPlayer}'s turn`;