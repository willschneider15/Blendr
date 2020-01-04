// Setup firebase auth
var firebaseAuth = require("firebase/app");

var firebaseConfig = {
    apiKey: "AIzaSyDD_rpgNVVRut0t601rRpWOWStpigrx-wA",
    authDomain: "blendr-ffa89.firebaseapp.com",
    databaseURL: "https://blendr-ffa89.firebaseio.com",
    projectId: "blendr-ffa89",
    storageBucket: "blendr-ffa89.appspot.com",
    messagingSenderId: "994183566329",
    appId: "1:994183566329:web:9365f69f7670cf2e46a328",
    measurementId: "G-3653LH59L2"
  };

  firebaseAuth.initializeApp(firebaseConfig);

// Export needed globals
export { firebaseAuth };
