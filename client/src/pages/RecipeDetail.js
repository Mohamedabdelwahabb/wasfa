import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
//!
import { doc, getDoc } from "firebase/firestore";
import { db } from "../util/firebase.config";
//!
import {
  Box,
  Button,
  ButtonGroup,
  CardMedia,
  Container,
  styled,
  Typography,
} from "@mui/material";
import "../styles/details.css";
//!
import { ThemeContext } from "../context/ThemeContext";
import CreateShoppingList from "../components/shopping/CreateFromRecipe";
import { Loading } from "../components/loading/Loading";

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState([]);
  const [value, setValue] = useState(0);

  //! import theme cuz only background color of the body change but not the container of recipe detaill
  const { theme } = useContext(ThemeContext);
  const { id } = useParams();
  const docRef = doc(db, "recipes", id);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsub = async () => {
      await getDoc(docRef).then((doc) => {
        if (doc.exists) {
          setRecipe({
            id: doc.id,
            ...doc.data(),
          });
          setLoading(false);
        } else {
          console.log("not found");
          setLoading(true);
        }
      });
    };

    return () => unsub();
    // eslint-disable-next-line
  }, []);

  const { ingredients, servings } = recipe;
  let totalServing = +servings + value;

  return (
    <Container className={`rcipe-page ${theme} `}>
      {loading && <Loading />}
      <header className="recipe-header ">
        <CardMedia
          sx={{ width: "50%", objectFit: "cover" }}
          height="350"
          component="img"
          image={recipe.image}
          alt={recipe.title}
        />

        <article className="header-content ">
          <Title className="recipe-title ">{recipe.title} </Title>
          <p className="recipe-summary">{recipe.description} </p>
          <p className="recipe-time">Prep : {recipe.cookTime}min</p>
        </article>
      </header>
      <video width="450px" height="240" controls src={recipe.video} />
      <section className="ingre">
        <Title>Ingredients</Title>
        <Box className="ingre-header">
          <ButtonGroup size="small" aria-label="small outlined button group">
            <Button className="btn" onClick={() => setValue(value - 1)}>
              -
            </Button>
            <Typography sx={{ padding: ".25" }}>
              {totalServing} servings
            </Typography>
            <Button className="btn" onClick={() => setValue(value + 1)}>
              +
            </Button>
          </ButtonGroup>
        </Box>
        <Box className="ingre-container">
          {ingredients &&
            ingredients.map(({ amount, name, unit }, i) => {
              return (
                <Box key={i} className="ingre-list text">
                  <Box className="ingre-item">
                    <span>{(amount / servings).toFixed(1) * totalServing}</span>
                    <span> {unit} </span>
                    <span> {name} </span>
                  </Box>
                </Box>
              );
            })}
        </Box>
        <Box>
          <CreateShoppingList
            id={id}
            title={recipe.title}
            ingredients={ingredients}
          />
        </Box>
      </section>
      <section className="intruction">
        <Title>Instructions</Title>
        {recipe.instructions &&
          recipe.instructions.map((step, index) => {
            return (
              <Box key={index}>
                <span className="stepNum">Step {index + 1}</span>
                <p className="step">{step} </p>
              </Box>
            );
          })}
      </section>
    </Container>
  );
};

export default RecipeDetail;

//*******************************************************************/
//!   work but to don't let user update DB for serving everytime
/*{
     const IncrementServings = async (id) => {
  setValue(value + 1);
 const res = await updateDoc(docRef, { servings: value + 1 });
    return 
  };


  const decrementServings = async (id) => {
    setValue(value - 1);
    const res = await updateDoc(docRef, { servings: value - 1 });

    return res;
  };
 
  }
   */
export const ButtonA = styled(Button)`
  font-size: 1em;
  border: none;
  background: #5cac0e;
  border-radius: 15px;
  color: white;
  &::hover {
    color: "red";
  }
`;
const Title = styled(Typography)`
  letter-spacing: 3px;
  margin: 1em 0;
  word-break: break-word;
  font-size: 1.5em;
`;
