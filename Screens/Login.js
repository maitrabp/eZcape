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
        if (emailError === '' && passwordError === '')
        {
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then((res) => {
                console.log(res)
                console.log('User logged-in successfully!')
                navigation.navigate('Home')
            })
            .catch((error) => {
                if (error.code === "auth/invalid-email")
                {
                    setEmailError(error.message)
                }
                else if (error.code === "auth/user-not-found")
                {
                    alert(error.message)
                }
                else if (error.code === "auth/invalid-password")
                {
                    setPasswordError(error.message)
                }
                else {
                    console.error(error)
                }
            })
        }  
    }

    const redirectSignUp = () => {
        navigation.navigate('SignUp');
    }

    const emailOBvalidation = () => {
        
        if (email.length < 2)
        {
            setEmailError("Email must not be empty!");
            // setEmailErrorFree(false);
        } else {
            setEmailError("");
            // setEmailErrorFree(true);
        }
    }
    const emailOCTvalidation = (typedText) => {
        
        if (typedText === '')
        {
            setEmailError("Email must not be empty!");
            // setEmailErrorFree(false);
        } else {
            setEmailError("");
            setemail(typedText);
            // setEmailErrorFree(true);
        } 
        //more if and else conditions to validate other things..
    }
    const passwordOBvalidation = () => {
        //1. Empty Check
        //2. Maximum length check
        //3. Minimum length check
        //4. Strength check (combinations of char and num.)
        
        if (password.length < 2)
        {
            setPasswordError("Password must not be empty!");
            // setPasswordErrorFree(false);
        }
        else if (password.length < 8)
        {
            setPasswordError("Password must be atleast 8 characters in length");
        } else {
            setPasswordError("");
            // setPasswordErrorFree(true);
        }
    }

    const passwordOCTvalidation = (typedText) => {
        //1. Empty Check
        //2. Maximum length check
        //3. Minimum length check
        //4. Strength check (combinations of char and num.)
        
        if (typedText == '')
        {
            setPasswordError("Password must not be empty!");
            // setPasswordErrorFree(false);
        }
        else if (typedText.length < 8)
        {
            setPasswordError("Password must be atleast 8 characters in length");
        } else {
            setPasswordError("");
            setPassword(typedText);
            // setPasswordErrorFree(true);
        }
    }
    
    
    return (
        <View style={styles.container}>
            <Text style={styles.textInput}>Login</Text>
            <EzTextInput 
                placeholder="Email" 
                defaultValue={email}
                error={emailError}
                onBlur = {emailOBvalidation}
                onChangeText={emailOCTvalidation}
            />
            <EzTextInput 
                placeholder="Password" 
                defaultValue={password}
                secureTextEntry={true}
                error={passwordError}
                onBlur = {passwordOBvalidation}
                onChangeText={passwordOCTvalidation}
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
        marginBottom: 10,
    },
    button: {
        width: "100%",
    }
  });