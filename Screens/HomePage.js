import { Component } from "react";
import { View, FlatList, ImageBackground, StyleSheet } from 'react-native'
import EzTripCard from '../Components/EzTripCard'
import { getManagementDocs } from "../Shared/Api/TripsApi";
import firebase from '../Firebase/firebaseConfig';

const user = firebase.auth().currentUser;
const renderItem = ({ item }) => (
    <EzTripCard 
        tripName={item.tripName}
        numMembers={item.numMembers}
        balance={item.balance}>
    </EzTripCard>
    
);

class HomePage extends Component {
    state = {
        managementDocs: []
    }

    onManagementDocsReceived = (managementDocs) => {
        this.setState(prevState => ({
            managementDocs: prevState.managementDocs = managementDocs
        }));
    }

    componentDidMount() {
        console.log("Hello World");
        getManagementDocs(user.uid, this.onManagementDocsReceived);
        console.log(managementDocs);
    }

    render() {
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

  export default HomePage;