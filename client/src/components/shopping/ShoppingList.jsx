import { Fragment } from "react";
import { NavLink } from "react-router-dom";
//!
import { useCollection } from "../../hooks/useCollection";
import { dltDoceById } from "../../util/firebase.config";
//!
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Typography, Button } from "@mui/material";
//!
const ShoppingList = ({ setTitle }) => {
  const [shoppingList] = useCollection("ShoppingCart");

  return (
    <Fragment>
      {shoppingList &&
        shoppingList?.map(({ title, id }) => {
          return (
            <Box key={id} sx={{ display: "flex" }}>
              <NavLink to={`/grocery/${id}`}>
                <Typography>{title} </Typography>
              </NavLink>
              <Button
                sx={{ color: "red" }}
                onClick={() => {
                  dltDoceById(id, "ShoppingCart");
                }}
              >
                <DeleteIcon />
              </Button>
            </Box>
          );
        })}
    </Fragment>
  );
};

export default ShoppingList;
