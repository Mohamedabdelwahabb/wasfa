import "../styles/details.scss";
import CircularProgress from "@mui/material/CircularProgress";

import { doc, getDoc, setDoc } from "firebase/firestore";

import { useState, useReducer, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { db } from "../util/firebase";
import { Button, ButtonGroup, Checkbox, Container } from "@mui/material";
import { ThemeContext } from "../context/ThemeContext";

const initialState = { count: 0 };
function reducer(state, action) {
  console.log(action);
  switch (action.type) {
    case "increment":
      return { count: state.count + action.value };
    case "decrement":
      return { count: state.count - action.value };
    case "reset":
      return { count: 0 };
    default:
      return state;
  }
}

const RecipeDetail = (props) => {
  const [recipe, setRecipe] = useState([]);
  // const [list, setList] = useState({
  //   groceryList: [],
  // });
  const [list, setList] = useState({
    groceryList: [],
  });
  const [state, dispatch] = useReducer(reducer, initialState);
  const { theme } = useContext(ThemeContext);
  const { id } = useParams();

  const docRef = doc(db, "recipes", id);

  useEffect(() => {
    const unsub = async () => {
      await getDoc(docRef).then((doc) => {
        if (doc.exists) {
          setRecipe({
            id: doc.id,
            ...doc.data(),
          });
        } else {
          console.log("not found");
        }
      });
    };

    // eslint-disable-next-line

    return () => unsub();
  }, [id]);

  const { Ingredients } = recipe;
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  function addToCart() {
    setDoc(doc(db, "ShoppingCart", id), list);
  }
  const handleChange = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { groceryList } = list;
    console.log(value);
    console.log(`${value} is ${checked}`);

    // Case 1 : The user checks the box
    if (checked) {
      setList({
        groceryList: [...groceryList, value],
      });
    }

    // Case 2  : The user unchecks the box
    else {
      setList({
        groceryList: groceryList.filter((e) => e !== value),
      });
    }
  };

  console.log(recipe.id);
  return (
    <Container className={`rcipe-page ${theme}`}>
      <header className="recipe-header ">
        <img src={recipe?.image} alt={recipe?.title} />

        <article className="header-content ">
          <h3 className="recipe-title ">{recipe.title} </h3>
          <p className="recipe-summary">{recipe.summary} </p>
          <p className="recipe-time">Prep : {recipe.readyInMinutes}min</p>
        </article>
      </header>
      <div>{state.count} </div>
      <section className="ingre">
        <h4 className="ingre-title ">Ingredients</h4>
        <div className="ingre-header">
          <ButtonGroup size="small" aria-label="small outlined button group">
            <Button
              className="btn"
              disabled={state.count === 0}
              onClick={(e) => dispatch({ type: "decrement", value: 1 })}
            >
              -
            </Button>
            <span className="serving">
              {recipe?.servings + state.count} servings
            </span>
            <Button
              className="btn"
              onClick={() => dispatch({ type: "increment", value: 1 })}
            >
              +
            </Button>
          </ButtonGroup>
        </div>
        <div className="ingre-container">
          {Ingredients?.map(({ id, amount, name, unit }) => {
            return (
              <div key={id} className="ingre-list text">
                <div className="ingre-item">
                  <span>
                    {Math.ceil(
                      (amount / recipe.servings) *
                        (recipe.servings + state.count)
                    )}
                  </span>
                  <span> {unit} </span>
                  <span> {name} </span>
                </div>

                <div>
                  <Checkbox
                    {...label}
                    value={name}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
            );
          })}{" "}
        </div>
        <div>{list.groceryList.map((item) => item)}</div>
        <button className="addTo" onClick={addToCart}>
          add to list
        </button>
        <div></div>
      </section>
      <section className="intruction">
        <h4 className="title">Instructions</h4>
        {recipe?.Instructions?.map((step, index) => {
          return (
            <div key={index}>
              <span className="stepNum">Step {index + 1}</span>
              <p className="step">{step} </p>
            </div>
          );
        })}
      </section>
    </Container>
  );
};

export default RecipeDetail;
