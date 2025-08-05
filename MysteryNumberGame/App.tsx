import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  Keyboard,
} from 'react-native';

export default function App() {
  const generateRandomNumber = () => Math.floor(Math.random() * 100) + 1;

  const [secretNumber, setSecretNumber] = useState(generateRandomNumber());
  const [userGuess, setUserGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [guessCount, setGuessCount] = useState(0);

  const handleGuess = () => {
    const guess = parseInt(userGuess);

    if (isNaN(guess) || guess < 1 || guess > 100) {
      setFeedback('Please enter a number between 1 and 100.');
      return;
    }

    setGuessCount(prev => prev + 1);

    if (guess < secretNumber) {
      setFeedback('Too low! Try again.');
    } else if (guess > secretNumber) {
      setFeedback('Too high! Try again.');
    } else {
      setFeedback('Congratulations! You\'ve guessed the correct number!');
    }

    setUserGuess('');
    Keyboard.dismiss();
  };

  const restartGame = () => {
    setSecretNumber(generateRandomNumber());
    setUserGuess('');
    setFeedback('');
    setGuessCount(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mystery Number Challenge</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your guess"
        keyboardType="number-pad"
        value={userGuess}
        onChangeText={setUserGuess}
      />

      <TouchableHighlight style={styles.button} onPress={handleGuess} underlayColor="#005">
        <Text style={styles.buttonText}>Submit Guess</Text>
      </TouchableHighlight>

      {feedback !== '' && <Text style={styles.feedback}>{feedback}</Text>}
      <Text style={styles.count}>Guesses: {guessCount}</Text>

      <TouchableHighlight style={styles.restartButton} onPress={restartGame} underlayColor="#700">
        <Text style={styles.buttonText}>Restart Game</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderColor: '#000',
    borderWidth: 1,
    padding: 12,
    fontSize: 18,
    borderRadius: 6,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#0077cc',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  restartButton: {
    backgroundColor: '#aa0000',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  feedback: {
    fontSize: 18,
    marginVertical: 15,
    textAlign: 'center',
  },
  count: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
});