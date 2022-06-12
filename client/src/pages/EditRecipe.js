import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { doc, getDoc } from "firebase/firestore";

import { db } from "../util/firebase.config";
import { useFirestore } from "../hooks/useFirestore";

// react-bootstrap
import Form from "react-bootstrap/Form";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// styles

// images

export default function EditRecipe() {
  const { editDocument } = useFirestore("favorites");

  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newCookTime, setNewCookTime] = useState("");
  const [newServings, setNewServings] = useState(0);
  const [newCategory, setNewCategory] = useState("");
  const [newIngredients, setNewIngredients] = useState([]);
  const [newInstructions, setNewInstructions] = useState("");

  const docRef = doc(db, "favorites", id);

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
  }, [id]);
  console.log(newTitle);
  const categories = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Snacks",
    "Appetizers",
    "Sweets",
    "Holiday",
    "Soups",
  ];

  const categoryOptions = categories.map((category) => {
    return (
      <option key={category} value={category}>
        {category}
      </option>
    );
  });

  // const handleIngredient = (e, i) => {
  //   e.preventDefault();
  //   const ingredientsClone = [...form.ingredients];
  //   ingredientsClone[i] = e.target.value;
  //   setForm({
  //     ...form,
  //     ingredients: ingredientsClone
  //   });
  // };

  const handleIngredientCount = (e) => {
    e.preventDefault();
    setNewIngredients({
      ...newIngredients,
      ingredients: [...newIngredients, ""],
    });
  };

  // const handleRemoveIngredient = (e, i) => {
  //   e.preventDefault();
  //   const ingredientsClone = [...form.ingredients];
  //   console.log(ingredientsClone);
  //   const newIngredientsClone = ingredientsClone.splice(-1);
  //   console.log(newIngredientsClone);
  //   console.log(ingredientsClone);
  //   setForm({
  //     ...form,
  //     ingredients: ingredientsClone
  //   });
  // };

  const handleEdit = async (e) => {
    e.preventDefault();

    const fieldsToUpdate = {
      title: newTitle === "" ? recipe.title : newTitle,
      description: newDesc === "" ? recipe.description : newDesc,
      ingredients: newIngredients === "" ? recipe.ingredients : newIngredients,
      instructions:
        newInstructions === "" ? recipe.instructions : newInstructions,
      cookTime: newCookTime === "" ? recipe.cookTime : newCookTime,
      servings: newServings === 0 ? recipe.servings : newServings,
      category:
        newCategory === "" || newCategory === "Choose a category"
          ? recipe.category
          : newCategory,
    };
    console.log(recipe);
    await editDocument(docRef, fieldsToUpdate);
  };

  return (
    <div className="recipe-form">
      {recipe && (
        <>
          <Form onSubmit={handleEdit}>
            <Form.Group>
              <Form.Label className="form-label">Title</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setNewTitle(e.target.value)}
                defaultValue={recipe.title}
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Label className="form-label">Cook Time</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setNewCookTime(e.target.value)}
                  defaultValue={recipe.cookTime}
                />
              </Col>

              <Col>
                <Form.Label className="form-label">Servings</Form.Label>
                <Form.Control
                  type="number"
                  step="1"
                  min="1"
                  onChange={(e) => setNewServings(e.target.value)}
                  defaultValue={recipe.servings}
                />
              </Col>
            </Row>

            <Form.Group>
              <Form.Label className="form-label">Category</Form.Label>
              <Form.Select
                onChange={(e) => setNewCategory(e.target.value)}
                defaultValue={recipe.category}
              >
                <option>Choose a category</option>
                {categoryOptions}
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <br />
              <Form.Label className="form-label">Ingredients</Form.Label>
              {recipe.ingredients.map((ingredient, i) => (
                <Form.Control
                  type="text"
                  key={i}
                  value={ingredient}
                  onChange={(e) => setNewIngredients(e, i)}
                  contentEditable
                />
              ))}
              <div id="ingredients-buttons">
                <button
                  className="ingredient-btn"
                  id="add"
                  onClick={handleIngredientCount}
                >
                  Add
                </button>
                <button className="ingredient-btn" id="remove">
                  Remove
                </button>
              </div>
            </Form.Group>

            <Form.Group>
              <Form.Label className="form-label">Instructions</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                rows={3}
                onChange={(e) => setNewInstructions(e.target.value)}
                defaultValue={recipe.instructions}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="form-label">desc</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                rows={2}
                onChange={(e) => setNewDesc(e.target.value)}
                defaultValue={recipe.description}
              />
            </Form.Group>
            <button className="recipe-submit" type="submit">
              Update
            </button>
          </Form>
        </>
      )}
    </div>
  );
}
