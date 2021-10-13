import React, {Component, useState} from 'react';
import { render, ReactDOM } from 'react-dom';
import {StyleSheet, TouchableOpacity, ImageBackground, Text, View, FlatList} from 'react-native';
import EzTripCard from '../Components/EzTripCard';
import * as Animatable from 'react-native-animatable';
import { getManagementDocs, getTripDocs } from "../Shared/Api/TripsApi";
import firebase from '../Firebase/firebaseConfig';

// const [trips, setTrips] = useState([]);
export default class HomeLandingPage extends Component {

    constructor() {
        super();
        this.state = {
            trips: []
        }
    }

    componentDidMount() {
        getManagementDocs(firebase.auth().currentUser.uid, this.onManagementDocsReceived);
    }

    onManagementDocsReceived = (managementDocs) => {
        console.log(managementDocs);
        const tempTrips = getTripDocs(managementDocs)
        console.log(tempTrips)
        this.setState({
            trips: tempTrips
        });
        // this.setState(prevState => ({
        //     managementDocs: prevState.managementDocs = managementDocs
        // }));
    }

    render() {
        return (
            <ImageBackground source = {require('../Assets/loginBackground.jpg')} style={styles.container}>
                <Animatable.View animation="fadeInUp" duration={1000} style={styles.container2}>
                    <FlatList 
                        data={this.state.trips} //List of trips
                        keyExtractor={(data => data.tripName)}
                        renderItem={({item}) => 
                            <EzTripCard tripName={item.tripName}
                            numMembers={item.numMembers}
                            balance={item.balance}/>
                        }
                    />
                </Animatable.View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 0,
        paddingHorizontal: 0
    },
    container2: {
        flex: 1,
        opacity: 0
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#FFBF00'
    }
})

const data = [
    {
        tripName: "Fun Trip",
        numMembers: 10,
        balance: "1000"
    },
    {
        tripName: "Sad Trip",
        numMembers: 1,
        balance: "0"
    },
    {
        tripName: "Fun Trip1",
        numMembers: 10,
        balance: "1000"
    },
    {
        tripName: "Sad Trip1",
        numMembers: 1,
        balance: "0"
    },
    {
        tripName: "Fun Trip2",
        numMembers: 10,
        balance: "1000"
    },
    {
        tripName: "Sad Trip2",
        numMembers: 1,
        balance: "0"
    },
    {
        tripName: "Fun Trip3",
        numMembers: 10,
        balance: "1000"
    },
    {
        tripName: "Sad Trip3",
        numMembers: 1,
        balance: "0"
    },
    {
        tripName: "Fun Trip4",
        numMembers: 10,
        balance: "1000"
    },
    {
        tripName: "Sad Trip4",
        numMembers: 1,
        balance: "0"
    }
]