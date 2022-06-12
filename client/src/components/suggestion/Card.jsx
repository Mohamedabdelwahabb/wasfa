import { Box, CardMedia, styled, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

// export const Card = ({ image, title, id }) => {
//   return (

//       <Wraper item xs={3}>
//         <CardMedia image={image} alt={title} sx={{ height: 200 }} />
//         <Typography sx={{ fontSize: 14 }}>{title} </Typography>
//       </Wraper>

//   );
// };

import * as React from "react";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";

export const SuggestionCard = ({ image, title, id, category }) => {
  return (
    <NavLink to={`recipe/${id}`}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia component="img" height="140" image={image} alt={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {" "}
            {title}
          </Typography>
        </CardContent>
      </Card>
    </NavLink>
  );
};
const Wraper = styled(Box)`
  height: 300px;
  width: 245px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 10px 10px 26px 0px rgba(0, 0, 0, 0.35);
`;
