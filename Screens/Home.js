import React, {useState, useEffect} from 'react'
import { View, FlatList, ImageBackground, StyleSheet } from 'react-native'
import EzTripCard from '../Components/EzTripCard'
import firebase, {db} from '../Firebase/firebaseConfig';
import * as Animatable from 'react-native-animatable';
import { FAB } from 'react-native-paper';

    

export default function Home({navigation}) {

        const [managementDocs, setManagementDocs] = useState([]);
        const [tripDocs, setTripDocs] = useState([]);
        const [transDocs, setTransDocs] = useState([]);
        const [isDone, setIsDone] = useState(false);

        // const [dataFetchDone, setDataFetchDone] = useState(false);

        const user = firebase.auth().currentUser;
        // const userId = user.uid;
        // const usersCollection = db.collection('Users');
        const managementCollection = db.collection('Management');
        const tripsCollection = db.collection('Trips');
        const transCollections = db.collection('Transactions');
        
        useEffect(() => {
            const snapshot = managementCollection.where('UserID', '==', user.uid).get().then(res => {
                res.forEach(doc => {
                    managementDocs.push({
                        tripId: doc.data().TripID, 
                        transId: doc.data().TransID
                    });
                });
            }).then(res2 => {
                managementDocs.forEach(temp => {
                    tripsCollection.doc(temp.tripId).get().then(data => {
                        tripDocs.push(data.data());
                    })
                })
            }).then(res3 => {
                managementDocs.forEach(temp => {
                    transCollections.doc(temp.transId).get().then(data => {
                        transDocs.push(data.data());
                        // console.log(transDocs);
                    });
                })
            }).then(setIsDone(true));
            // }).then(res4 => {
            //     console.log("Trip Docs", tripDocs);
            //     console.log("Trans Docs", transDocs);
            //     for (let index = 0; index < tripDocs.length; index++) {
            //         console.log("Hello World");
            //     }
            //     console.log("Trip Docs After:", tripDocs);
            // }).then(() => setIsDone(true));


        }, []);

        // async function getManagementDocs() {
        //     const snapshot = await managementCollection.where('UserID', '==', user.uid).get();
        //     snapshot.forEach(doc => {
        //         managementDocs.push(doc.data().TripID);
        //     });
        //     const temp = await getTrips().then(setIsDone(true));
        // }


        // async function getTrips() {
        //     managementDocs.forEach(tripId => {
        //             tripsCollection.doc(tripId).get().then(data => {
        //             tripDocs.push(data.data());
        //         });
        //     })
        //     return tripDocs;
        // }

        // const renderItem = ({ item }) => (
        //     <EzTripCard 
        //         tripName={item.tripName}
        //         numMembers={item.numMembers}
        //         balance={item.balance}>
        //     </EzTripCard>
            
        // );

        if (isDone)
        {
            const renderItem = ({ item }) => (
                <EzTripCard 
                    tripName={item.tripName}
                    numMembers={item.numMembers}
                    balance={item.balance}>
                </EzTripCard>
                
            );
            return (
                <ImageBackground source = {require('../Assets/loginBackground.jpg')} style={styles.container}>
                    <Animatable.View animation="fadeInDown" duration={1000} style={styles.container2}>
                        <FlatList 
                            data={tripDocs}
                            renderItem={renderItem}
                        />
                        
                    </Animatable.View>
                    <FAB
                        style={styles.fab}
                        medium
                        icon="plus"
                        onPress={() => console.log('Pressed')}
                        color="#000000"
                    />
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
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#FFBF00'
    }
  });