import React from 'react'
import {StyleSheet,View, Text } from 'react-native'
import firebase from '../Firebase/firebaseConfig';
import EzButton from '../Components/EzButton';
import * as Animatable from 'react-native-animatable';

export default function EmailVerification({navigation}) {
    //logic...
    //methods..
    //varibles..
    const user = firebase.auth().currentUser;
    const sendLink = () => {
        user.sendEmailVerification()
        .then(() => {
            alert("You should have recived an email verification, check you email!")
        })
    } 

    const SignOut = () => {
        firebase.auth().signOut()
        .then((res) => {
                navigation.navigate('Login')
            }
        );    
    }

    const Continue = () => {
        if(!user.emailVerified){
            alert("Email has not yet been verified!")
        } else {
            navigation.navigate('Home')
        }
    }

    return (
        <Animatable.View animation="fadeInDown" duration={1000} style={styles.container}>
            <Text>Please verify your email, if you did not recieve an email you can resend the registration link </Text>
            <EzButton onPress={sendLink} title={"Re-Send Verification Email"} />
            <EzButton onPress={SignOut} title={"Back to Login"}/>
            <Text>After verifying click here to get started!</Text>
            <EzButton onPress={Continue} title={"Let's plan your first trip!"}/>
        </Animatable.View>
    )
}
//Styles for Email Verification
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: '55%',
        width: "90%",
    },
    textStyling: {
        fontFamily: 'Inter_900Black',
        fontSize: 20,
    }
});

