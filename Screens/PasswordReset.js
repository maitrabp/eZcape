import React from 'react'
import {useState} from 'react';
import { StyleSheet, View, Text, TextInput} from 'react-native'
import EzButton from '../Components/EzButton'
import firebase from '../Firebase/firebaseConfig';
import EzTextInput from '../Components/EzTextInput';
import * as Animatable from 'react-native-animatable';

export default function Login({navigation}) {

    //State Change Variables
    const [email, setemail] = useState('');
    const [emailError, setEmailError] = useState('');

    //Sending reset password link (firebase)...
    const submit = () => {
        if (email === '')
        {
            alert("Email must be filled out")
        }
        else if (emailError === '')
        {
            //Calling firebase to send password reset email
            firebase.auth().sendPasswordResetEmail(email)
            //Success
            .then((res) => {
                alert("Password Reset link has been sent to your email.")
                navigation.navigate('Login')
            })
            //Failure
            .catch((error) => {
                //email format error
                if (error.code === "auth/invalid-email")
                {
                    alert(error.message)
                } 
                //user validity error
                else if (error.code === "auth/user-not-found")
                {
                    alert("The email address you entered is not registered.");
                }
                //other errors
                else {
                    console.error(error)
                }
            })
        }  
    }
    //Email validation when user clicks out of the email input field
    const emailOBvalidation = () => {
        
        if (email.length < 1)
        {
            setEmailError("Email must not be empty!");
        } else {
            setEmailError("");
        }
    }
    //Email validation when user makes changes in the email input field
    const emailOCTvalidation = (typedText) => {
        
        if (typedText === '')
        {
            setEmailError("Email must not be empty!");
        } else {
            setEmailError("");
            
        } 
        setemail(typedText);
    }
    
    //rendering the widgets
    return (
        <Animatable.View animation="fadeInDown" duration={1000} style={styles.container}>
            <Text style={styles.textInput}>Reset Password</Text>
            <EzTextInput 
                placeholder="Email" 
                defaultValue={email}
                error={emailError}
                onBlur = {emailOBvalidation}
                onChangeText={emailOCTvalidation}
            />
            <EzButton onPress={submit} title={"Submit"} />
        </Animatable.View>
    )
}
//Styles for Login Page
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