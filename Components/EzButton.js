import React from 'react'
import { StyleSheet, Text, TouchableOpacity} from 'react-native'

export default function EzButton({onPress, title}) {
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
        paddingVertical: 10,
        paddingHorizontal: 12,
        justifyContent: "center",
        height: 35,
        marginBottom: 10
    },
    insideText: {
        fontSize: 12,
        color: "yellow",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
        letterSpacing: 1
    }
    
})
