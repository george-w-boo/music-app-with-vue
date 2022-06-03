import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfNfQuJC97T3g5UdDEElFuMdMQRf5jiwI",
  authDomain: "music-d9916.firebaseapp.com",
  projectId: "music-d9916",
  storageBucket: "music-d9916.appspot.com",
  // messagingSenderId: "1049878372846",
  appId: "1:1049878372846:web:43845025b8bd7f733eaeff",
};

// Initialize Firebas
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const auth = firebase.auth();
const db = firebase.firestore();

const usersCollection = db.collection("users");

export { auth, db, usersCollection };
