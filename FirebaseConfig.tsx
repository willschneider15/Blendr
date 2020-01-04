// Setup firebase auth
import firebase from 'firebase'
import data from './secrets.json'
import '@firebase/firestore';

var firebaseConfig = {
    apiKey: data.firebaseKey,
    authDomain: "blendr-ffa89.firebaseapp.com",
    databaseURL: "https://blendr-ffa89.firebaseio.com",
    projectId: "blendr-ffa89",
    storageBucket: "blendr-ffa89.appspot.com",
    messagingSenderId: "994183566329",
    appId: "1:994183566329:web:9365f69f7670cf2e46a328",
    measurementId: "G-3653LH59L2"
  };

  firebase.initializeApp(firebaseConfig);

// Setup firestore
const firestore = firebase.firestore();
const firebaseAuth = firebase.auth();

// Export needed globals
export { firebaseAuth };
export { firestore };
