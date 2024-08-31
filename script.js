const cells = document.querySelectorAll('[data-cell]');
const messageElement = document.getElementById('message');
const score1Element = document.getElementById('score1');
const score2Element = document.getElementById('score2');
const backgroundMusic = document.getElementById('backgroundMusic');
const playAgainButton = document.getElementById('playAgain');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let score1 = 0;
let score2 = 0;
let isGameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(event) {
    const cell = event.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (board[cellIndex] !== '' || !isGameActive) return;

    board[cellIndex] = currentPlayer;
    cell.innerText = currentPlayer;

    if (checkWin()) {
        handleWin();
    } else if (board.includes('')) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    } else {
        handleTie();
    }
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return board[index] === currentPlayer;
        });
    });
}

function handleWin() {
    messageElement.innerText = `Player ${currentPlayer} wins!`;
    messageElement.classList.add('winner');
    playAgainButton.classList.remove('hidden');

    if (currentPlayer === 'X') {
        score1++;
        score1Element.innerText = score1;
    } else {
        score2++;
        score2Element.innerText = score2;
    }

    isGameActive = false;
}

function handleTie() {
    messageElement.innerText = "It's a TIE!";
    messageElement.classList.add('tie');
    playAgainButton.classList.remove('hidden');
    isGameActive = false;
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => (cell.innerText = ''));
    isGameActive = true;
    messageElement.classList.remove('winner', 'tie');
    messageElement.innerText = '';
    playAgainButton.classList.add('hidden');
    currentPlayer = 'X';
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
playAgainButton.addEventListener('click', resetGame);
backgroundMusic.play();
