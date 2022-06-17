import React, { useEffect, useState } from "react";
import Hero from "../components/herosection/Hero";
import RecipeCard from "../components/card/Card";
import { Box, Container, Grid } from "@mui/material";
import Search from "../components/search/Search";
import FilterCategory from "../components/filter/FilterCategory";
import debounce from "lodash.debounce";
import { useCollection } from "../hooks/useCollection";
import { Loading } from "../components/loading/Loading";
import SuggestionList from "../components/suggestion/SuggestionList";
import { RatingComp } from "../components/rating/Rating";

const Home = () => {
  const [filterRecipes, setfilterRecipes] = useState([]);
  const [type, setType] = useState("all");
  const [query, setQuery] = useState("");
  const [searchTerm] = useState(["title", "category"]);

  const [recipes, loading] = useCollection("recipes");
  const changeFilter = (newFilter) => {
    setType(newFilter);
  };
  useEffect(() => {
    const filterDishTypes = () => {
      const filteredRecipes = recipes.filter((recipe) => {
        switch (type) {
          case "all":
            return true;
          case "breakfast":
          case "lunch":
          case "dinner":
          case "snacks":
          case "appetizers":
          case "sweets":
          case "holiday":
          case "soups":
            return recipe.category === type;
          default:
            return true;
        }
      });

      setfilterRecipes(filteredRecipes);
    };
    filterDishTypes();
  }, [type, recipes]);

  const getFilteredItems = (query, data) => {
    if (!query) {
      return data;
    }
    return data.filter((el) => {
      return searchTerm.some((word) => {
        return (
          el[word].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
        );
      });
    });
  };
  const filteredItems = getFilteredItems(
    query,
    filterRecipes.length ? filterRecipes : recipes
  );
  const updateQuery = (e) => setQuery(e?.target?.value);
  const debouncedOnChange = debounce(updateQuery, 3000);

  return (
    <Container>
      <Hero />
      <SuggestionList />
      <Search onChange={debouncedOnChange} />
      <FilterCategory
        setType={setType}
        setfilterRecipes={setfilterRecipes}
        type={type}
        changeFilter={changeFilter}
      />
      {loading && <Loading />}
      <Grid sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {filteredItems.map((recipe) => {
          return (
            <Box key={recipe.id} sx={{ position: "relative" }}>
              <RecipeCard
                title={recipe.title}
                image={recipe.image}
                id={recipe.id}
                rating={recipe.rating}
                cookTime={recipe.cookTime}
                description={recipe.description}
              />
              <RatingComp rating={recipe.rating} id={recipe.id} />
            </Box>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Home;
