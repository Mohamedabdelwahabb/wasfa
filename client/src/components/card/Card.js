import { NavLink } from "react-router-dom";
//!
import { doc, setDoc } from "firebase/firestore";
import { db, dltDoceById } from "../../util/firebase.config";
//!
import { Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

import { useCollection } from "../../hooks/useCollection";
//!
export default function RecipeCard({
  title,
  image,
  id,
  cookTime,
  description,
}) {
  const [favorites] = useCollection("favorites");
  const favId = favorites.map(({ id }) => id);

  //! to save in fav collection
  const docData = {
    title: title,
    image: image,
    cookTime: cookTime,
    description: description,
  };
  function addToFavorite(id) {
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
          {favId && favId.indexOf(id) > -1 ? (
            <IconButton
              aria-label="add to favorites"
              onClick={() => {
                dltDoceById(id, "favorites");
              }}
            >
              <FavoriteIcon sx={{ color: "red" }} />
            </IconButton>
          ) : (
            <IconButton
              aria-label="add to favorites"
              onClick={() => addToFavorite(id)}
            >
              <FavoriteIcon />
            </IconButton>
          )}
        </CardActions>
      </CardContent>
    </Card>
  );
}
