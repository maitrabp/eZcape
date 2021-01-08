import React from 'react'
import {StyleSheet,View, Text } from 'react-native'
import firebase from '../Firebase/firebaseConfig';
import EzButton from '../Components/EzButton';
import * as Animatable from 'react-native-animatable';
import { 
    useFonts, KronaOne_400Regular 
} from '@expo-google-fonts/krona-one';
import { 
    Hanuman_400Regular,
    Hanuman_700Bold 
} from '@expo-google-fonts/hanuman'
export default function EmailVerification({navigation}) {

    let [fontsLoaded, error] = useFonts({
        KronaOne_400Regular,
        Hanuman_400Regular,
        Hanuman_700Bold,
    })
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
            <Text style={styles.textStyling}>Please verify your email, if you did not recieve an email you can resend the registration link </Text>
            <View style={styles.buttonStyling}>
                <EzButton onPress={sendLink} title={"Re-Send Verification Email"} />
            </View>
            <View style={styles.buttonStyling}>
                <EzButton style={styles.buttonStyling} onPress={SignOut} title={"Back to Login"}/>
            </View>
            <Text style={styles.textStyling}>After verifying click here to get started!</Text>
            <View style={styles.buttonStyling}>
                <EzButton style={styles.buttonStyling} onPress={Continue} title={"Let's plan your first trip!"}/>
            </View>
        </Animatable.View>
    )
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
        fontFamily: 'KronaOne_400Regular',
        color: "#5a5a5a",
        fontSize: 14,
        fontStyle: "normal",
        marginBottom: 10
    }
});

