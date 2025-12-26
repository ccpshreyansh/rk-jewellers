import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyAFHQ5Cz89n-_x6ujZDy-Btguyu7teYEog",
  authDomain: "rk-jewellers-5a614.firebaseapp.com",
  projectId: "rk-jewellers-5a614",
  storageBucket: "rk-jewellers-5a614.firebasestorage.app",
  messagingSenderId: "558173277218",
  appId: "1:558173277218:web:b04d5f31075baaa2758e7b",
  measurementId: "G-E8544P191W"
};


if (!getApps().length) {
initializeApp(firebaseConfig)
}


export const db = getFirestore()