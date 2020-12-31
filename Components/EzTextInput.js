import React from 'react'
import { StyleSheet, TextInput, View, Text} from 'react-native'

export default function EzTextInput({placeholder, ...props}) {
    return (
        <View style = {styles.container}>
            <Text style={{fontWeight: "bold"}}>{placeholder + ':'}</Text>
            <TextInput 
                style={styles.textInput} 
                placeholder={placeholder}
                {...props}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        width: "80%",
        marginBottom: "0.8rem",
    },
    textInput: {
      borderRadius: 5,
      height: "38px",
      borderColor: '#000000',
      borderWidth: 1,
      padding: 10,
      textAlign: 'center',
      fontSize: 15
    }
    
})
