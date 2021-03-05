import React, {useState, useEffect} from 'react'
import { View, FlatList, ImageBackground, StyleSheet } from 'react-native'
import EzTripCard from '../Components/EzTripCard'
import firebase, {db} from '../Firebase/firebaseConfig';
import * as Animatable from 'react-native-animatable';

    

export default function Home({navigation}) {

        const [managementDocs, setManagementDocs] = useState([]);
        const [tripDocs, setTripDocs] = useState([]);
        const [isDone, setIsDone] = useState(false);

        const [dataFetchDone, setDataFetchDone] = useState(false);

        const user = firebase.auth().currentUser;
        const userId = user.uid;
        const usersCollection = db.collection('Users');
        const managementCollection = db.collection('Management');
        const tripsCollection = db.collection('Trips');
        
        
        useEffect(() => {
            const snapshot = managementCollection.where('UserID', '==', user.uid).get().then(res => {
                res.forEach(doc => {
                managementDocs.push(doc.data().TripID);
                });
            }).then(res2 => {
                    managementDocs.forEach(tripId => {
                        tripsCollection.doc(tripId).get().then(data => {
                        tripDocs.push(data.data());
                    }).then(res0 => setIsDone(true));
                })
            });


        }, [])

        async function getManagementDocs() {
            const snapshot = await managementCollection.where('UserID', '==', user.uid).get();
            snapshot.forEach(doc => {
                managementDocs.push(doc.data().TripID);
            });
            const temp = await getTrips().then(setIsDone(true));
        }


        async function getTrips() {
            managementDocs.forEach(tripId => {
                    tripsCollection.doc(tripId).get().then(data => {
                    tripDocs.push(data.data());
                });
            })
            return tripDocs;
        }

        const renderItem = ({ item }) => (
            <EzTripCard 
                tripName={item.tripName}
                numMembers={item.numMembers}
                balance={item.balance}>
            </EzTripCard>
            
        );

        if (isDone)
        {
            return (
                <ImageBackground source = {require('../Assets/loginBackground.jpg')} style={styles.container}>
                    <Animatable.View animation="fadeInDown" duration={1000} style={styles.container2}>
                        <FlatList 
                            data={tripDocs}
                            renderItem={renderItem}
                        />
                    
                    </Animatable.View>
                </ImageBackground>
            )
        } else {
            return (
                <View>
                <h1>Loading...</h1>
            </View>
            )
        }
            
        
    


    
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
        },
        {
            // id: '1',
            tripName: 'Yeh Zindagi Na Milegi Dobara',
            numMembers: '7',
            balance: '100'
        },
        {
            // id: '1',
            tripName: 'Yeh Zindagi Na Milegi Dobara',
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
        width: 50,
        height: 50,
        backgroundColor:'black',
        borderRadius: 50,
        bottom: 10,
        right: 10,
        alignItems: 'center',
        justifyContent: 'center'
      },
      fabText: {
        color: 'white',
        fontSize: 50
      }
  });