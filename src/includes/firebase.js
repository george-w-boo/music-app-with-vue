import firebase from "firebase/app";
import "firebae/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfNfQuJC97T3g5UdDEElFuMdMQRf5jiwI",
  authDomain: "music-d9916.firebaseapp.com",
  projectId: "music-d9916",
  storageBucket: "music-d9916.appspot.com",
  // messagingSenderId: "1049878372846",
  appId: "1:1049878372846:web:43845025b8bd7f733eaeff",
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
