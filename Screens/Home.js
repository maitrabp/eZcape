import React, {useState} from 'react'
import { View, Text, FlatList, Button, ImageBackground, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import EzTripCard from '../Components/EzTripCard'
import firebase, {db} from '../Firebase/firebaseConfig';
import * as Animatable from 'react-native-animatable';

export default function Home({navigation}) {

    const usersCollection = db.collection('Users');
    

    async function getUser() {
        const snapshot = await usersCollection.where('firstName', '==', 'Nisarg').get();
        snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
      });
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

                <FlatList 
                    data={DATA}
                    // keyExtractor={item => item.id}
                    renderItem={renderItem}
                />

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