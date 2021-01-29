import React, {Component} from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function ExTripCard(props) {
    return (
        <View style={StyleSheet.card}>
            <View style={styles.cardContent}>
                { props.children }
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    card: {

    },
    cardContent: {

    }
});