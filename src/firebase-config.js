import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBkMka24mHwmBa_3rFDoyur-e9dXON9neY",
  authDomain: "vidyaverse-d4097.firebaseapp.com",
  projectId: "vidyaverse-d4097",
  storageBucket: "vidyaverse-d4097.firebasestorage.app",
  messagingSenderId: "222292601109",
  appId: "1:222292601109:web:a070aae60c5da6bbdda11c",
  measurementId: "G-ZLQG4CTRGD"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;
      console.log(profilePic);
      
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);
      window.location.href="/home"
    })
    .catch((error) => {
      console.log(error);
    });
};

export const storage = getStorage(app);