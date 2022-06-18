import { Fragment } from "react";
//
import { Alert, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
//
import SuggestedMeal from "./SuggestedMeal";

const SuggestionList = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h4" gutterBottom component="div">
        <Alert severity="info">
          it is time for breakfast — <strong>check our meals !</strong>
        </Alert>
      </Typography>
      <SuggestedMeal />
    </Box>
  );
};

export default SuggestionList;

//style
export const Wraper = styled(Box)`
  display: flex;
  flexwrap: wrap;
  gap: 20px;
  boxshadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  marginbottom: 4em;
`;
