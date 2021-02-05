import React, {useState} from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import firebase from '../Firebase/firebaseConfig';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable';
import {Ionicons} from '@expo/vector-icons'
import EzProfileInput from "../Components/EzProfileInput"
import EzButton from "../Components/EzButton"
const Profile = () => {
    var user = firebase.auth().currentUser;
    const [imageSource, setImageSource] = useState(require('../Assets/IMG-2595.jpg'));
//hhh
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

            <Animatable.View style={styles.fieldsBackboard} animation = "fadeInUpBig" duration={1200}>
                <View style={styles.headerSpecs}>
                    <Text style={{fontFamily: "Spartan-Medium", fontSize: 11, color: "black"}}><Ionicons name="pin-sharp" size={18} color="#FFBF00"/> {20} Trips</Text>
                    <Text style={{fontFamily: "Spartan-Medium", fontSize: 18, fontWeight: "400"}}>Maitra Patel</Text>
                    <Text style={{fontFamily: "Spartan-Medium", fontSize: 11, color: "black"}}><Ionicons name="location-sharp" size={18} color="#FFBF00"/> {6} Friends</Text>
                </View>
                <View style={styles.fieldsContainer}>
                    <EzProfileInput
                        iconName="mail-outline"
                        defaultValue="maitrabp@umich.edu"
                    />
                     <EzProfileInput
                        iconName="person-outline"
                        defaultValue="Maitra"
                    />
                     <EzProfileInput
                        iconName="person-outline"
                        defaultValue="Patel"
                    />
                    <EzProfileInput
                        iconName="home-outline"
                        defaultValue="49593 Courtyard Ln, Canton, MI"
                    />
                    <EzProfileInput
                        iconName="call-outline"
                        defaultValue="+1(734)560-5708"
                    />
                    <EzButton
                        title={"Update"}
                        onPress={something}
                    />
                </View>
               
            </Animatable.View>
            <Animatable.View style = {styles.imageBackboard} animation = "fadeInDownBig" duration={1200}>
                <View style={styles.imageContainer}>
                    <Image source={imageSource} style={styles.profile}/>
                    <TouchableOpacity onPress={something} style = {styles.editImageBtn}>
                        <Ionicons name="add-circle-outline" size={30} color="#FFBF00"/>
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
        backgroundColor: "#212121",
        
    },
    headerSpecs: {
        color: "black",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-evenly',
        borderBottomColor: "#b7b7b7",
    },
    fieldsContainer: {
        marginVertical: 30,
        width: "100%",
        alignItems: "center"
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
        position: "absolute",
        bottom: -30,
    },
    editImageBtn: {
        position: "absolute",
        right: -8,
        bottom: 0,
    },
    imageBackboard: {
        height: "20%",
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-end",
        
    },
    fieldsBackboard: {
        paddingTop: 40,
        position: 'absolute',
        bottom: 0,
        height: "80%",
        width: "100%",
        alignItems: "center",
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        backgroundColor: "white"
        //#FCF4A3
    },
    
})
