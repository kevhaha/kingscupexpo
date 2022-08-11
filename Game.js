import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { TouchableHighlight, Button, Image, StyleSheet, Text, View } from 'react-native';
const axios = require('axios');

export default function Game ({navigation}) {

  const [deckID, setDeckID] = useState('');
  const [turn, setTurn] = useState('');
  const [questionMaster, setQuestionMaster] = useState('');
  const [mates, setMates] = useState([]);
  const [deckLoaded, setDeckLoaded] = useState(false);
  const [cardLoaded, setCardLoaded] = useState(false);
  const [currentCard, setCurrentCard] = useState('');
  //linked list?
  const [kingsCount, setKingsCount] = useState(0);
  const [cardCount, setCardCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleDraw = () => {
    setCardLoaded(false);
    setCardCount(cardCount + 1);
    axios.get(`http://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
    .then((res) => {
      console.log('draw', res.data.cards[0]);
      if (res.data.cards[0].value === "KING") {
        setKingsCount(kingsCount + 1);
      }
      setCurrentCard(res.data.cards[0].image);
      return currentCard;
    })
    .then(() => {
      setCardLoaded(true);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    if (kingsCount === 4) {
      setGameOver(true);
    };
  }, [kingsCount])

  useEffect(() => {
    axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then((res) => {
      setDeckID(res.data.deck_id);
    })
    .then((res) => {
      setDeckLoaded(true);
    })
    .catch((err) => {
      console.log('game err', err);
    })
  }, []);

  return (
    <View style={styles.container}>
      {gameOver &&
      <View style={styles.top}>
        <Text>Player: </Text>
      </View>}
      <View style={styles.centerContainer}>
        {!gameOver &&
        <View style={styles.game}>
          <Image
            source={require('./assets/solocup.png')}
            resizeMode="cover"
          >
          </Image>
          {cardCount === 0 &&
          <View style={styles.button}>
            <Button
              onPress={handleDraw}
              title="BEGIN GAME"
            />
          </View>}
          {cardCount > 0 && cardLoaded &&
          <TouchableHighlight onPress={handleDraw} style={styles.card}>
            <Image
              style={{ width: 226, height: 314}}
              source={{
                uri: currentCard
              }}
            />
          </TouchableHighlight>}
          <Text>Mates: {mates}</Text>
          <Text>Question Master: {questionMaster}</Text>
          <Text>Kings' Count: {kingsCount}</Text>
        </View>}
        {gameOver &&
        <View style={styles.over}>
          {cardCount > 0 && cardLoaded &&
            <Image
              style={{ width: 226, height: 314}}
              source={{
                uri: currentCard
              }}
            />}
          <Text style={styles.over}>GAME OVER, TAKE A SHOT!</Text>
        </View>}
        <StatusBar style="auto" />
      </View>
      {gameOver &&
      <View style={styles.bottom}>
        <Text>Kings' Count: {kingsCount}</Text>
      </View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  centerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  game: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    position: 'absolute',
    borderRadius: 12,
    borderWidth: .2,
    borderColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    borderRadius: 12,
    borderWidth: .2,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  over: {
    position: 'absolute',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  top: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
