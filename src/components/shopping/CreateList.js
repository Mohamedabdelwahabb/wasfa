import React from "react";
import { Fragment } from "react";
//!
import { useFirestore } from "../../hooks/useFirestore";
//!
import AddIcon from "@mui/icons-material/Add";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Chip,
} from "@mui/material";

//

const CreateList = ({
  title,
  setTitle,
  cartList,
  setCartList,
  name,
  setName,
}) => {
  const { addDocument } = useFirestore("ShoppingCart");

  const add = (e) => {
    e.preventDefault();
    if (!name) {
      return;
    }
    setCartList((cartList) => [...cartList, name]);
    setName("");
  };

  const remove = (index) => {
    setCartList((cartList) => cartList.filter((_, i) => i !== index));
  };

  const writeDoc = () => {
    const data = {
      title:
        title === ""
          ? `list of ${new Date().getDate()}/${new Date().getMonth()}`
          : title,

      cartList,
    };
    addDocument(data);
    setCartList([]);
    setTitle("");
  };
  return (
    <Fragment>
      <Box onSubmit={add} component="form" noValidate autoComplete="off">
        <FormControl sx={{ width: "40ch", borderRadius: "15px" }}>
          <OutlinedInput
            sx={{ borderRadius: "15px" }}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <AddIcon />
              </InputAdornment>
            }
            placeholder="Add item"
          />
        </FormControl>
      </Box>
      {cartList.length > 0 ? (
        <Box margin="1em">
          <Button
            variant="contained"
            sx={{ margin: "1em" }}
            onClick={() => writeDoc()}
          >
            Save
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "red", color: "white" }}
            startIcon={<DeleteIcon />}
            onClick={() => setCartList([])}
          >
            delete
          </Button>
        </Box>
      ) : (
        <Box>Add something to your list</Box>
      )}
      <Box className="item-list">
        {cartList.reverse().map((item, index) => (
          <Box className="item-container" key={index}>
            <Box className="item-name">
              <Chip
                variant="outlined"
                icon={<ShoppingBasketIcon />}
                label={item}
                onDelete={() => remove(index)}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Fragment>
  );
};

export default CreateList;
