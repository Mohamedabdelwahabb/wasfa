import { initializeApp } from "firebase/app";
import { deleteDoc, doc, getFirestore, updateDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { collection, getDocs } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDDK3fp_nfWGDZ4XbOhIqnjriLFWOmiDkY",

  authDomain: "recipesreactjs.firebaseapp.com",

  projectId: "recipesreactjs",

  storageBucket: "recipesreactjs.appspot.com",

  messagingSenderId: "922889327764",

  appId: "1:922889327764:web:54d69cb896800d58fe9081",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const recipesColRef = collection(db, "recipes");

const fetchRecipesCol = async () => {
  const data = await getDocs(recipesColRef);
  const result = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return result;
};

const dltRecipeById = async (id) => {
  await deleteDoc(doc(db, "favorites", id));
  return id;
};
const updateRecipe = async (id, data) => {
  const docRef = doc(db, "favorites", id);
  await updateDoc(docRef, data);
};
export {
  fetchRecipesCol,
  recipesColRef,
  db,
  dltRecipeById,
  updateRecipe,
  storage,
};
