import React, {Component} from 'react'
import { View, Text, StyleSheet, ImageBackground } from 'react-native'

export default function EzTripCard({tripName, numMembers, balance, ...props}) {
    return (
        <View style={styles.card}>
            {/* <ImageBackground 
                style={styles.img}
                source={"../Assets/default_user.png"}
            /> */}
            <View style={styles.cardContent}>
                <View style={styles.middleRow}>
                    <Text style={styles.middleText}>{tripName}</Text>
                </View>
                <View style={styles.bottomRow}>
                    <Text style={styles.bottomText}>{numMembers}</Text>
                    <Text style={styles.bottomText}>${balance}</Text>
                </View>
                
            </View>
        </View>
        
    )
}
const styles = StyleSheet.create({
    card: {
        borderRadius: 6,
        elevation: 3,
        backgroundColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 1,
        shadowRadius: 5,
        marginHorizontal: 10,
        marginVertical: 10,
        opacity: 0.75
        // width: 200, 
        // height: 200, 
        // flexDirection: 'row', 
        // margin: 24
    },
    middleText: {
        color: '#FFBF00',
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center'
        // fontFamily: 'Krona-Regular',
    },
    middleRow: {
        marginTop: 5,
        alignItems: 'center'
    },
    cardContent: {
        marginHorizontal: 18,
        marginVertical: 10
        // flex: 1, 
        // backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        // alignSelf: 'flex-end'
    },
    img: {
        width: 200,
        height: 200, 
        position: 'absolute'
    },
    bottomText: {
        color: '#FFBF00',
        fontSize: 20,
        // fontFamily: 'Krona-Regular',
    },
    bottomRow: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "1%",
        marginTop: 15
    }
});