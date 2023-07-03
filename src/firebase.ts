import {
  initializeApp,
  getApp,
} from "@firebase/app";

import { 
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
 
  getDoc,
 
 
  arrayRemove,
  
  getFirestore,
  Timestamp,
  arrayUnion
} from "@firebase/firestore";


import {
  getAuth,
  signOut,
  
 
  signInWithPopup,
 
  onAuthStateChanged,
 
  User,
 
 
  Auth,
  AuthProvider,
  
  GoogleAuthProvider,
} from "@firebase/auth";



const firebaseConfig = {
  apiKey:import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID 
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { 
      app,
          initializeApp,
          getApp,

     

      auth,
          
          signInWithPopup,
          
          onAuthStateChanged,
        
          type User,
          
          type Auth,
          type AuthProvider,
          
          GoogleAuthProvider,
          
          signOut,

      db,
          collection,
          arrayRemove,
          doc,
          addDoc,
         
          setDoc,
          updateDoc,
         
          deleteDoc,
          arrayUnion,
          getDoc,
         
          Timestamp,
          
};

