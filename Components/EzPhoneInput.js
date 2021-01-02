import React from 'react'
import { StyleSheet, View, Text} from 'react-native'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

export default function EzPhoneInput({placeholder, error, ...props}) {
    return (
        <View style = {styles.container}>
            <Text style={{fontWeight: "bold"}}>{placeholder + ':'}</Text>
            <PhoneInput 
                // style={styles.phoneInput} 
                placeholder={placeholder}
                {...props}
            />
            <Text style={styles.error}>{error}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        width: "80%",
        marginBottom: 10,
    },
    phoneInput: {
      borderRadius: 5,
      height: 38,
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
