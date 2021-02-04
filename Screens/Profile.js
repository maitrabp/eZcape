import React, {useState} from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import firebase from '../Firebase/firebaseConfig';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable';
import {Ionicons} from '@expo/vector-icons'

const Profile = () => {
    var user = firebase.auth().currentUser;
    const [imageSource, setImageSource] = useState(require('../Assets/EmailVerificationGraphic.png'));

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
                <View style={styles.imageContainer}>
                    <Image source={imageSource} style={styles.profile}/>
                    <TouchableOpacity onPress={something} style = {styles.editImageBtn}>
                        <Ionicons name="camera-sharp" size={18} color="black"/>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </KeyboardAwareScrollView>
    )
}
export default Profile

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "black",
        
    },
    name: {
        color: "black",
        fontSize: 15,
        marginTop: 40,
        letterSpacing: 0.5,
        fontFamily: "Spartan-Medium",

    },
    profile:{
        width:120,
        height: 120,
        borderRadius: 60,        
        borderColor: "white",
        backgroundColor: "white",
        borderWidth: 6
    },
    imageContainer: {
        marginBottom: -30,
        position: "absolute"
    },
    editImageBtn: {
        position: "absolute",
        right: 0,
        bottom: 0,
    },
    editBtnText: {
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
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        backgroundColor: "white"
    },
    
})
