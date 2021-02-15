import React, {useState, useEffect} from 'react'
import {StyleSheet,View, Text, Image } from 'react-native'
import {AuthContext} from '../Contexts/AuthProvider'
import firebase from '../Firebase/firebaseConfig';
import EzButton from '../Components/EzButton';
import * as Animatable from 'react-native-animatable';
export default function EmailVerification({navigation}) {

    var user = firebase.auth().currentUser;
    //User Context
    const {loggedIn, setLoggedIn} = useContext(AuthContext);
    const imageEV = require('../Assets/EmailVerificationGraphic.png');
    const [proceed, setProcceed] = useState(0)
    useEffect(() => {
        let mounted = true;
        console.log(proceed)
        if(proceed != 0) {
            const loadUser = async () => {
                await user.reload()
                //only if cleanup (unmounted) has not been called, then validate below.. 
                //otherwise if it was already unmounted, then the response was late so ignore
                if(mounted){
                    if(user.emailVerified){
                        setLoggedIn(true)
                    } else {
                        alert("Please verify your email before proceeding.");
                    }
                }
            };
            loadUser();
        }
        return () => {
            mounted = false;
        }
    }, [proceed])
    const sendLink = () => {
        user.sendEmailVerification()
        .then(() => {
            alert("You should have recived an email verification, check your email and login again!")
            //SignOut()
        })
        .catch((error) => {
            if (error.code == "auth/too-many-requests")
            {
                alert("Due to security reasons, please try again in about 30 seconds.")
            } else {
                console.log(error);
            }
            
        })
    } 

    const SignOut = () => {
        firebase.auth().signOut()
        .then((res) => {
                navigation.navigate('Login')
        })  
        .catch((error) => {
            if (error.code == "auth/too-many-requests")
            {
                alert("Due to security reasons, please try again in about 30 seconds.")
            } else {
                console.log(error);
            }
            
        })  
    }
    return (
        <Animatable.View animation="fadeInDown" duration={1000} style={styles.container}>
            <Text style={styles.titleStyling}>Verify your email</Text> 
            <Image 
                source = {imageEV}
                style = {{
                    resizeMode: "cover",
                    height: "30%",
                    width: "45%",
                    justifyContent: "center",
                    marginVertical: "10%",
                }} 
            />
            <Text style={styles.textStyling}>Welcome {user?user.displayName:" User"}! Please press 'verify' to confirm [{user?user.email:"this"}] is a valid email address. </Text>
            <View style={styles.buttonStyling}>
                <EzButton onPress={sendLink} title={"Verify"} />
            </View>
            <View style={styles.buttonStyling}>
                <EzButton style={styles.buttonStyling} onPress={SignOut} title={"Back to Login"}/>
            </View>
            <View style={styles.buttonStyling}>
                <EzButton style={styles.buttonStyling} onPress={() => setProcceed(proceed + 1)} title={"Let's plan your first trip"}/>
            </View>

        </Animatable.View>
    );
}
//Styles for Email Verification
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonStyling: {
        marginBottom: 5,
        width: "100%",
        alignItems: "center",
    },
    textStyling: {
        width: "90%",
        fontFamily: "Krona-Regular",
        color: "#202020",
        fontSize: 14,
        textAlign: "center",
        marginBottom: 15,
        padding: 10,
        paddingVertical: 20,
        backgroundColor: "#a1a1a1",
        color: "white"
    },
    titleStyling: {
        fontFamily: "Krona-Regular",
        fontSize: 25,
        fontWeight: "500"
    }
});

