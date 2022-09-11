import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

const useQuery = (q) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  //!snaphot obj have docs
  useEffect(() => {
    const unsubscribe = onSnapshot(q, (snapshot) => {
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

export { useQuery };
