import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext } from 'react';
import { FlatList, TextInput, Button, StyleSheet, Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
// import { usePlayers } from './PlayersContext.js';
// import { PlayersContext } from './Navigation.js';

export default function Players ({navigation}) {

  // const { playerArray, setPlayerArray } = usePlayers();
  // const { playerArray, setPlayerArray } = useContext(PlayersContext)

  const [players, setPlayers] = useState(0);
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [player3, setPlayer3] = useState('');
  const [player4, setPlayer4] = useState('');
  const [player5, setPlayer5] = useState('');
  const [player6, setPlayer6] = useState('');
  const [selected, setSelected] = useState(false);
  const [playerArray, setPlayerArray] = useState([]);

  const handleSubmit = () => {
    setSelected(true);
  }

  const handleBegin = () => {
    navigation.navigate('Game', {
      players: playerArray
    })
  }

  useEffect(() => {
    setPlayerArray([player1, player2, player3, player4, player5, player6].filter((player) => player.length > 0));
  }, [selected])

  return (
    <>
      <View style={styles.container}>
        <Text style={{fontSize: 32, fontFamily: 'Optima-Bold'}}>King's Qup</Text>
        <StatusBar style="auto" />
      </View>
      {!selected && <View style={styles.select}>
        <RNPickerSelect
          style={{
            viewContainer: {
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: .2,
              borderRadius: 10,
              marginLeft: 65,
              marginRight: 65,
              padding: 5
            },
            inputIOS: {
              fontSize: 20,
              color: '#007AFF',
            },
            placeholder: {
              fontSize: 20,
              color: '#007AFF',
            }
          }}
          onValueChange={(value) => setPlayers(value)}
          placeholder={{ label: 'Choose How Many Players', value: 0 }}
          items={[
              { label: 'Two Players', value: 2 },
              { label: 'Three Players', value: 3 },
              { label: 'Four Players', value: 4 },
              { label: 'Five Players', value: 5 },
              { label: 'Six Players', value: 6 },
          ]}
          />
      </View>}
      {!selected && <View style={styles.form}>
      {players >= 1 && <TextInput
        style={styles.input}
        onChangeText={setPlayer1}
        value={player1}
        placeholder='Player 1'
      />}
      {players >= 2 && <TextInput
        style={styles.input}
        onChangeText={setPlayer2}
        value={player2}
        placeholder='Player 2'
      />}
      {players >= 3 && <TextInput
        style={styles.input}
        onChangeText={setPlayer3}
        value={player3}
        placeholder='Player 3'
      />}
      {players >= 4 && <TextInput
        style={styles.input}
        onChangeText={setPlayer4}
        value={player4}
        placeholder='Player 4'
      />}
      {players >= 5 && <TextInput
        style={styles.input}
        onChangeText={setPlayer5}
        value={player5}
        placeholder='Player 5'
      />}
      {players >= 6 && <TextInput
        style={styles.input}
        onChangeText={setPlayer6}
        value={player6}
        placeholder='Player 6'
      />}
      </View>}
      {selected && <View style={styles.players}>
        <FlatList
            data={playerArray}
            renderItem={({ item }) =>
              <View>
                <Text style={styles.eachPlayer}>{item}</Text>
              </View>
            }
          />
      </View>}
      {!selected && <View style={styles.submit}>
        <StatusBar style="auto" />
        <Button onPress={handleSubmit} title="Enter Players!"/>
        </View>}
      {selected && <View style={styles.begin}>
        <StatusBar style="auto" />
        <Button onPress={handleBegin} title="Begin Game!"/>
      </View>}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: .5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  select: {
    flex: .2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#fff',
    width: 330,
    fontSize: 16,
    borderWidth: .2,
    borderRadius: 5,
    padding: 5,
    margin: 10
  },
  players: {
    flex: .5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eachPlayer: {
    margin: 10
  },
  submit: {
    flex: .5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  begin: {
    flex: .5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
