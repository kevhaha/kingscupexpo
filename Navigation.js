import React, { useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home.js';
import Game from './Game.js';
import Rules from './Rules.js';
import Players from './Players.js';
// import { PlayersProvider } from './PlayersContext.js';

const Stack = createNativeStackNavigator();

// const PlayersContext = React.createContext({
//   playerArray: ['Test', 'Test2', 'Test3'],
//   setPlayerArray: () => {},
// });

export default function Navigator () {

  // const [playerArray, setPlayerArray] = useState([]);
  // const value = { playerArray, setPlayerArray };

  return (
    <NavigationContainer>
      {/* <PlayersContext.Provider value={value}> */}
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
          />
          <Stack.Screen
            name="Players"
            component={Players}
          />
          <Stack.Screen
            name="Game"
            component={Game}
          />
          <Stack.Screen
            name="Rules"
            component={Rules}
          />
        </Stack.Navigator>
      {/* </PlayersContext.Provider> */}
    </NavigationContainer>
  );
}
