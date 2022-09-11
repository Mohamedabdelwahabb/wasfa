import { useReducer, useEffect, useState } from "react";
import { db } from "../util/firebase.config";

import { addDoc, collection, updateDoc } from "firebase/firestore";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return {
        ...state,
        isPending: true,
        document: null,
        success: false,
        error: null,
      };
    case "ADDED_DOCUMENT":
      return {
        ...state,
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "EDITED_DOCUMENT":
      return {
        ...state,
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "ERROR":
      return {
        ...state,
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const useFirestore = (collectionName) => {
  //! response is the current statte
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  // collection ref
  const ref = collection(db, collectionName);

  // only dispatch the action if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // add a document to the firestore
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const addedDocument = await addDoc(ref, doc);
      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  // edit a document in the firestore
  const editDocument = async (id, updates) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const editedDocument = await updateDoc(id, updates);
      dispatchIfNotCancelled({
        type: "EDITED_DOCUMENT",
        payload: editedDocument,
      });

      return editedDocument;
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  // delete a document from the firestore
  const deleteDocument = async (id) => {};

  // clean up function
  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { addDocument, editDocument, deleteDocument, response };
};
