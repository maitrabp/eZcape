import React from 'react'
import {createContext, useState, useContext} from 'react';
import { StyleSheet, View, Text, TextInput} from 'react-native'
import EzButton from '../Components/EzButton'
import auth from '@react-native-firebase/auth';
import firebase from '../Firebase/firebaseConfig';


export default function Login({navigation}) {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');

    const login = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((res) => {
            console.log(res)
            console.log('User logged-in successfully!')
            navigation.navigate('Home');
        })
    }

    const redirectSignUp = () => {
        navigation.navigate('SignUp');
    }
    
    
    return (
        <View style={styles.container}>
            <Text style={styles.textInput}>Login</Text>
            <TextInput 
                style={styles.textInput} 
                placeholder="email" 
                onChangeText={email => setemail(email)}
                defaultValue={email}
            />
            <TextInput 
                style={styles.textInput} 
                placeholder="Password" 
                onChangeText={password => setPassword(password)}
                defaultValue={password}
            />
            <EzButton onPress={login} title={"Login"} />
            <EzButton onPress={redirectSignUp} title={"Sign Up"} />
            
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textInput: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1rem',
    },
    button: {
        width: "100%",
    }
  });