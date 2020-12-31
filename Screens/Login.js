import React from 'react'
import {useState} from 'react';
import { StyleSheet, View, Text, TextInput} from 'react-native'
import EzButton from '../Components/EzButton'
import firebase from '../Firebase/firebaseConfig';
import EzTextInput from '../Components/EzTextInput';


export default function Login({navigation}) {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const login = () => {
        if(email != ''){
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then((res) => {
                console.log(res)
                console.log('User logged-in successfully!')
                navigation.navigate('Home');
            })
        } else {
           setEmailError("Email must not be empty!");
        }
        
    }

    const redirectSignUp = () => {
        navigation.navigate('SignUp');
    }

    const onChange = (type, value) =>{
        (type == 'email') ? ((value === '') ? setEmailError("Email must not be empty!") : setemail(value)): {};
        (type == 'password') ? ((value === '') ? setPasswordError("Password must not be empty!") : setPassword(value)): {};
    }
    
    
    return (
        <View style={styles.container}>
            <Text style={styles.textInput}>Login</Text>
            <EzTextInput 
                placeholder="Email" 
                defaultValue={email}
                error={emailError}
                onChangeText={(value) => onChange('email',value)}
            />
            <EzTextInput 
                placeholder="Password" 
                defaultValue={password}
                secureTextEntry={true}
                error={passwordError}
                onChangeText={(value) => onChange('password', value)}
            />
            <EzButton onPress={login} title={"Login"} />
            <EzButton onPress={redirectSignUp} title={"New User? Sign Up"} />
            
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: '1',
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: '20%',
    },
    textInput: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1rem',
    },
    button: {
        width: "100%",
    }
  });