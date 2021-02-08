import React, {useState} from 'react'
import { View, Text, FlatList, Button, ImageBackground, StyleSheet } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import EzTripCard from '../Components/EzTripCard'
import firebase, {db} from '../Firebase/firebaseConfig';
import * as Animatable from 'react-native-animatable';
import EzButton from '../Components/EzButton';
import { concat } from 'react-native-reanimated';

export default function Home({navigation}) {

    const managementDocs = [];
    const tripDocs = [];

    var user = firebase.auth().currentUser;
    var userId = user.uid;
    const usersCollection = db.collection('Users');
    const managementCollection = db.collection('Management');
    const tripsCollection = db.collection('Trips');
    
    
    async function getManagementDocs() {
        // console.log(tripsCollection.doc('2rEkbJAwWnfzK8wUk6wQ'));
        const snapshot = await managementCollection.where('UserID', '==', userId).get();
        snapshot.forEach(doc => {
            managementDocs.push(doc.data().TripID);
            
        });
        getTrips();
        
        // console.log(managementDocs);
    }


    async function getTrips() {
        managementDocs.forEach(tripId => {
                tripsCollection.doc(tripId).get().then(data => {
                console.log(data.data());
            });
        })
        
    }

    
    // this.getUser();

    // console.log(snapshot);
    

    // const [trips, setTrip] = useState(
        
    // );

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
        },
        // {
        //     // id: '1',
        //     tripName: 'Trip 2020',
        //     numMembers: '7',
        //     balance: '100'
        // },
        // {
        //     // id: '1',
        //     tripName: 'Trip 2020',
        //     numMembers: '7',
        //     balance: '100'
        // },
        // {
        //     // id: '1',
        //     tripName: 'Trip 2020',
        //     numMembers: '7',
        //     balance: '100'
        // },
        // {
        //     // id: '1',
        //     tripName: 'Trip 2020',
        //     numMembers: '7',
        //     balance: '100'
        // },
        // {
        //     // id: '1',
        //     tripName: 'Trip 2020',
        //     numMembers: '7',
        //     balance: '100'
        // },
        
    ]

    const renderItem = ({ item }) => (
        <EzTripCard 
            tripName={item.tripName}
            numMembers={item.numMembers}
            balance={item.balance}>
            {/* <Text>{item.tripName}</Text> */}
        </EzTripCard>
        
      );

    return (
        <ImageBackground source = {require('../Assets/loginBackground.jpg')} style={{flex: 1}}>
            <Animatable.View animation="fadeInDown" duration={1000} style={styles.container}>
            {/* <ScrollView> */}
                {/* <FlatList 
                    data={DATA}
                    // keyExtractor={item => item.id}
                    renderItem={renderItem}
                /> */}
            {/* </ScrollView> */}
                <EzButton onPress={getManagementDocs} value="Click Me">
                </EzButton>

            </Animatable.View>
        </ImageBackground>
    )
}

//Styles for Home Page
const styles = StyleSheet.create({
    container: {
        // alignItems: 'center',
        // paddingTop: '20%',
    }
  });