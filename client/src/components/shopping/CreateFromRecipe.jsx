import { useState } from "react";
//!
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../util/firebase.config";
//!
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Button, Checkbox, Typography } from "@mui/material";
//!
import { ButtonA } from "../../pages/RecipeDetail";

const CreateShoppingList = ({ id, title, ingredients }) => {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState({
    cartList: [],
  });

  //! import theme cuz only background color of the body change but not the container of recipe detaill

  const addToCart = () => {
    setDoc(doc(db, "ShoppingCart", id), { ...list, title: title });
    handleClose();
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCartList = (e) => {
    //! Destructuring
    const { value, checked } = e.target;
    const { cartList } = list;

    //! Case 1 : The user checks the box
    if (checked) {
      setList({
        cartList: [...cartList, value],
      });
    }

    //! Case 2  : The user unchecks the box
    else {
      setList({
        cartList: cartList.filter((e) => e !== value),
      });
    }
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add to Shopping List</DialogTitle>
        <DialogContent>
          {ingredients?.map(({ name }, i) => {
            return (
              <Box
                key={i}
                sx={{
                  width: 400,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography gutterBottom variant="h6" component="div">
                    {name}
                  </Typography>
                </Box>
                <Box>
                  <Checkbox
                    color="success"
                    value={name}
                    onChange={(e) => handleCartList(e)}
                  />
                </Box>
              </Box>
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addToCart}>Add</Button>
        </DialogActions>
      </Dialog>
      <ButtonA
        variant="contained"
        size="medium"
        startIcon={<AddShoppingCartIcon />}
        onClick={handleClickOpen}
      >
        Add
      </ButtonA>
    </div>
  );
};

export default CreateShoppingList;
