import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, ImageBackground, Image} from 'react-native'
import {DrawerNavigatorItems} from 'react-navigation-drawer'
import {Ionicons} from '@expo/vector-icons'
import { render } from 'react-dom'

export default function EzSideBar(props) {

    return (
        <ScrollView>
            <ImageBackground
                source={require("../Assets/sidebarBackground.png")}
                style={{width: undefined, padding: 16, paddingTop: 48, backgroundColor: "yellow"}}>
                    <View style={{width: undefined, alignItems: "center"}}>
                        <Image source={require("../Assets/defaultUser.png")} style={styles.profile}/>
                        <Text style={styles.name}>Maitra Patel</Text> 
                        <View style={{flexDirection: "row"}}>
                            <Text style={styles.tripsTaken}>{25} Trips </Text>
                            <Ionicons name="airplane" size={16} color="black"/>
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
        borderColor: "black",
    },
    name:{
        color: "black",
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
        marginTop: 2
    }
})
