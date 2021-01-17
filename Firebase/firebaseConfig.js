import firebase from 'firebase';
import firestore from 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyCrQjBBRX6HFRJDMyeTftu7WH4K9rInUJk",
    authDomain: "ezcape-d268d.firebaseapp.com",
    databaseURL: "https://ezcape-d268d-default-rtdb.firebaseio.com/",
    projectId: "ezcape-d268d",
    storageBucket: "ezcape-d268d.appspot.com",
    messagingSenderId: "1036973914052",
    appId: "1:1036973914052:web:322b06890bbe15acec1691",
    measurementId: "G-E7P01YG1YP"
  };

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export default firebase;