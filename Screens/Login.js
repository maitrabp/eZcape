import React from 'react'
import {useState} from 'react';
import { StyleSheet, View, Text, TextInput} from 'react-native'
import EzButton from '../Components/EzButton'
import firebase from '../Firebase/firebaseConfig';
import EzTextInput from '../Components/EzTextInput';


export default function Login({navigation}) {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailErrorFree, setEmailErrorFree] = useState(false);
    const [passwordErrorFree, setPasswordErrorFree] = useState(false);
    
    const login = () => {
        console.log(email);
        if (emailErrorFree && passwordErrorFree)
        {
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then((res) => {
                console.log(res)
                console.log('User logged-in successfully!')
                navigation.navigate('Home');
            })
        }
        
    }

    const redirectSignUp = () => {
        navigation.navigate('SignUp');
    }

    const emailHandler = (typedText) => {
        
        if (typedText === '')
        {
            setEmailError("Email must not be empty!");
            setEmailErrorFree(false);
        } else {
            setEmailError("");
            setemail(typedText);
            setEmailErrorFree(true);
        }
    }

    const passwordHandler = (typedText) => {
        //1. Empty Check
        //2. Maximum length check
        //3. Minimum length check
        //4. Strength check (combinations of char and num.)
        
        if (typedText == '')
        {
            setPasswordError("Password must not be empty!");
            setPasswordErrorFree(false);
        } else {
            setPasswordError("");
            setPassword(typedText);
            setPasswordErrorFree(true);
        }
    }
    
    
    return (
        <View style={styles.container}>
            <Text style={styles.textInput}>Login</Text>
            <EzTextInput 
                placeholder="Email" 
                defaultValue={email}
                error={emailError}
                onChangeText={emailHandler}
            />
            <EzTextInput 
                placeholder="Password" 
                defaultValue={password}
                secureTextEntry={true}
                error={passwordError}
                onChangeText={passwordHandler}
            />
            <EzButton onPress={login} title={"Login"} />
            <EzButton onPress={redirectSignUp} title={"New User? Sign Up"} /> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: '20%',
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