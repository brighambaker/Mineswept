/**
 * \author  Brigham Baker
 * \file    HomeScreen.js
 * \brief   contains the code for the home screen. Shows title, has an instruction pop up and Difficulty selector.
 **/


import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
    const [difficulty, setDifficulty] = useState('Beginner'); // Default difficulty
    const [modalVisible, setModalVisible] = useState(false);

    // Function to start the game with the selected difficulty
    const startGame = () => {
        navigation.navigate('Game', { difficulty: difficulty });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>MineSwept</Text>

            {/* Game Instructions Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Click on a cell to reveal if it is safe or unsafe. If it is safe, it will turn green.
                                    If unsafe, its Game Over. Your score will increase for each safe cell in a row you get.</Text>
                        <Button title="Close" onPress={() => setModalVisible(!modalVisible)} />
                    </View>
                </View>
            </Modal>

            {/* Instructions Button */}
            <Button title="Instructions" onPress={() => setModalVisible(true)} />

            {/* Difficulty Selection */}
            <Text style={styles.subtitle}>Select Difficulty:</Text>
            <TouchableOpacity onPress={() => setDifficulty('Beginner')}>
                <Text style={difficulty === 'Beginner' ? styles.selectedDifficulty : styles.difficulty}>Beginner</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setDifficulty('Intermediate')}>
                <Text style={difficulty === 'Intermediate' ? styles.selectedDifficulty : styles.difficulty}>Intermediate</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setDifficulty('Advanced')}>
                <Text style={difficulty === 'Advanced' ? styles.selectedDifficulty : styles.difficulty}>Advanced</Text>
            </TouchableOpacity>

            {/* Start Game Button */}
            <Button title="Start Game" onPress={startGame} />
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        margin: 10,
    },
    difficulty: {
        margin: 5,
    },
    selectedDifficulty: {
        margin: 5,
        fontWeight: 'bold',
        color: 'blue',
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default HomeScreen;
