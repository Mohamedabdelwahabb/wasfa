import { db } from "../../util/firebase.config";
//!
import { doc, updateDoc } from "firebase/firestore";
import { Box, Rating } from "@mui/material";

export const RatingComp = ({ id, rating }) => {
  const ratingHandler = async (e, newRating) => {
    const recipeRef = doc(db, "recipes", id);
    console.log(rating);
    const res = await updateDoc(recipeRef, { rating: newRating });
  };
  return (
    <Box sx={{ position: "absolute", bottom: "1em", left: "1em" }}>
      <Rating name="Rating Label" value={rating} onChange={ratingHandler} />
    </Box>
  );
};
