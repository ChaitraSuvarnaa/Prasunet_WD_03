document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset');
    const modalResetButton = document.getElementById('modal-reset');
    const resultModal = document.getElementById('result-modal');
    const resultMessage = document.getElementById('result-message');
    const modeRadios = document.querySelectorAll('input[name="mode"]');
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let gameMode = 'human'; // Default mode
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

    const handleCellClick = (event) => {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameState[clickedCellIndex] !== '' || checkWin()) {
            return;
        }

        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;

        if (checkWin()) {
            showResult(`Player ${currentPlayer} has won!`);
        } else if (!gameState.includes('')) {
            showResult('Game ended in a draw!');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (gameMode === 'computer' && currentPlayer === 'O') {
                setTimeout(computerMove, 500);
            }
        }
    };

    const computerMove = () => {
        const emptyCells = gameState.map((val, index) => val === '' ? index : null).filter(val => val !== null);
        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        gameState[randomIndex] = 'O';
        cells[randomIndex].textContent = 'O';

        if (checkWin()) {
            showResult('Player O (Computer) has won!');
        } else if (!gameState.includes('')) {
            showResult('Game ended in a draw!');
        } else {
            currentPlayer = 'X';
        }
    };

    const checkWin = () => {
        return winningConditions.some(condition => {
            return condition.every(index => {
                return gameState[index] === currentPlayer;
            });
        });
    };

    const resetGame = () => {
        gameState = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        cells.forEach(cell => {
            cell.textContent = '';
        });
        resultModal.style.display = 'none';
    };

    const showResult = (message) => {
        resultMessage.textContent = message;
        resultModal.style.display = 'block';
    };

    const handleModeChange = (event) => {
        gameMode = event.target.value;
        resetGame();
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
    modalResetButton.addEventListener('click', resetGame);
    modeRadios.forEach(radio => radio.addEventListener('change', handleModeChange));
});
