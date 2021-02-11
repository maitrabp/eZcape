import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Image } from 'react-native';
import {AuthProvider} from './Contexts/AuthProvider'
import Router from './Router'
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

export default function App() {
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  async function _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require('./Assets/loginBackground.jpg'),
      require('./Assets/EmailVerificationGraphic.png'),
      require('./Assets/default_user.png'),
      require('./Assets/defaultUser.png'),
      require('./Assets/sidebarBackground.png'),
      require('./Assets/sidebarBackground2.png'),
      require('./Assets/IMG-2595.jpg')
    ]);

    const fontAssets = cacheFonts([
      { 'Krona-Regular': require("./Assets/Fonts/KronaOne-Regular.ttf") },
      { 'MPlus-Regular': require("./Assets/Fonts/MPLUS1p-Regular.ttf") },
      { 'Spartan-Medium': require("./Assets/Fonts/Spartan-Medium.ttf")}
    ]);

    await Promise.all([...imageAssets, ...fontAssets]);
  }

  if (assetsLoaded) {
    return (
      <AuthProvider>
          <Router/>
      </AuthProvider>
    );
  } else {
    return (
      <AppLoading
        startAsync={_loadAssetsAsync}
        onFinish={() => setAssetsLoaded(true)}
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
