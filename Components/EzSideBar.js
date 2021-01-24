import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, ImageBackground, Image} from 'react-native'
import {DrawerNavigatorItems} from 'react-navigation-drawer'
import {Ionicons} from '@expo/vector-icons'
import firebase from '../Firebase/firebaseConfig';

export default function EzSideBar(props) {
    var user = firebase.auth().currentUser;

    return (
        <ScrollView>
            <ImageBackground
                source={require("../Assets/sidebarBackground2.png")}
                style={{width: undefined, padding: 16, paddingTop: 48, backgroundColor: "black"}}>
                    <View style={{width: undefined, alignItems: "center"}}>
                        <Image source={require("../Assets/defaultUser.png")} style={styles.profile}/>
                        <Text style={styles.name}>{user.displayName}</Text> 
                        <View style={{flexDirection: "row"}}>
                            <Text style={styles.tripsTaken}>{25} Trips </Text>
                            <Ionicons name="airplane" size={16} color="#FFBF00"/>
                        </View>
                    </View>
            </ImageBackground>
            <View style={styles.container}>
                <DrawerNavigatorItems {...props}/>
            </View>
        </ScrollView>
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profile:{
        width:100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: "#FFBF00",
        backgroundColor: "#FFBF00"
    },
    name:{
        color: "#FFBF00",
        fontSize: 16,
        fontWeight: "500",
        marginVertical:8,
        fontFamily: "Krona-Regular"
    },
    tripsTaken: {
        fontSize: 10,
        fontFamily: "Krona-Regular",
        fontWeight: "normal",
        marginRight: 4,
        marginTop: 2,
        color: "#FFBF00"
    }
})
