import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext } from 'react';
import { FlatList, TouchableWithoutFeedback, Button, Image, StyleSheet, Text, View } from 'react-native';
const axios = require('axios');

export default function Game ({route, navigation}) {

  const players = route.params.players;
  const [questionMaster, setQuestionMaster] = useState('');
  const [deckLoaded, setDeckLoaded] = useState(false);
  const [cardLoaded, setCardLoaded] = useState(false);
  const [currentCard, setCurrentCard] = useState('');
  const [currentCardValue, setCurrentCardValue] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState(players[0]);
  const [playerIndex, setPlayerIndex] = useState(0);
  const [kingsCount, setKingsCount] = useState(0);
  const [cardCount, setCardCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  // const [mates, setMates] = useState([]);
  // linked list?

  async function handleDraw() {
    try {
      setCardLoaded(false);
      const response = await axios.get(`http://localhost:3000/draw`)
      setCardCount(cardCount + 1);
      setCurrentCard(response.data.image);
      if (playerIndex >= players.length-1) {
        setPlayerIndex(0);
      } else {
        setPlayerIndex(playerIndex + 1);
      }
      setCurrentPlayer(players[playerIndex]);
      setCurrentCardValue(response.data.value);
      if (response.data.value === "KING") {
        setKingsCount(kingsCount + 1);
      }
      setCardLoaded(true);
      }
    catch { err =>
      console.log(err);
     }
    }

  useEffect(() => {
    if (currentCardValue === "QUEEN") {
      setQuestionMaster(currentPlayer);
    }
  }, [currentCardValue])

  useEffect(() => {
    if (kingsCount === 4) {
      setGameOver(true);
    };
  }, [kingsCount])

  useEffect(() => {
    axios.get(`http://localhost:3000/cards`)
    .then((res) => {
      setDeckLoaded(true);
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  return (
    <View style={styles.container}>
      {gameOver &&
      <View style={styles.top}>
        <Text>Player: {currentPlayer} </Text>
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
          <TouchableWithoutFeedback onPress={handleDraw}>
            <View style={styles.card}>
              <Image
                style={{ width: 226, height: 314}}
                source={{
                  uri: currentCard
                }}
              />
            </View>
          </TouchableWithoutFeedback>}
          <View style={styles.gameInfo}>
            <Text>Turn: {currentPlayer}</Text>
            {/* <Text>Mates: {mates}</Text> */}
            <Text>Question Master: {questionMaster}</Text>
            <Text>Kings' Count: {kingsCount}</Text>
          </View>
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
  gameInfo: {
    flex: .4,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
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

// PRE DB WITH DECK OF CARDS API

    // const [deckID, setDeckID] = useState('');

    // axios.get(`http://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
    // .then((res) => {
    //   setCardCount(cardCount + 1);
    //   setCurrentCard(res.data.cards[0].image);
    //   setCurrentCardValue(res.data.cards[0].value);
    //   if (res.data.cards[0].value === "KING") {
    //     setKingsCount(kingsCount + 1);
    //   }
    // })

    // axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    // .then((res) => {
    //   setDeckID(res.data.deck_id);
    // })
