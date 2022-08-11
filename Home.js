import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Image, Button, StyleSheet, Text, View } from 'react-native';

export default function Home ({navigation}) {

  return (
    <>
      <View style={styles.container}>
        <Text style={{fontSize: 32, fontFamily: 'Optima-Bold'}}>King's Qup</Text>
        <StatusBar style="auto" />
      </View>
      <View style={styles.image}>
        <Image
        source={require('./assets/kingsqup.jpg')}
        />
        <StatusBar style="auto" />
      </View>
      <View style={styles.players}>
        <StatusBar style="auto" />
        <Button onPress={()=> navigation.navigate('Players')} title="Add Players!"/>
      </View>
      <View style={styles.rules}>
        <StatusBar style="auto" />
        <Button onPress={()=> navigation.navigate('Rules')} title="Review the Rules of the Game"/>
      </View>
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
  image: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain'
  },
  players: {
    flex: .5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rules: {
    flex: .5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
