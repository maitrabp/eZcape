import React from 'react'
import {useState} from 'react';
import { StyleSheet, Text, ImageBackground} from 'react-native'
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
        <ImageBackground source = {require('../Assets/loginBackground.jpg')} style={{flex: 1}}>
            <Animatable.View animation="fadeInDown" duration={1000} style={styles.container}>
                <Text style={styles.textInput}>Let's reset your password!</Text>
                <EzTextInput 
                    placeholder="Email" 
                    defaultValue={email}
                    error={emailError}
                    onBlur = {emailOBvalidation}
                    onChangeText={emailOCTvalidation}
                />
                <EzButton onPress={submit} title={"Submit"} />
            </Animatable.View>
        </ImageBackground>
    )
}
//Styles for Login Page
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: '15%',
    },
    textInput: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: "8%",
        fontFamily: "Krona-Regular",
        fontSize: 15
    },
    button: {
        width: "100%",
    }
  });