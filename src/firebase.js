import firebase from 'firebase';

const firebaseApp = firebase.initializeApp(
     {
        apiKey: "AIzaSyA10CsabutHOZJnspOur03reHy3Drc95j4",
        authDomain: "messenger-clone-f755a.firebaseapp.com",
        databaseURL: "https://messenger-clone-f755a.firebaseio.com",
        projectId: "messenger-clone-f755a",
        storageBucket: "messenger-clone-f755a.appspot.com",
        messagingSenderId: "531982806639",
        appId: "1:531982806639:web:964458ce3595726c84679a",
        measurementId: "G-PQKZZ1398G"
      }
);

const db = firebaseApp.firestore();
export default db;
