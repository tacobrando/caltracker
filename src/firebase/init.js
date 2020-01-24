import firebase from 'firebase'
import firestore from 'firebase/firestore'

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCZ8uZNaGPRdRzNJCoDiXlk0vnapX5LHxg",
    authDomain: "caltracker-334ca.firebaseapp.com",
    databaseURL: "https://caltracker-334ca.firebaseio.com",
    projectId: "caltracker-334ca",
    storageBucket: "caltracker-334ca.appspot.com",
    messagingSenderId: "sender-id",
    appId: "1:935745267691:web:680c77213d52453dc45bae",
    measurementId: "G-measurement-id",
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebaseApp.firestore()