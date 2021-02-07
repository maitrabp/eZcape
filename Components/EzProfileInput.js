import React from 'react'
import { StyleSheet, TextInput, View, Text} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable';

export default function EzProfileInput({placeholder, error, updated, iconName, ...props}) {
    return (
        <View style={{width:"85%", marginBottom: "6%"}}>
            <View style = {styles.frame}>
                <View style = {{borderRightWidth: 0.5, borderRightColor: "#FFBF00", paddingRight: 10, justifyContent: 'center'}}>
                    <Ionicons name={iconName} size={25} color="#FFBF00"></Ionicons>
                </View>
                <TextInput 
                    style={styles.textInput}
                    placeholder={placeholder}
                    {...props}
                />
                {updated?
                <View style = {{justifyContent: 'center'}}>
                    <Ionicons style={{justifyContent: "center"}} name="checkmark-outline" size={18} color="green"></Ionicons>
                </View>:
                updated=null}
            </View>
            {error ? <Animatable.Text animation="slideInLeft" duration={500} style={styles.error}>{error}</Animatable.Text> : <Text style={styles.error}></Text>}
        </View>
    )
}
const styles = StyleSheet.create({
    frame: {
        flexDirection: 'row',
        borderBottomColor: "#FFBF00",
        borderBottomWidth: 0.5,
    },
    textInput: {
        width: "100%",
        height: 40,
        paddingHorizontal: 8,
        paddingVertical: 8,
        textAlign: 'left',
        fontSize: 14
    },
    error: {
        color: "red",
        fontWeight: "normal",
        fontSize: 15
    },
})
