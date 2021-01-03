import React from 'react'
import { StyleSheet, TextInput, View, Text} from 'react-native'
import * as Animatable from 'react-native-animatable';

export default function EzTextInput({placeholder, error, ...props}) {
    return (
        <View style = {styles.container}>
            <Text style={{fontWeight: "bold"}}>{placeholder + ':'}</Text>
            <TextInput 
                style={styles.textInput} 
                placeholder={placeholder}
                {...props}
            />
            {error ? <Animatable.Text animation="slideInLeft" duration={500} style={styles.error}>{error}</Animatable.Text>: error=null}
            
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        width: "90%",
        marginBottom: 10,
    },
    textInput: {
      borderRadius: 5,
      height: 39,
      borderColor: '#000000',
      borderWidth: 1,
      padding: 10,
      textAlign: 'center',
      fontSize: 15
    },
    error: {
        color: "red",
        fontWeight: "normal",
        fontStyle: "italic",
        fontSize: 15
    }
    
})
