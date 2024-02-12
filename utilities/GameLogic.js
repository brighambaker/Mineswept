/**
 * \author  Brigham Baker
 * \file    GameLogic.js
 * \brief   contains the game logic for how the game will work
 **/
import { GAME_DIFFICULTIES } from './Constants';

// Initializes the game board based on the selected difficulty
export const initializeBoard = (difficulty) => {
    const { grid, mines } = GAME_DIFFICULTIES[difficulty];
    let board = [];

    // Create a grid of cells
    for (let i = 0; i < grid; i++) {
        let row = [];
        for (let j = 0; j < grid; j++) {
            row.push({ isMine: false, isRevealed: false });
        }
        board.push(row);
    }

    // Randomly place mines on the board
    let minesPlaced = 0;
    while (minesPlaced < mines) {
        let row = Math.floor(Math.random() * grid);
        let col = Math.floor(Math.random() * grid);
        if (!board[row][col].isMine) {
            board[row][col].isMine = true;
            minesPlaced++;
        }
    }

    return board;
};

// Reveals the cell at the given row and column
export const revealCell = (board, row, col) => {
    
    const newBoard = board.map(currentRow => [...currentRow]);
    const cell = newBoard[row][col];

    // If the cell is already revealed or is a mine, return the current state
    if (!cell.isRevealed) {
        cell.isRevealed = true; // Mark the cell as revealed
        newBoard[row][col] = cell; // Update the cell in the board
    }

    // Reveal the cell and update the board
    cell.isRevealed = true;

    return { board: newBoard, gameOver: cell.isMine, win: checkWin(newBoard) };
};


// Checks if the player has won by revealing all non-mine cells
export const checkWin = (board) => {
    for (let row of board) {
        for (let cell of row) {
            if (!cell.isMine && !cell.isRevealed) {
                return false; // If any non-mine cell is not revealed, the game is not won
            }
        }
    }
    return true; // Player wins if all non-mine cells are revealed
};
