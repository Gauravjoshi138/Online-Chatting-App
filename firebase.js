import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    //firebase configuration.
  };


  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore(); 
  const auth = firebaseApp.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;

