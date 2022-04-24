import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child, remove } from "firebase/database";
// import { v4 as uuidv4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyBZSU5WE_mmHjoiuv0_J-vZxzsGZZ1h10w",
  authDomain: "recipe-2b3f2.firebaseapp.com",
  databaseURL:
    "https://recipe-2b3f2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "recipe-2b3f2",
  storageBucket: "recipe-2b3f2.appspot.com",
  messagingSenderId: "852754771641",
  appId: "1:852754771641:web:c4cf039f1fe08c4885f568",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// Get a reference to the database service
export const database = getDatabase(app);

export const writeItem = (item) => {
  set(ref(database, "users/" + item.id), item);
};

export const updateItem = (id, item) => {
  set(ref(database, "users/" + id), item);
};

export const readItem = async (itemId) => {
  const dbRef = ref(database);
  const snapshot = await get(child(dbRef, `recipes/${itemId}`));
  if (snapshot.exists()) {
    return snapshot.val();
  }
};

export const removeItem = async (id) => {
  await remove(ref(database, "recipes/" + id));
};

export const readAllItems = async () => {
  const dbRef = ref(database);
  const snapshot = await get(child(dbRef, `recipes/`));
  if (snapshot.exists()) {
    return snapshot.val();
  }
};
