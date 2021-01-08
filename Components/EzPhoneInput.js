import React, {useState} from 'react'
import { StyleSheet, TextInput, View, Text, TouchableOpacity} from 'react-native'
import * as Animatable from 'react-native-animatable';
import EzCountryPicker from '../Components/EzCountryPicker'

export default function EzPhoneInput({placeholder, error, ...props}) {
    //make country codes
    const [countryCode, setCountryCode] = useState('USA +1')
    const [countryCodePicker, setCountryCodePicker] = useState(false)
    return (
        <View style = {styles.container}>
            <Text style={{fontWeight: "bold"}}>{placeholder + ':'}</Text>
            
            <View style ={styles.phoneView}>
                <TouchableOpacity onPress = {() => setCountryCodePicker(true)} style={styles.codeSelection}>
                    <Text>{countryCode}</Text>
                </TouchableOpacity>
                <TextInput 
                    style={styles.textInput} 
                    placeholder={placeholder}
                    {...props}
                />
            </View>
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
      height: 40,
      padding: 8,
      fontSize: 15,
      width:"80%"
    },
    phoneView:{
        fontSize: 15,
        borderRadius: 5,
        borderColor: '#000000',
        borderWidth: 1,
        flexDirection:'row'
    },
    codeSelection: {
        backgroundColor: 'none',
        borderRightWidth: 1,
        borderRightColor: '#000000',
        width: "20%",
        textAlign: 'center',
        justifyContent: 'center'
    },
    error: {
        color: "red",
        fontWeight: "normal",
        fontSize: 15
    },
})
