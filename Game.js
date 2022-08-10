import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
const axios = require('axios');

export default function Game ({navigation}) {

  const [deckID, setDeckID] = useState('');
  const [questionMaster, setQuestionMaster] = useState('');
  const [mates, setMates] = useState([]);
  //linked list?
  const [kingsCount, setKingsCount] = useState(0);


  useEffect(() => {
    axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then((res) => {
      setDeckID(res.data.deck_id);
    })
    .catch((err) => {
      console.log('game err', err);
    })
  }, []);

  return (
      <View style={styles.container}>
        <Text>Game, World!</Text>
        <StatusBar style="auto" />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
