import { query, where } from "firebase/firestore";
import { recipeRef } from "../../util/firebase.config";
import { useQuery } from "../../hooks/useQuery";
import { SuggestionCard } from "../suggestion/Card";
import { Wraper } from "../suggestion/Suggestion";

const Dinner = () => {
  const qBF = query(recipeRef, where("category", "==", "dinner"));

  const [dinner] = useQuery(qBF);
  return (
    <Wraper>
      {dinner &&
        dinner?.map(({ title, id, image, category }) => {
          return (
            <SuggestionCard
              image={image}
              title={title}
              id={id}
              key={id}
              category={category}
            />
          );
        })}
    </Wraper>
  );
};

export default Dinner;
