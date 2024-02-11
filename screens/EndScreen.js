import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const EndScreen = ({ navigation, route }) => {
    // Assume 'win' and 'score' are passed via the navigation parameters
    const { win, score } = route.params;

    const handleRestart = () => {
        // Navigate back to the GameScreen or reset the game state
        navigation.navigate('Game');
    };

    const handleGoToMenu = () => {
        // Navigate back to the HomeScreen
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{win ? 'Congratulations!' : 'Game Over!'}</Text>
            <Text style={styles.score}>Your Score: {score}</Text>
            <View style={styles.buttonContainer}>
                <Button title="Restart" onPress={handleRestart} />
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    score: {
        fontSize: 20,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
});

export default EndScreen;
