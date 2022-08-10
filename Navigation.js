import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home.js';
import Game from './Game.js';
import Rules from './Rules.js';

const Stack = createNativeStackNavigator();

export default function Navigator () {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
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
    </NavigationContainer>
  );
}
