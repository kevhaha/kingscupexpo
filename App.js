import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Navigator from './Navigation.js';
import {
  setCustomView,
  setCustomTextInput,
  setCustomText,
  setCustomImage,
  setCustomTouchableOpacity
} from 'react-native-global-props';

const customTextProps = {
  style: {
    fontSize: 16,
    fontFamily: 'Optima',
    color: 'black'
  }
};

setCustomText(customTextProps);

export default function App() {

  return (
    <Navigator/>
  );
}
