import React, { useState, useEffect } from 'react';
import {
    Button, View, Text, TouchableOpacity,
    StyleSheet, Alert, Dimensions
} from 'react-native';
import { initializeBoard, revealCell, checkWin } from '../utilities/GameLogic';

const GameScreen = ({ route, navigation }) => {
    const { difficulty } = route.params;
    if (!difficulty) {
        console.log('Difficulty is undefined')
    }
    const [board, setBoard] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [win, setWin] = useState(false);
    const [score, setScore] = useState(0);
    const [currentPoints, setCurrentPoints] = useState(1); // Points for the next safe cell click

    useEffect(() => {
        setBoard(initializeBoard(difficulty));
    }, [difficulty]);


    const handleCellPress = (row, col) => {
        const { board: newBoard, gameOver, win } = revealCell(board, row, col);
        const cell = newBoard[row][col];

        // Since revealCell marks the cell as revealed, check if it's not a mine to update the score.
        // The check for !cell.isRevealed is no longer necessary here since revealCell already handled it.
        if (!cell.isMine) {
            setScore((prevScore) => prevScore + currentPoints);
            setCurrentPoints(currentPoints * 2); // Double the points for the next safe cell
        } else {
            // If a mine is hit, reset points and handle game over scenario
            setCurrentPoints(1);
            // Optionally, handle gameOver logic here as well
        }

        setBoard(newBoard); // Update the board state to trigger a re-render

        if (gameOver || win) {
            setGameOver(gameOver);
            setWin(win);
            endGame(gameOver, win);
            setCurrentPoints(1); // Reset for a new game
        }
    };


    const endGame = (gameOver, win) => {
        let endReason = win ? 'win' : 'lose';
        navigation.navigate('End', { score: score, endReason: endReason });
    };

    const goToMainMenu = () => {
        navigation.navigate('Home');
    };

    const quitGame = () => {
        navigation.navigate('End', { score: score, endReason: 'quit' });
    };


    return (
        <View style={styles.container}>
            {/* Instructions Text Box */}
            <View style={styles.instructionsContainer}>
                <Text style={styles.instructionsText}>
                    Try to reveal all the safe spaces without hitting a mine. Tap a cell to reveal what's underneath!
                </Text>
                {/* Score Display */}
                <Text style={styles.scoreDisplay}>Score: {score}</Text>
            </View>
            {/* Game Board */}
            <View style={styles.boardContainer}>
                {board.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                        {row.map((cell, cellIndex) => (
                            <TouchableOpacity
                                key={cellIndex}
                                style={[styles.cell, cell.isRevealed ? (cell.isMine ? styles.mineCell : styles.safeCell) : {}]}
                                onPress={() => handleCellPress(rowIndex, cellIndex)}
                                disabled={cell.isRevealed || gameOver}
                            />
                        ))}
                    </View>
                ))}
            </View>
            <View style={styles.navigationButtons}>
                <Button title="Main Menu" onPress={goToMainMenu} />
                <Button title="Quit" onPress={quitGame} color="red" />
            </View>
        </View>
    );
};

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        height: windowHeight * 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        paddingTop: 20,
    },
    instructionsText: {
        fontSize: 16,
        textAlign: 'center',
        paddingHorizontal: 10,
        marginTop: 20,
    },
    boardContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        width: 30,
        height: 30,
        borderWidth: 1,
        borderColor: '#000',
    },
    mineCell: {
        backgroundColor: 'red',
    },
    safeCell: {
        backgroundColor: 'green',
    },
    navigationButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: '100%',
        paddingHorizontal: 20,
    },
    scoreDisplay: {
        marginTop: 10, 
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default GameScreen;
