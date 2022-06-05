import { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";

import { dltRecipeById, updateRecipe } from "../util/firebase";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RecipeCard from "../components/card/Card";
import { useCollection } from "../hooks/useCollection";

const Favorite = ({ image, title, id }) => {
  const [favorite] = useCollection("favorites");

  return (
    <section>
      <NavLink to="/create">
        <span>New Recipe</span>
      </NavLink>
      <div>
        {favorite &&
          favorite?.map(({ title, id, image }) => {
            return (
              <Fragment key={id}>
                <RecipeCard image={image} title={title} id={id} />
                <button
                  onClick={() => {
                    dltRecipeById(id);
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
      </div>
    </section>
  );
};

export default Favorite;
