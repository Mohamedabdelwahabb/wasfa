import { db } from "../../util/firebase.config";
import { doc, updateDoc } from "firebase/firestore";
//!
import { Box, Rating } from "@mui/material";
//!
const RatingComp = ({ id, rating }) => {
  const ratingHandler = async (e, newRating) => {
    const recipeRef = doc(db, "recipes", id);
    const res = await updateDoc(recipeRef, { rating: newRating });
    return res;
  };
  return (
    <Box sx={{ position: "absolute", bottom: "1em", left: "1em" }}>
      <Rating name="Rating Label" value={rating} onChange={ratingHandler} />
    </Box>
  );
};
export default RatingComp;
