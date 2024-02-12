/**
 * \author  Brigham Baker
 * \file    EndScreen.js
 * \brief   this file details how the end screen will look. Gives parameters for which end screen message you will receive.
 **/

import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const EndScreen = ({ route, navigation }) => {
    const { score, endReason } = route.params;

    let message;
    if (endReason === 'win') {
        message = "Congratulations! You've cleared all mines!";
    } else if (endReason === 'lose') {
        message = "Game Over! You hit a mine.";
    } else if (endReason === 'quit') {
        message = "Chicken! Better luck next time!";
    }

    { /** const handleRestart = () => {
        // Navigate back to the GameScreen or reset the game state
        navigation.navigate('Game');
    }; **/}

    const handleGoToMenu = () => {
        // Navigate back to the HomeScreen
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.message}>{message}</Text>
            <Text style={styles.score}>Your Score: {score}</Text>
            <View style={styles.buttonContainer}>
                {/** <Button title="Restart" onPress={handleRestart} />**/}
                <Button title="Main Menu" onPress={handleGoToMenu} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    message: {
        fontSize: 24,
        textAlign: 'center',
        margin: 20,
    },
    score: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
});

export default EndScreen;
