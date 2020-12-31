import React, {useState} from 'react'
import { View, Text, StyleSheet } from 'react-native'
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
    const [phnum, setPhonenum] = useState('');
    const usersCollection = db.collection('Users');

    const submitForm = () => {
        if(password === verifypassword && 
            phnum.length === 10) {
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
    return (
        <View style={styles.container}>
            <Text>SignUp</Text>
            <EzTextInput 
                placeholder="Firstname" 
                onChangeText={firstname => setFirstname(firstname)}
                defaultValue={firstname}
            />
            <EzTextInput 
                placeholder="Lastname" 
                onChangeText={lastname => setLastname(lastname)}
                defaultValue={lastname}
            />
            <EzTextInput 
                placeholder="Email" 
                onChangeText={email => setEmail(email)}
                defaultValue={email}
            />
            <EzTextInput 
                placeholder="Password" 
                onChangeText={password => setPassword(password)}
                defaultValue={password}
                secureTextEntry={true}
            />
            <EzTextInput 
                placeholder="Verify Password" 
                onChangeText={verifypassword => setVerifPassword(verifypassword)}
                defaultValue={verifypassword}
                secureTextEntry={true}
            />
            
            <EzTextInput 
                placeholder="Address" 
                onChangeText={address => setAddress(address)}
                defaultValue={address}
            />
            <EzTextInput 
                placeholder="Phone Number" 
                onChangeText={phnum => setPhonenum(phnum)}
                defaultValue={phnum}
            />
            <EzButton
                onPress={submitForm}
                title = {"Register"}
            />
        </View>
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
