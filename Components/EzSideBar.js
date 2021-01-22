import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, ImageBackground, Image} from 'react-native'
import {DrawerNavigationItems} from 'react-navigation-drawer'
import {Ionicons} from '@expo/vector-icons'
import { render } from 'react-dom'

export default function EzSideBar(props) {

    return (
        <ScrollView>
            <ImageBackground
                source={require("../Assets/sidebarBackground.jpg")}
                style={{width: undefined, padding: 16, paddingTop: 48, backgroundColor: "yellow"}}>
                    <Image source={require("../Assets/defaultUser.png")} style={styles.profile}/>
                    <Text style={styles.name}>Maitra Patel</Text> 
            </ImageBackground>
            
            
            <View style={{flexDirection: "row"}}>

            </View>
        </ScrollView>
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profile:{
        width:80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: "#FFF"
    },
    name:{
        color: "#FFF",
        fontSize: 20,
        fontWeight: "600",
        marginVertical:8
    }
})
