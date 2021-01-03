import React, {useState} from 'react'
import {View, Text, StyleSheet, Alert } from 'react-native'
import EzButton from '../Components/EzButton';
import EzTextInput from '../Components/EzTextInput'
import EzPhoneInput from '../Components/EzPhoneInput'
import firebase, {db} from '../Firebase/firebaseConfig';
import { formatPhoneNumber } from 'react-phone-number-input'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable';

export default function SignUp({navigation}) {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifypassword, setVerifyPassword] = useState('');
    const [address, setAddress] = useState('');
    const [phnum, setPhnum] = useState('');

    const [firstnameError, setFirstnameError] = useState('');
    const [lastnameError, setLastnameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [verifyPasswordError, setVerifyPasswordError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [phnumError, setPhnumError] = useState('');


    const usersCollection = db.collection('Users');

    //Signing up the user(firebase)...
    const Signup = () => {
        
        //Unformat phone number before storing it in DB..
        var unformattedPhoneNumber = unformatPhoneNum(phnum);
        if((password === verifypassword) && (firstnameError === '') && (lastnameError === '') && (addressError === '') && (phnumError === '' && unformattedPhoneNumber.length === 10)) {
                //Calling firebase for signup
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((res) => {
                res.user.updateProfile({
                    displayName: firstname + ' ' + lastname
                })
                console.log(res)
                console.log('User has been registered successfully! ' + res.user.uid)
                usersCollection.doc(res.user.uid).set({
                    firstName: firstname,
                    lastName: lastname,
                    address: address,
                    phoneNumber: unformattedPhoneNumber
                }).then((res) => {
                    alert("You have been successfully registered with eZcape! Enjoy!")
                    navigation.navigate("Login")
                })
            })
            .catch((err) => {
                console.log(err)
                if(err.code == 'auth/invalid-email')
                    alert(err.message)
                else if(err.code == "auth/email-already-in-use")
                    alert(err.message)
                else
                    alert(err.message)
            })
        } else {
            alert("Before submitting, Please make sure all fields are filled without any errors!");
        }
    }

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
    //Use this when we store the phone number into the database..
    function unformatPhoneNum(text){
        var unformatted = '';
        unformatted = text.replace('(', '');
        unformatted = unformatted.replace(')', '');
        unformatted = unformatted.replace('-', '');
        unformatted  = unformatted.replace(' ', '');
        console.log(unformatted)
        
        return unformatted;
    }

/*--------------------------------------------------------------ON BLUR VALIDATIONS -------------------------------------------------------------------*/
    const emailOBvalidation = () => {
        if (email.length < 1)
        {
            setEmailError("Email must not be empty!");
        } else {
            setEmailError("");
        }
    }

    const firstNameOBvalidation = () => {
        var pattern = /^[a-zA-Z]+$/
        if (firstname.length < 1)
        {
            setFirstnameError("First name must not be empty!");
        }
        else if (!pattern.test(firstname))
        {
            setFirstnameError("First name can only contain letters!")
        } else {
            setFirstnameError("");
        }
    }

    const lastNameOBvalidation = () => {
        var pattern = /^[a-zA-Z]+$/
        if (lastname.length < 1)
        {
            setLastnameError("Last name must not be empty!");
        }else if(!pattern.test(lastname)){
            setLastnameError("Last name can only contain letters!")
        }
        else {
            setLastnameError("");
        }
    }

    const phnumOBvalidation = () => {
        //var pattern = /^[0-9]$/
        if (phnum.length < 14)
        {
            setPhnumError("Phone number should be 10 digits!");
        }
        else if (phnum.length > 14)
        {
            setPhnumError("Phone number should be 10 digits!");
        } else {
            setPhnumError("");
        }
        // setPhnum(formatPhoneNumber('+1' + phnum));
    }

    const addressOBvalidation = () => {
        if (address.length < 1)
        {
            setAddressError("Address must not be empty");
        } else {
            setAddressError("");
        }
    }

    const passwordOBvalidation = () => {
        if (password.length < 1)
        {
            setPasswordError("Password must not be empty");
        }
        else if (password.length < 8)
        {
            setPasswordError("Password must be atleast 8 characters in length");
        } else {
            setPasswordError("");
        }
    }

    const verifyPasswordOBvalidation = () => {
        if(verifypassword === '') {
            setVerifyPasswordError("Verification password must not be empty!")
        } else if(verifypassword != password) {
            setVerifyPasswordError("Re-entered password does not match with original!")
        } 
        else {
            setVerifyPasswordError("Passwords matched!");
        }
    } 

/*--------------------------------------------------------------ON CHANGE TEXT VALIDATIONS ------------------------------------------------------------*/   
    const emailOCTvalidation = (typedText) => {
        if (typedText === '')
        {
            setEmailError("Email must not be empty!")
        } else {
            setEmailError("");
        }
        setEmail(typedText);
    }

    const firstNameOCTvalidation = (typedText) => {
        var pattern = /^[a-zA-Z]+$/
        if (typedText === '')
        {
            setFirstnameError("First name must not be empty!");
        }
        else if (!pattern.test(typedText))
        {
            setFirstnameError("First name can only contain letters!")
        } else {
            setFirstnameError("");
        }
        setFirstname(typedText);
    }

    const lastNameOCTvalidation = (typedText) => {
        var pattern = /^[a-zA-Z]+$/
        if (typedText === '')
        {
            setLastnameError("Last name must not be empty!");
        }
        else if(!pattern.test(typedText)){
            setLastnameError("Last name can only contain letters!")
        }
        else {
            setLastnameError("");
        }
        setLastname(typedText);
    }

    const phnumOCTvalidation = (typedText) => {
        if(typedText === '') {
            setPhnumError("Phone number must not be empty!")
        } else {
            setPhnumError("");
        }
        formatPhoneNum(typedText)
    }

    const addressOCTvalidation = (typedText) => {
        if(typedText === '') {
            setAddressError("Address must not be empty!")
        } else {
            setAddressError("");
        }
        setAddress(typedText);
    } 

    const passwordOCTvalidation = (typedText) => {
        if(typedText === '') {
            setPasswordError("Password must not be empty!")
        }
        else if (password.length < 8)
        {
            setPasswordError("Password must be atleast 8 characters in length");
        } else {
            setPasswordError("");
        }
        setPassword(typedText);
    } 

    const verifyPasswordOCTvalidation = (typedText) => {
        if(typedText === '') {
            setVerifyPasswordError("Verification password must not be empty!")
        } else {
            setVerifyPasswordError("");
        }
        setVerifyPassword(typedText);
    } 



return (
        <KeyboardAwareScrollView contentContainerStyle={{flex:1, backgroundColor:"white"}} extraHeight={150} enableOnAndroid>
            <Animatable.View animation = "fadeInDown" style = {styles.container} duration={1000}>
                <Text>SignUp</Text>
                <EzTextInput 
                    placeholder="Firstname"
                    onBlur = {firstNameOBvalidation} 
                    onChangeText={firstNameOCTvalidation}
                    error = {firstnameError}
                    defaultValue={firstname}
                />
                <EzTextInput 
                    placeholder="Lastname"
                    onBlur = {lastNameOBvalidation} 
                    onChangeText={lastNameOCTvalidation}
                    error = {lastnameError}
                    defaultValue={lastname}
                    
                />
                <EzTextInput 
                    placeholder="Email" 
                    onBlur = {emailOBvalidation}
                    onChangeText={emailOCTvalidation}
                    error = {emailError}
                    defaultValue={email}
                    keyboardType = "email-address"
                />
                <EzTextInput 
                    placeholder="Password" 
                    onBlur = {passwordOBvalidation}
                    onChangeText={passwordOCTvalidation}
                    error={passwordError}
                    defaultValue={password}
                    secureTextEntry={true}
                />
                <EzTextInput 
                    placeholder="Verify Password"
                    onBlur = {verifyPasswordOBvalidation} 
                    onChangeText={verifyPasswordOCTvalidation}
                    error={verifyPasswordError}
                    defaultValue={verifypassword}
                    secureTextEntry={true}
                />
                
                <EzTextInput 
                    placeholder="Address" 
                    onBlur = {addressOBvalidation}
                    onChangeText={addressOCTvalidation}
                    error={addressError}
                    defaultValue={address}
                />
                <EzTextInput 
                    placeholder="Phone Number" 
                    onBlur = {phnumOBvalidation}
                    onChangeText={phnumOCTvalidation}
                    value={phnum}
                    error={phnumError}
                    maxLength={14}
                    keyboardType = "phone-pad"
                />
                {/* <EzPhoneInput
                    placeholder="Enter phone number"
                    value={phnum}
                    defaultCountry="US"
                    maxLength={14}
                    onChange={setPhnum}
                /> */}
                <EzButton
                    onPress={Signup}
                    title = {"Register"}
                />
            </Animatable.View>
        </KeyboardAwareScrollView>
        
    )
}
const styles = StyleSheet.create({
    container: {
        alignItems:"center",
        paddingTop: '5%',
    },
})