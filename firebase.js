import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD699oFN_vi5yPejQXK090aOWcquEMoG5A",
    authDomain: "react-chat-app-a48a5.firebaseapp.com",
    projectId: "react-chat-app-a48a5",
    storageBucket: "react-chat-app-a48a5.appspot.com",
    messagingSenderId: "915872705866",
    appId: "1:915872705866:web:23109fbd42cd951bbe25b3",
    measurementId: "G-E4HN2NS129"
  };


  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore(); 
  const auth = firebaseApp.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;

