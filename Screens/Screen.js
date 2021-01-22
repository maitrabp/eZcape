import React, { Component } from 'react'
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native'
import {FontAwesome5} from '@expo/vector-icons'

export default class Screen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView style={{flex: 1}}>
                    <TouchableOpacity 
                        style={{alignItems: "flex-start", margin: 16}}
                        onPress = {this.props.navigation.openDrawer}
                    >
                        <FontAwesome5 name="bars" size={24} color="black"/>

                    </TouchableOpacity>
                    <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
                        <Text style={styles.text}>{this.props.name} Screen</Text>
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
