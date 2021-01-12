import React from 'react'
import {StyleSheet,View, Text } from 'react-native'
import firebase from '../Firebase/firebaseConfig';
import EzButton from '../Components/EzButton';
import * as Animatable from 'react-native-animatable';
export default function EmailVerification({navigation}) {

    const user = firebase.auth().currentUser;
    const sendLink = () => {
        user.sendEmailVerification()
        .then(() => {
            alert("You should have recived an email verification, check your email and login again!")
            SignOut()
        })
        .catch((error) => {
            if (error.code == "auth/too-many-requests")
            {
                alert("Due to security reasons, please try again in about 30 seconds.")
            } else {
                console.log(error);
            }
            
        })
    } 

    const SignOut = () => {
        firebase.auth().signOut()
        .then((res) => {
                navigation.navigate('Login')
        })  
        .catch((error) => {
            if (error.code == "auth/too-many-requests")
            {
                alert("Due to security reasons, please try again in about 30 seconds.")
            } else {
                console.log(error);
            }
            
        })  
    }
    return (
        <Animatable.View animation="fadeInDown" duration={1000} style={styles.container}>
            <Text style={styles.textStyling}>Please verify your email, if you did not recieve an email you can resend the registration link </Text>
            <View style={styles.buttonStyling}>
                <EzButton onPress={sendLink} title={"Re-Send Verification Email"} />
            </View>
            <View style={styles.buttonStyling}>
                <EzButton style={styles.buttonStyling} onPress={SignOut} title={"Back to Login"}/>
            </View>
        </Animatable.View>
    );
}
//Styles for Email Verification
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: '35%',
    },
    buttonStyling: {
        marginBottom: 20,
        width: "100%",
        alignItems: "center",
    },
    textStyling: {
        width: "90%",
        fontFamily: "Krona-Regular",
        color: "#5a5a5a",
        fontSize: 14,
        fontStyle: "normal",
        marginBottom: 10
    }
});

