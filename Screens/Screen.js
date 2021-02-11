import React, { Component, useContext, useEffect } from 'react'
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native'
import {FontAwesome5} from '@expo/vector-icons'
import Home from './Home'
import Profile from './Profile'
import firebase from '../Firebase/firebaseConfig';
import {AuthContext} from '../Contexts/AuthProvider';

export default function Screen({navigation, name}) {

    //User Context
    const {loggedIn, setLoggedIn} = useContext(AuthContext);
 

    const SignOutUser = () => {
        firebase.auth().signOut()
        .then((res) => {
            console.log("Logging off")
            setLoggedIn(false);
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
        <View style={styles.container}>
            <SafeAreaView style={{flex: 1}}>
                <TouchableOpacity 
                    style={{alignItems: "flex-start", margin: 16}}
                    onPress = {navigation.openDrawer}
                >
                    <FontAwesome5 name="bars" size={24} color="black"/>

                </TouchableOpacity>
                <View style={{flex:1, borderTopColor: "black", borderTopWidth: 2}}>
                    {
                        name==="Home"?<Home navigation={navigation}></Home>:
                        (name==="Profile"?<Profile navigation={navigation}></Profile>:
                        (name==="SignOut"?SignOutUser():<Text>Some Other Screen!!</Text>))
                    }
                </View>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "#FFF"
    },
    text: {
        color: "black",
        fontSize: 20,
        fontWeight: "500"
    }
})
