import React, { useState } from "react";

//!
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Chip,
} from "@mui/material";

//!
const Ingredient = ({ ingredients, setIngredient }) => {
  const [input, setInput] = useState("");
  const add = (e) => {
    e.preventDefault();
    if (!input) {
      return;
    }
    setIngredient((ingredients) => [...ingredients, input]);

    setInput("");
  };

  const remove = (index) => {
    setIngredient((ingredients) => ingredients.filter((_, i) => i !== index));
  };
  console.log(ingredients);
  return (
    <Box sx={{ dispaly: "flex" }}>
      <Box onSubmit={add} component="form" noValidate autoComplete="off">
        <FormControl>
          <OutlinedInput
            sx={{
              height: "40px",
              margin: "1em",
              width: "600px",
              borderRadius: "15px",
              backgroundColor: "white",
            }}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <AddIcon />
              </InputAdornment>
            }
            placeholder="Add one or multiple items"
          />
        </FormControl>
      </Box>

      <Box className="item-list">
        {ingredients
          .map((item, index) => (
            <Box className="item-container" key={index}>
              <Box className="item-name">
                <Chip
                  sx={{ backgroundColor: "white", margin: ".5em" }}
                  label={item}
                  onDelete={() => remove(index)}
                />
              </Box>
            </Box>
          ))
          .reverse()}
      </Box>
    </Box>
  );
};

export default Ingredient;
