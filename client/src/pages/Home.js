import React, { useEffect, useState } from "react";
import { readAllItems } from "../util/firebase";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    async function getAllRecipe() {
      const response = await readAllItems();

      setRecipes(response);
      // console.log(response);
    }
    getAllRecipe();
  }, []);

  if (!recipes) return null;

  return (
    <div>
      {Object.entries(recipes).map(([objectKey, objectValue]) => {
        return <div key={objectKey}>{objectValue.name}</div>;
      })}
    </div>
  );
};

export default Home;
