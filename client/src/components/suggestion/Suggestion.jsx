import { Alert, AlertTitle, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import BreakFast from "../category/BreakFast";
import Lunch from "../category/Lunch";
import Dinner from "../category/Dinner";
import { Fragment } from "react";

const Suggestion = () => {
  let time = new Date().getHours();

  if (time < 12) {
    return (
      <Fragment>
        <Typography variant="h4" gutterBottom component="div">
          <Alert severity="info">
            it is time for breakfast — <strong>check our meals !</strong>
          </Alert>
        </Typography>

        <BreakFast />
      </Fragment>
    );
  } else if (time >= 12 && time < 18) {
    return (
      <Fragment>
        <Typography variant="h4" gutterBottom component="div">
          <Alert severity="info">
            it is time for lunch — <strong>check our meals !</strong>
          </Alert>
        </Typography>

        <Lunch />
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <Typography variant="h4" gutterBottom component="div">
          <Alert severity="info">
            it is time for dinner — <strong>check our meals !</strong>
          </Alert>
        </Typography>

        <Dinner />
      </Fragment>
    );
  }
};

export default Suggestion;
export const Wraper = styled(Box)`
  display: flex;
  flexwrap: wrap;
  gap: 20px;
  boxshadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  marginbottom: 4em;
`;
