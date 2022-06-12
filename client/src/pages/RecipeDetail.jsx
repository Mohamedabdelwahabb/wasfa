import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../util/firebase.config";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Container,
  styled,
  Typography,
} from "@mui/material";
import "../styles/details.css";
import { ThemeContext } from "../context/ThemeContext";

const RecipeDetail = () => {
  const [open, setOpen] = useState(false);
  const [recipe, setRecipe] = useState([]);
  const [value, setValue] = useState(0);
  const [list, setList] = useState({
    CartList: [],
  });

  //! import theme cuz only background color of the body change but not the container of recipe detaill
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

    return () => unsub();
    // eslint-disable-next-line
  }, [value]);

  const { ingredients, servings } = recipe;
  let totalServing = servings + value;

  const addToCart = () => {
    setDoc(doc(db, "ShoppingCart", id), list);
    handleClose();
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCartList = (e) => {
    //! Destructuring
    const { value, checked } = e.target;
    const { CartList } = list;

    //! Case 1 : The user checks the box
    if (checked) {
      setList({
        CartList: [...CartList, value],
      });
    }

    //! Case 2  : The user unchecks the box
    else {
      setList({
        CartList: CartList.filter((e) => e !== value),
      });
    }
  };

  return (
    <Container className={`rcipe-page ${theme} `}>
      <header className="recipe-header ">
        <img src={recipe?.image} alt={recipe?.title} />

        <article className="header-content ">
          <Title className="recipe-title ">{recipe.title} </Title>
          <p className="recipe-summary">{recipe.description} </p>
          <p className="recipe-time">Prep : {recipe.cookTime}min</p>
        </article>
      </header>

      <section className="ingre">
        <Title>Ingredients</Title>
        <div className="ingre-header">
          <ButtonGroup size="small" aria-label="small outlined button group">
            <Button className="btn" onClick={() => setValue(value - 1)}>
              -
            </Button>
            <Typography sx={{ fontSize: "1.25em", padding: ".25" }}>
              {totalServing} servings
            </Typography>
            <Button className="btn" onClick={() => setValue(value + 1)}>
              +
            </Button>
          </ButtonGroup>
        </div>
        <div className="ingre-container">
          {ingredients?.map(({ id, amount, name, unit }) => {
            return (
              <div key={id} className="ingre-list text">
                <div className="ingre-item">
                  <span>{amount * totalServing}</span>
                  <span> {unit} </span>
                  <span> {name} </span>
                </div>
              </div>
            );
          })}
          <div>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Add to Shopping List</DialogTitle>
              <DialogContent>
                {ingredients?.map(({ name, id }) => {
                  return (
                    <Box
                      key={id}
                      sx={{
                        width: 400,
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        <Typography gutterBottom variant="h6" component="div">
                          {name}
                        </Typography>
                      </Box>
                      <Box>
                        <Checkbox
                          color="success"
                          value={name}
                          onChange={(e) => handleCartList(e)}
                        />
                      </Box>
                    </Box>
                  );
                })}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={addToCart}>Add</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
        <ButtonA
          variant="contained"
          size="medium"
          startIcon={<AddShoppingCartIcon />}
          onClick={handleClickOpen}
        >
          Add
        </ButtonA>
      </section>
      <section className="intruction">
        <Title>Instructions</Title>
        {recipe?.instructions?.map((step, index) => {
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
const ButtonA = styled(Button)`
  margin-top: 1em;
  font-size: 1em;
  border: none;
  background: #5cac0e;
  border-radius: 15px;
  color: white;
`;
const Title = styled(Typography)`
  letter-spacing: 0.2em;
  margin: 2em 0;
  word-break: break-word;
  font-size: 1.5em;
`;
