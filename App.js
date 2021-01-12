import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FirebaseConnect from './FirebaseConnect';
import Navigator from './Routes/Homestack';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

//Load Fonts
const getFonts = () => Font.loadAsync({
    'Krona-Regular': require("./Assets/Fonts/KronaOne-Regular.ttf"),
    'MPlus-Regular': require("./Assets/Fonts/MPLUS1p-Regular.ttf")
});


export default function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    if(fontsLoaded){
      return (
        <Navigator /> //there's screens inside here..
      );
    } else {
      return (
        <AppLoading 
          startAsync={getFonts}
          onFinish = {() => setFontsLoaded(true)}
          onError={console.warn}
        />
      )
    }
      
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
