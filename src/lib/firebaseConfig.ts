import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyBhfiGGg_AtwqvYAvqTxqhahdPETpYmLQo",
  authDomain: "store-manager-7abe8.firebaseapp.com",
  projectId: "store-manager-7abe8",
  storageBucket: "store-manager-7abe8.firebasestorage.app",
  messagingSenderId: "521187155132",
  appId: "1:521187155132:web:a84eb345527a5287ed44b9",
  measurementId: "G-VTV8TF972P"
};


if (!getApps().length) {
initializeApp(firebaseConfig)
}


export const db = getFirestore()