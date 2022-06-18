import { query, where } from "firebase/firestore";
import { recipeRef } from "../../util/firebase.config";
import { useQuery } from "../../hooks/useQuery";
//!
import { Box, styled } from "@mui/material";
//!
import SuggestionCard from "./Card";
//!
const SuggestedMeal = () => {
  let filter = "";
  let time = new Date().getHours();
  if (time < 12) {
    filter = "breakfast";
  } else if (time >= 12 && time < 18) {
    filter = "lunch";
  } else {
    filter = "dinner";
  }
  const qBF = query(recipeRef, where("category", "==", filter));
  const [meals] = useQuery(qBF);

  return (
    <Wraper>
      {meals &&
        meals?.map(({ title, id, image, category }) => {
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

export default SuggestedMeal;

//style
const Wraper = styled(Box)`
  display: flex;
  justify-content: center;
`;
