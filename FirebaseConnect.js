import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import db from './Firebase/firebaseConfig';

class FirebaseConnect extends Component {
    constructor(props){
        super(props);
        this.getUser();
    }

    getUser = async () => {
        const UserDocument = await db.collection("Users").doc('HiXymxqloChH0olghN3k').get()
        console.log(UserDocument.get('address'))
    }

    render() {
        return (
            <View>
                <Text> Hello World </Text>    
            </View>
        );
    }
}

export default FirebaseConnect;

