import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

import firestore from  "@react-native-firestore/firestore";

class FirebaseConnect extends Component {
    constructor(props){
        super(props);
        this.getUser();
    }

    getUser = async () => {
        const UserDocument = await firestore().collection("Users").doc('HiXymxqloChH0olghN3k').get()
        console.log(UserDocument)
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

