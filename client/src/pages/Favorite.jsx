import { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { dltDoceById } from "../util/firebase.config";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RecipeCard from "../components/card/Card";
import { useCollection } from "../hooks/useCollection";

import { Button, Container, Box } from "@mui/material";

const Favorite = ({ image, title, id, rating }) => {
  const [favorite] = useCollection("favorites");
  console.log(image);
  return (
    <Container sx={{ display: "flex", flexDirection: "row" }}>
      <NavLink to="/create">
        <Button variant="contained" startIcon={<AddIcon />}>
          add
        </Button>
      </NavLink>

      <Box>
        {favorite &&
          favorite?.map(({ title, id, image, cookTime }) => {
            return (
              <Fragment key={id}>
                <RecipeCard
                  image={image}
                  title={title}
                  id={id}
                  cookTime={cookTime}
                />
                <button
                  onClick={() => {
                    dltDoceById(id, "favorites");
                  }}
                >
                  <DeleteIcon />
                </button>
                <Link to={`/edit/${id}`} className="edit-link">
                  <button>
                    <EditIcon />
                  </button>
                </Link>
              </Fragment>
            );
          })}
      </Box>
    </Container>
  );
};

export default Favorite;
