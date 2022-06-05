import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../util/firebase";
const useCollection = (colName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, colName), (snapshot) => {
      const collectionData = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setData(collectionData);
      setLoading(false);
    });
    //clean up
    return () => unsubscribe();
    // eslint-disable-next-line
  }, []);

  return [data, loading];
};

export { useCollection };
