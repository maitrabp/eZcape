import React, {useState} from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import firebase from '../Firebase/firebaseConfig';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable';
import {Ionicons} from '@expo/vector-icons'

const Profile = () => {
    var user = firebase.auth().currentUser;
    const [imageSource, setImageSource] = useState(require('../Assets/default_user.png'));

    const fetchImage = async () => {
        firebase.storage()
            .ref('profile_pictures/' + user.uid) //name in storage in firebase console
            .getDownloadURL()
            .then((url) => {
                setImageSource({uri: url});
            }).catch((e) => console.log('Errors while downloading => ', e));
    };
    //fetchImage();

    const something = () => {

    }

    return (
        <KeyboardAwareScrollView extraHeight={300} contentContainerStyle = {styles.container} enableOnAndroid>

            <Animatable.View style={styles.fieldsBackboard} animation = "fadeInUpBig" duration={1000}>
                <Text style = {styles.name}>Maitra Patel</Text>
            </Animatable.View>
            <Animatable.View style = {styles.imageBackboard} animation = "fadeInDownBig" duration={1000}>
                <Image source={imageSource} style={styles.profile}/>
                <TouchableOpacity onPress={something} style = {styles.editImageBtn}>
                    <Ionicons name="airplane" size={16} color="white"/>
                </TouchableOpacity>
            </Animatable.View>
        </KeyboardAwareScrollView>
    )
}
export default Profile

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#ffffff",
        
    },
    name: {
        fontFamily: "BalsamiqSans-Regular",
        color: "white",
        fontSize: 18,
        marginTop: 40

    },
    profile:{
        width:120,
        height: 120,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: "#FFBF00",
        marginBottom: -30,
        position: "absolute"
    },
    editImageBtn: {
        position: "absolute",
        marginBottom: -30,
        right: "30%"
    },
    editBtnText: {
        fontFamily: "BalsamiqSans-Regular",
        color: "white",
    },
    imageBackboard: {
        height: "20%",
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-end",
        
    },
    fieldsBackboard: {
        position: 'absolute',
        bottom: 0,
        height: "80%",
        width: "100%",
        alignItems: "center",
        borderTopEndRadius: 50,
        borderTopStartRadius: 50,
        backgroundColor: "black"
    },
    
})
