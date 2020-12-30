import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default function Login() {
    return (
        <View>
            <Text style={styles.container}>Login</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });