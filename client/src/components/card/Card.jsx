import { doc, setDoc } from "firebase/firestore";
import { db } from "../../util/firebase.config";
import { NavLink } from "react-router-dom";
//!
import { Checkbox, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Favorite from "@mui/icons-material/Favorite";

export default function RecipeCard({
  title,
  image,
  id,
  rating,
  cookTime,
  servings,
  description,
}) {
  const docData = {
    title: title,
    image: image,
    cookTime: cookTime,
    description: description,
  };
  function handleFav(id) {
    setDoc(doc(db, "favorites", id), docData);
  }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <NavLink to={`/recipe/${id}`}>
        <CardMedia component="img" height="194" image={image} alt={title} />
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "rgb(92, 172, 14)" }} aria-label="recipe">
              W
            </Avatar>
          }
          title={title}
        />
      </NavLink>
      <Typography>cookTime: {cookTime}min </Typography>
      <CardContent varient="body2">
        <CardActions>
          <IconButton
            aria-label="add to favorites"
            onClick={() => handleFav(id)}
          >
            <Checkbox
              icon={<FavoriteBorderIcon />}
              checkedIcon={<Favorite sx={{ color: "red" }} />}
            />
          </IconButton>
        </CardActions>
      </CardContent>
    </Card>
  );
}
