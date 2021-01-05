import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function EzTextLink({title, onPress}) {
    return (
        <View>
            <Text style = {styles.link} onPress = {onPress}>{title}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    link:{
        color: "gray",
        underline: {textDecorationLine: 'underline'},
        fontStyle: "normal",
        fontSize: 15
    }
})
