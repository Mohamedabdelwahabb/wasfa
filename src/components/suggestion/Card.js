import * as React from "react";
import { NavLink } from "react-router-dom";
//!
import { CardMedia, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
//!

export const SuggestionCard = ({ image, title, id, category }) => {
  return (
    <NavLink to={`recipe/${id}`}>
      <Card sx={{ maxWidth: 345, margin: ".5em" }}>
        <CardMedia component="img" height="140" image={image} alt={title} />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
        </CardContent>
      </Card>
    </NavLink>
  );
};
export default SuggestionCard;
