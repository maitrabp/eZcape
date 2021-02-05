import React from 'react'
import { StyleSheet, TextInput, View, Text} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable';

export default function EzProfileInput({placeholder, iconName, ...props}) {
    return (
        <View style = {styles.frame}>
            <View style = {{borderRightWidth: 0.5, borderRightColor: "#FFBF00", paddingRight: 10, justifyContent: 'center'}}>
                <Ionicons name={iconName} size={25} color="#FFBF00"></Ionicons>
            </View>
            <TextInput 
                style={styles.textInput}
                placeholder={placeholder}
                {...props}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    frame: {
        width: "85%",
        flexDirection: 'row',
        borderBottomColor: "#FFBF00",
        borderBottomWidth: 0.5,
        marginBottom: "8%"
    },
    textInput: {
        width: "100%",
        height: 40,
        paddingHorizontal: 8,
        paddingVertical: 8,
        textAlign: 'left',
        fontSize: 14
    }
})
