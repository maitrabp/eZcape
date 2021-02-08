import React, {useState, useEffect, useRef} from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import firebase, {db} from '../Firebase/firebaseConfig';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable';
import {Ionicons} from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker';
import EzProfileInput from "../Components/EzProfileInput"
import EzButton from "../Components/EzButton"
import { back } from 'react-native/Libraries/Animated/src/Easing';
const Profile = () => {

    var user = firebase.auth().currentUser;

    //Updated Variables
    const [imageSource, setImageSource] = useState(require('../Assets/default_user.png'));
    const [updatedSource, setUpdatedSource] = useState([false, false, false, false, false, false])
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phnum, setPhnum] = useState('');
    const [password, setPassword] = useState('');

    //Error Variables
    const [firstnameError, setFirstnameError] = useState('');
    const [lastnameError, setLastnameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [phnumError, setPhnumError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    //Toggle Variables
    const [toggleChangePassword, setToggleChangePassword] = useState(false)

    //Calls this function on page load/re-renders
    useEffect(() => {
        fetchData();
    }, [])

    //Get Image from firebase storage
    const fetchImage = () => {
        firebase.storage()
            .ref('profile_pictures/' + user.uid) //name in storage in firebase console
            .getDownloadURL()
            .then((url) => {
                setImageSource({uri: url});
            }).catch((e) => console.log('Errors while downloading => ', e));
    };

    //Get ALL data for profile page from firebase by just calling this function
    const fetchData = async() => {
        fetchImage();

        setEmail(user.email);
        //Set user data
        db.collection('Users').doc(user.uid).get().then(documentSnapshot => {
              setFirstname(documentSnapshot.data().firstName);
              setLastname(documentSnapshot.data().lastName);
              formatPhoneNum(documentSnapshot.data().phoneNumber);
              setAddress(documentSnapshot.data().address);
        });
    }

    //Phone number formatted
    function formatPhoneNum(text)
    {
        let formatted = '';
        var cleaned = ('' + text).replace(/\D/g, '')
        for(var i = 0; i < cleaned.length; i++){
            if(i==0){
                formatted = '(';
            } else if(i == 3){
                formatted = formatted + ') ';
            } else if(i == 6){
                formatted = formatted + '-';
            }
            formatted = formatted + cleaned[i];
        }
        setPhnum(formatted);
    }
    //pick a new profile image and display it on the frame
    const changeImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [3, 3],
          quality: 1,
        });
    
        // console.log(result);
    
        if (result.error) {
            console.log(error)
        }
        else if (!result.didCancel) {
            setImageSource({
                uri: result.uri
            });
            let updatedArr = [...updatedSource];
            updatedArr[0] = true;
            setUpdatedSource(updatedArr);
        }
    }
    const changeEmail = () => {

    }
    
    const changePasswordOCTvalidation = (typedText) => {
        if (typedText.length < 8)
        {
            let updatedArr = [...updatedSource];
            updatedArr[5] = false;
            setUpdatedSource(updatedArr);
            setPasswordError("Password must be atleast 8 characters in length");
        } else {
            setPasswordError("");
            let updatedArr = [...updatedSource];
            updatedArr[5] = true;
            setUpdatedSource(updatedArr);
        }
        setPassword(typedText);
    }
    
    const firstNameOCTvalidation = (typedText) => {
        var pattern = /^[a-zA-Z]+$/
        if (typedText === '')
        {
            setFirstnameError("First name must not be empty!");
            //Updated checkmark
            let updatedArr = [...updatedSource];
            updatedArr[1] = false;
            setUpdatedSource(updatedArr);

        }
        else if (!pattern.test(typedText))
        {
            setFirstnameError("First name can only contain letters!")
            //Updated checkmark
            let updatedArr = [...updatedSource];
            updatedArr[1] = false;
            setUpdatedSource(updatedArr);

        } else {
            setFirstnameError("");
            //Updated checkmark
            let updatedArr = [...updatedSource];
            updatedArr[1] = true;
            setUpdatedSource(updatedArr);
        }
        setFirstname(typedText);
    }
    const lastNameOCTvalidation = (typedText) => {
        var pattern = /^[a-zA-Z]+$/
        if (typedText === '')
        {
            setLastnameError("Last name must not be empty!");

            //Updated checkmark
            let updatedArr = [...updatedSource];
            updatedArr[2] = false;
            setUpdatedSource(updatedArr);
        }
        else if(!pattern.test(typedText)){
            setLastnameError("Last name can only contain letters!")

            //Updated checkmark
            let updatedArr = [...updatedSource];
            updatedArr[2] = false;
            setUpdatedSource(updatedArr);
        }
        else {
            setLastnameError("");

            //Updated checkmark
            let updatedArr = [...updatedSource];
            updatedArr[2] = true;
            setUpdatedSource(updatedArr);
        }
        setLastname(typedText);
    }

    const addressOCTvalidation = (typedText) => {
        if(typedText === '') {
            setAddressError("Address must not be empty!")

            //Updated checkmark
            let updatedArr = [...updatedSource];
            updatedArr[3] = false;
            setUpdatedSource(updatedArr);
        } else {
            setAddressError("");

             //Updated checkmark
             let updatedArr = [...updatedSource];
             updatedArr[3] = true;
             setUpdatedSource(updatedArr);
        }
        setAddress(typedText);
    } 

    const phnumOCTvalidation = (typedText) => {
        if(typedText === '') {
            setPhnumError("Phone number must not be empty!")
            //Updated checkmark
            let updatedArr = [...updatedSource];
            updatedArr[4] = false;
            setUpdatedSource(updatedArr);
        } 
        else if (typedText.length < 14)
        {
            setPhnumError("Phone number should be 10 digits!");
            //Updated checkmark
            let updatedArr = [...updatedSource];
            updatedArr[4] = false;
            setUpdatedSource(updatedArr);
        }
        else {
            setPhnumError("");
            //Updated checkmark
            let updatedArr = [...updatedSource];
            updatedArr[4] = true;
            setUpdatedSource(updatedArr);
        }
        formatPhoneNum(typedText)
    }


    //Update button click method
    const update = () => {
       const updated = updatedSource.filter(update => update == true)
       if(updated[0]){
           alert("Your profile has successfully been updated!")
       } else {
           alert("No changes detected")
       }
    }

    return (
        <KeyboardAwareScrollView extraHeight={250} contentContainerStyle = {styles.container} enableOnAndroid>
            <View>
                <Animatable.View style = {styles.imageBackboard} animation = "fadeInDownBig" duration={1200}>
                    <View style={styles.imageContainer}>
                        <Image source={imageSource} style={styles.profile}/>
                        <TouchableOpacity onPress={changeImage} style = {styles.editImageBtn}>
                            <Ionicons name="add-circle-outline" size={30} color="#FFBF00"/>
                        </TouchableOpacity>
                        {updatedSource[0]?
                        <View style={styles.imageUpdatedCheck}>
                            <Ionicons name="checkbox-outline" size={20} color="green"/>
                        </View>
                        :null}
                        
                    </View>
                </Animatable.View>
                <View  style={{paddingVertical: "5%"}}>
                    <View style={styles.headerSpecs}>
                        <Text style={{fontFamily: "Spartan-Medium", fontSize: 11, color: "black"}}><Ionicons name="pin-sharp" size={18} color="#FFBF00"/> {20} Trips</Text>
                        <Text style={{fontFamily: "Spartan-Medium", fontSize: 18, fontWeight: "400"}}>{user?.displayName}</Text>
                        <Text style={{fontFamily: "Spartan-Medium", fontSize: 11, color: "black"}}><Ionicons name="location-sharp" size={18} color="#FFBF00"/> {6} Friends</Text>
                    </View>
                    <View style={styles.fieldsContainer}>
                        <EzProfileInput
                            iconName="mail-outline"
                            defaultValue={email}
                            error = {emailError}
                            editable = {false}
                        />
                        <EzProfileInput
                            iconName="person-outline"
                            defaultValue={firstname}
                            onChangeText={firstNameOCTvalidation}
                            error = {firstnameError}
                            updated = {updatedSource[1]}
                        />
                        <EzProfileInput
                            iconName="person-outline"
                            defaultValue={lastname}
                            onChangeText = {lastNameOCTvalidation}
                            error = {lastnameError}
                            updated = {updatedSource[2]}
                        />
                        <EzProfileInput
                            iconName="home-outline"
                            defaultValue={address}
                            onChangeText = {addressOCTvalidation}
                            error = {addressError}
                            updated = {updatedSource[3]}
                        />
                        <EzProfileInput
                            iconName="call-outline"
                            defaultValue={phnum}
                            onChangeText = {phnumOCTvalidation}
                            error = {phnumError}
                            updated = {updatedSource[4]}
                        />
                        {toggleChangePassword? 
                        
                        <Animatable.View style = {{width: "100%", alignItems: "center"}}animation = "bounceInDown" duration={400}>
                            <EzProfileInput
                                iconName="key-outline"
                                placeholder = {"New Password?"}
                                onChangeText = {changePasswordOCTvalidation}
                                error = {passwordError}
                                secureTextEntry={true}
                                updated = {updatedSource[5]}
                            />
                            <TouchableOpacity style = {styles.revertPasswordChange} onPress = {() => setToggleChangePassword(false)}>
                                <Text style={{color: "red", fontFamily: "Spartan-Medium"}}>Don't want to change password</Text>
                            </TouchableOpacity>
                        </Animatable.View>
                        :
                        <EzButton
                            title={"Reset Password?"}
                            onPress={() => setToggleChangePassword(true)}
                        />
                        }
                        <EzButton
                            title={"Update"}
                            onPress={update}
                        />
                    </View>
                </View>
                
            </View>
        </KeyboardAwareScrollView>
    )
}
export default Profile

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "white",
    },
    headerSpecs: {
        marginVertical: 18,
        color: "black",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-evenly',
        borderBottomColor: "#b7b7b7",
    },
    fieldsContainer: {
        
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
    imageUpdatedCheck: {
        position: "absolute",
        right: -28,
        bottom: 4
    },
    imageBackboard: {
        height: "30%",
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-end",
        backgroundColor: "#121212",
        
    },
    fieldsBackboard: {
        marginVertical: 30,
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
    revertPasswordChange: {
        width: "90%",
        textAlign: "center",
        borderColor: "red",
        borderWidth: 1,
        padding: 10,
        borderRadius: 15,
        marginVertical: "3%"
    }
    
})
