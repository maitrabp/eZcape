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
        elevation: 8,
        backgroundColor: "#000000",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width: "80%",
        marginTop: "1rem"
    },
    insideText: {
        fontSize: 10,
        color: "yellow",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
    
})
