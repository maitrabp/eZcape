import React, { Component } from 'react'
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native'
import {FontAwesome5} from '@expo/vector-icons'
import Home from './Home'
import Profile from './Profile'
import firebase from '../Firebase/firebaseConfig';
import App from '../App'

export default class Screen extends Component {
    render() {
        const SignOutUser = () => {
            firebase.auth().signOut()
            .then((res) => {
                console.log("DONE");
                //No access to stack navigator....TBD
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
                        onPress = {this.props.navigation.openDrawer}
                    >
                        <FontAwesome5 name="bars" size={24} color="black"/>

                    </TouchableOpacity>
                    <View style={{flex:1, borderTopColor: "black", borderTopWidth: 2}}>
                        {
                            this.props.name==="Home"?<Home navigation={this.props.navigation}></Home>:
                            (this.props.name==="Profile"?<Profile navigation={this.props.navigation}></Profile>:
                            (this.props.name==="SignOut"?SignOutUser():<Text>Some Other Screen!!</Text>))
                        }
                    </View>
                </SafeAreaView>
            </View>
        )
    }
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
