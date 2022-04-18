import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const dotenv = require("dotenv");
dotenv.config();
const {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
} = process.env;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL:
    "https://socialapp-96cd2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
export default db;
import { collection, doc, setDoc } from "firebase/firestore";

const citiesRef = collection(db, "users");

await setDoc(doc(citiesRef, "SF"), {
  name: "San Francisco",
  state: "CA",
  country: "USA",
  capital: false,
  population: 860000,
  regions: ["west_coast", "norcal"],
});
await setDoc(doc(citiesRef, "LA"), {
  name: "Los Angeles",
  state: "CA",
  country: "USA",
  capital: false,
  population: 3900000,
  regions: ["west_coast", "socal"],
});
await setDoc(doc(citiesRef, "DC"), {
  name: "Washington, D.C.",
  state: null,
  country: "USA",
  capital: true,
  population: 680000,
  regions: ["east_coast"],
});
await setDoc(doc(citiesRef, "TOK"), {
  name: "Tokyo",
  state: null,
  country: "Japan",
  capital: true,
  population: 9000000,
  regions: ["kanto", "honshu"],
});
await setDoc(doc(citiesRef, "BJ"), {
  name: "Beijing",
  state: null,
  country: "China",
  capital: true,
  population: 21500000,
  regions: ["jingjinji", "hebei"],
});
