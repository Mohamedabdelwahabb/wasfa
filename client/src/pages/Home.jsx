import React, { useEffect, useState } from "react";
import Hero from "../components/herosection/Hero";
import RecipeCard from "../components/card/Card";
import { Container, Grid } from "@mui/material";
import Search from "../components/search/Search";
import FilterButtons from "../components/filter/Filter";
import debounce from "lodash.debounce";
import { useCollection } from "../hooks/useCollection";
import { Loading } from "../components/loading/Loading";

const Home = () => {
  const [filterRecipes, setfilterRecipes] = useState([]);
  const [type, setType] = useState("All");
  const [query, setQuery] = useState("");
  const [searchTerm] = useState(["title", "dishTypes"]);

  const [recipes, loading] = useCollection("recipes");

  useEffect(() => {
    const filterDishTypes = () => {
      const filteredRecipes = recipes.filter((recipe) => {
        return recipe.dishTypes === type;
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
      <Search onChange={debouncedOnChange} />
      <FilterButtons setType={setType} setfilterRecipes={setfilterRecipes} />
      {loading && <Loading />}
      <Grid sx={{ display: "flex", flexWrap: "wrap" }}>
        {filteredItems.map((recipe) => {
          return (
            <RecipeCard
              title={recipe.title}
              image={recipe.image}
              id={recipe.id}
              key={recipe.id}
            />
          );
        })}
      </Grid>
    </Container>
  );
};

export default Home;
