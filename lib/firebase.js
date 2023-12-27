import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAKuJnF4reFZTAwm6cqKGsY4QpUfeqJO-0",
  authDomain: "gift-card-tracker-49f3f.firebaseapp.com",
  projectId: "gift-card-tracker-49f3f",
  storageBucket: "gift-card-tracker-49f3f.appspot.com",
  messagingSenderId: "268269353098",
  appId: "1:268269353098:web:0e77fd031289b4708d1573"
};

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export { app, db }