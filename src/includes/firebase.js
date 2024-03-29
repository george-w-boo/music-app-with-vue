import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

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
firebase.initializeApp(firebaseConfig);
// !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

const usersCollection = db.collection("users");
const songsCollection = db.collection("songs");
const commentsCollection = db.collection("comments");

export {
  auth,
  db,
  usersCollection,
  songsCollection,
  storage,
  commentsCollection,
};
