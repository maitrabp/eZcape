import React from 'react'
import { View, Text } from 'react-native'
import firebase from '../Firebase/firebaseConfig';
import EzButton from '../Components/EzButton';

const EmailVerification = ({navigation}) => {
    //logic...
    //methods..
    //varibles..
    const name = "Re-Send Verification Email"

    const sendLink = () => {
        const user = firebase.auth().currentUser;
        user.sendEmailVerification()
        .then(() => {
            alert("You should have recived an email verification, check you email!")
        })
    } 

    return (
        <View>
            <EzButton onPress={sendLink} title={"Re-Send Verification Email"} />
        </View>
    )
}

export default EmailVerification
