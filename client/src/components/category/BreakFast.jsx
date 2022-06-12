import { query, where } from "firebase/firestore";
import { recipeRef } from "../../util/firebase.config";
import { useQuery } from "../../hooks/useQuery";
import { SuggestionCard } from "../suggestion/Card";
import { Wraper } from "../suggestion/Suggestion";

const BreakFast = () => {
  const qBF = query(recipeRef, where("category", "==", "breakfast"));
  const [breakFast] = useQuery(qBF);

  return (
    <Wraper>
      {breakFast &&
        breakFast?.map(({ title, id, image, category }) => {
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

export default BreakFast;
