import React from "react";

const FilterButtons = ({ setType, setfilterRecipes }) => {
  return (
    <div className="filter-button">
      <button className="button" onClick={() => setfilterRecipes([])}>
        All
      </button>
      <button className="button" onClick={() => setType("breakfast")}>
        Breakfast
      </button>
      <button className="button" onClick={() => setType("lunch")}>
        Lunch
      </button>
      <button className="button" onClick={() => setType("dinner")}>
        Dinner
      </button>
    </div>
  );
};
export default FilterButtons;
