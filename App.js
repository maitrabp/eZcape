import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FirebaseConnect from './FirebaseConnect';
import Navigator from './Routes/Homestack';

export default function App() {
      return (
        <Navigator /> //there's screens inside here..
      );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
