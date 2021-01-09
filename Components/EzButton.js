import React from 'react'
import { StyleSheet, Text, TouchableOpacity} from 'react-native'
import { 
    useFonts, KronaOne_400Regular 
} from '@expo-google-fonts/krona-one';

export default function EzButton({onPress, title}) {
    let [fontsLoaded, error] = useFonts({
        KronaOne_400Regular,
    })
    return (
        <TouchableOpacity onPress={onPress} style = {styles.outsideContainer}>
            <Text style={styles.insideText}>{title}</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    outsideContainer: {
        width: "90%",
        elevation: 8,
        backgroundColor: "#000000",
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 12,
        justifyContent: "center",
        height: 40,
        marginBottom: 10,
    },
    insideText: {
        fontSize: 12,
        color: "yellow",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
        fontFamily: 'KronaOne_400Regular',
        letterSpacing: 1
    }
    
})
