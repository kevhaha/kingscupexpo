import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text, View } from "react-native";
import { rulesData } from './RulesData.js';

export default function Rules ({navigation}) {

  return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={rulesData}
          renderItem={({ item }) =>
            <View>
              <Text style={styles.card}>{item.card}</Text>
              <Text style={styles.rule}>{item.rule}</Text>
            </View>
          }
          keyExtractor={(item) => item.card}
        />
        <StatusBar style="auto" />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10
  },
  card: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10
  },
  rule: {
    margin: 10
  }
});
