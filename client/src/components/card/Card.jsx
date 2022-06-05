import { NavLink } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import "./card.scss";

import { doc, setDoc } from "firebase/firestore";
import { db } from "../../util/firebase";
import { Button } from "@mui/material";

const RecipeCard = ({ title, image, id }) => {
  const [rating, setRating] = useState(3);

  const [buttonText, setButtonText] = useState("save"); //same as

  const ratingHandler = (e, newRating) => {
    setRating(newRating);
  };

  const docData = {
    title: title,
    image: image,
  };
  function handleFav(id) {
    setDoc(doc(db, "favorites", id), docData);
    alert("you saved recipe");
  }

  return (
    <section className="card">
      <div className="card__container">
        <article>
          <NavLink to={`/recipe/${id}`}>
            <img className="rcard__visual" src={image} alt={title} />
            <h3 className="card__title">{title} </h3>
          </NavLink>
        </article>
        <article className="actionBtns">
          <Button
            className="delBtn"
            onClick={() => {
              handleFav(id);
              setButtonText("delet");
            }}
          >
            {" "}
            {buttonText}
          </Button>

          <Rating
            name="simple-controlled"
            value={rating}
            onChange={ratingHandler}
          />
        </article>
      </div>
    </section>
  );
};
export default RecipeCard;
