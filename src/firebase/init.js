import firebase from 'firebase'
import firestore from 'firebase/firestore'

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAuC5jDAJKuOy27dm1QSP7c_ZbkFv--4yI",
    authDomain: "caltracker-e6415.firebaseapp.com",
    databaseURL: "https://caltracker-e6415.firebaseio.com",
    projectId: "caltracker-e6415",
    storageBucket: "caltracker-e6415.appspot.com",
    messagingSenderId: "165051757684",
    appId: "1:165051757684:web:fa6e91ba393390a147cd21",
    measurementId: "G-JWE2DSFCL5"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebaseApp.firestore()