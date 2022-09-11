import React from "react";
//!
import { Box } from "@mui/material";
import "./filter.css";
//!
const FilterCategory = ({ type, changeFilter }) => {
  const categories = ["all", "breakfast", "lunch", "dinner"];
  const handleClick = (newCategory) => {
    changeFilter(newCategory);
  };

  return (
    <Box className="recipe-filter">
      {categories.map((category) => (
        <button
          key={category}
          className={type === category ? "active" : ""}
          onClick={() => handleClick(category)}
        >
          {category}
        </button>
      ))}
    </Box>
  );
};

export default FilterCategory;
