import React, {useState} from 'react'
import { KeyboardAvoidingView, Text, StyleSheet } from 'react-native'
import EzButton from '../Components/EzButton';
import EzTextInput from '../Components/EzTextInput'
import firebase, {db} from '../Firebase/firebaseConfig';
export default function SignUp() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifypassword, setVerifPassword] = useState('');
    const [address, setAddress] = useState('');
    const [phnum, setPhnum] = useState('');

    const [firstnameError, setFirstnameError] = useState('');
    const [lastnameError, setLastnameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [phnumError, setPhnumError] = useState('');


    const usersCollection = db.collection('Users');

    //Signing up the user(firebase)...
    const Signup = () => {
        if(password === verifypassword && 
            phnum.length === 10) {
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
                    phoneNumber: phnum
                })
            })
        } else {
            console.log("Error: Passwords don't match")
        }
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
        var pattern = /^[a-zA-Z]$/
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
        var pattern = /^[a-zA-Z]$/
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
        if (phnum.length < 10)
        {
            setPhnumError("Phone number not long enough");
        }
        else if (phnum.length > 10)
        {
            setPhnumError("Phone number is too long");
        } else {
            setPhnumError("");
        }
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
        } else {
            setPasswordError("");
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
        var pattern = /^[a-zA-Z]$/
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
        var pattern = /^[a-zA-Z]$/
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
        setPhnum(typedText);
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
        } else {
            setPasswordError("");
        }
        setPassword(typedText);
    } 

return (
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
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
                onBlue = {passwordOBvalidation} 
                onChangeText={passwordOCTvalidation}
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
                defaultValue={phnum}
                error={phnumError}
                maxLength={10}
                keyboardType = "phone-pad"
            />
            <EzButton
                onPress={Signup}
                title = {"Register"}
            />
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: '5%',
    },
})
