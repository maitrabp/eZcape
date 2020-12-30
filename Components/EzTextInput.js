import React from 'react'
import { StyleSheet, TextInput} from 'react-native'

export default function EzTextInput({...props}) {
    return (
        <TextInput 
            style={styles.textInput} 
            {...props}
        />
    );
}
const styles = StyleSheet.create({
    textInput: {
      width: "80%",
      borderRadius: 5,
      margin: "1rem",
      height: "38px",
      borderColor: '#000000',
      borderWidth: 1,
      padding: 10,
      textAlign: 'center',
      fontSize: 15
    }
    
})
