import { initializeApp } from "firebase/app";
import { deleteDoc, doc, getFirestore, updateDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { collection, getDocs } from "firebase/firestore";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: "recipesreactjs",
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const recipeRef = collection(db, "recipes");

const fetchRecipesCol = async () => {
  const data = await getDocs(recipeRef);
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
export { fetchRecipesCol, recipeRef, db, dltRecipeById, updateRecipe, storage };
