import React from 'react'
import {useState} from 'react';
import { StyleSheet, View, Text, TextInput} from 'react-native'
import EzButton from '../Components/EzButton'
import firebase from '../Firebase/firebaseConfig';
import EzTextInput from '../Components/EzTextInput';
import EzTextLink from '../Components/EzTextLink';
import * as Animatable from 'react-native-animatable';

export default function Login({navigation}) {

    //State Change Variables
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    //Logging in the user(firebase)...
    const login = () => {
        if (emailError === '' && passwordError === '')
        {
            //Calling firebase for sign in
            firebase.auth().signInWithEmailAndPassword(email, password)
            //Success
            .then((res) => {
                if(!res.user.emailVerified){
                    // firebase.auth().signOut();
                    // res.user.sendEmailVerification()
                    navigation.navigate("Email Verification")
                    // alert("Please check your email for a verification link. Once you're verified, you may successfully login! Enjoy!")
                      
                    //sign out code
                } else {
                    navigation.navigate('Home')
                }
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
                //password validity error
                else if (error.code === "auth/wrong-password")
                {
                    alert("The password you entered is incorrect.");
                }
                //other errors
                else {
                    console.error(error)
                }
            })
        }  
    }
    //redirect to signup page..
    const redirectSignUp = () => {
        navigation.navigate('Sign Up');
    }

    const redirectPasswordReset = () => {
        navigation.navigate('Password Reset');
    }

    const redirectEmailVerification = () => {
        navigation.navigate('Email Verification');
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
    //Password validation when user clicks out of the password input field
    const passwordOBvalidation = () => {
        if (password.length < 1)
        {
            setPasswordError("Password must not be empty!");
        }
        else if (password.length < 8)
        {
            setPasswordError("Password must be atleast 8 characters in length");
        } else {
            setPasswordError("");
        }
    }
    //Password validation when user makes changes in the password input field
    const passwordOCTvalidation = (typedText) => {
        if (typedText === '')
        {
            setPasswordError("Password must not be empty!");
        }
        else if (typedText.length < 8)
        {
            setPasswordError("Password must be atleast 8 characters in length");
        } else {
            setPasswordError("");
        }
        setPassword(typedText);
    }
    
    //rendering the widgets
    return (
        <Animatable.View animation="fadeInDown" duration={1000} style={styles.container}>
            <Text style={styles.textInput}>Logo Goes Here!</Text>
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
            <View style={styles.linkContainer}>
                <EzTextLink onPress={redirectSignUp} title={"Create Account"} /> 
                <EzTextLink onPress={redirectPasswordReset} title={"Forgot Password?"} /> 
            </View>         
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
    linkContainer: {
        width: "90%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "1%"
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