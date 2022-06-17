import React from "react";
//!
import { Box } from "@mui/material";
import "./filter.css";

const FilterCategory = ({ setType, type, changeFilter }) => {
  const filters = ["all", "breakfast", "lunch", "dinner"];
  const handleClick = (newFilter) => {
    changeFilter(newFilter);
  };

  return (
    <Box className={"recipe-filter"}>
      {filters.map((filter) => (
        <button
          key={filter}
          className={type === filter ? "active" : ""}
          onClick={() => handleClick(filter)}
        >
          {filter}
        </button>
      ))}
    </Box>
  );
};

export default FilterCategory;
