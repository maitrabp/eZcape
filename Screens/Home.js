import React, {Component, useState, useEffect} from 'react'
import { View, Text, FlatList, Button, ImageBackground, StyleSheet } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import EzTripCard from '../Components/EzTripCard'
import firebase, {db} from '../Firebase/firebaseConfig';
import * as Animatable from 'react-native-animatable';
import AppLoading from 'expo-app-loading';
import EzButton from '../Components/EzButton';
import { concat } from 'react-native-reanimated';
import { render } from 'react-dom';

    

export default function Home({navigation}) {

        // const managementDocs = [];
        // const tripDocs = [];

        const [managementDocs, setManagementDocs] = useState([]);
        const [tripDocs, setTripDocs] = useState([{}]);

        const [dataFetchDone, setDataFetchDone] = useState(false);

        const user = firebase.auth().currentUser;
        const userId = user.uid;
        const usersCollection = db.collection('Users');
        const managementCollection = db.collection('Management');
        const tripsCollection = db.collection('Trips');

        function ehh(){
            console.log(tripDocs);
        }
        
        useEffect(() => {
            getManagementDocs();
            
        }, [])

        async function getManagementDocs() {
            // console.log(tripsCollection.doc('2rEkbJAwWnfzK8wUk6wQ'));
            // const managementCollection = db.collection('Management');
            const snapshot = await managementCollection.where('UserID', '==', user.uid).get();
            snapshot.forEach(doc => {
               // managementDocs.push(doc.data().TripID);
                console.log(doc.data().TripID)
                setManagementDocs(oldData => [...oldData, doc.data().TripID]);
                console.log("ManagementDocs:", managementDocs);
            });
            console.log("ManagementDocs:", managementDocs);
            getTrips();
            
            // console.log(managementDocs);
        }


        async function getTrips() {
            // const tripsCollection = db.collection('Trips');
            managementDocs.forEach(tripId => {
                    tripsCollection.doc(tripId).get().then(data => {
                    // tripDocs.push(data.data());
                    console.log(data.data())
                    setTripDocs(oldData => [...oldData, data.data()]);
                    // console.log(tripDocs);
                });
            })
            console.log("Trip Docs:", tripDocs);
        }

        const renderItem = ({ item }) => (
            <EzTripCard 
                tripName={item.tripName}
                numMembers={item.numMembers}
                balance={item.balance}>
                {/* <Text>{item.tripName}</Text> */}
            </EzTripCard>
            
        );
            console.log(tripDocs);
            return (
                <ImageBackground source = {require('../Assets/loginBackground.jpg')} style={{flex: 1}}>
                    <Animatable.View animation="fadeInDown" duration={1000} style={styles.container}>
                    <ScrollView>
                        <FlatList 
                            data={tripDocs}
                            keyExtractor={item => item.tripName}
                            renderItem={renderItem}
                        />
                    </ScrollView>
                        {/* <EzButton onPress={getManagementDocs} value="Click Me">
                        </EzButton> */}

                    </Animatable.View>
                </ImageBackground>
            )
        
    


    
    }

    const DATA = [
        {
            // id: '1',
            tripName: 'Trip 2020',
            numMembers: '7',
            balance: '100'
        },
        {
            // id: '2',
            tripName: 'Trip 2019',
            numMembers: '5',
            balance: '500'
        },
        {
            // id: '1',
            tripName: 'Trip to Chicago',
            numMembers: '7',
            balance: '100'
        },
        {
            // id: '1',
            tripName: 'Michigan Adventures',
            numMembers: '7',
            balance: '100'
        },
        {
            // id: '1',
            tripName: 'Harsh\'s Wedding',
            numMembers: '7',
            balance: '100'
        },
        {
            // id: '1',
            tripName: 'Yeh Zindagi Na Milegi Dobara',
            numMembers: '7',
            balance: '100'
        }
    ]


//Styles for Home Page
const styles = StyleSheet.create({
    container: {
        // alignItems: 'center',
        // paddingTop: '20%',
    }
  });