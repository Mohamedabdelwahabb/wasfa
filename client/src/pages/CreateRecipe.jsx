import { useState } from "react";
import { Timestamp, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Box from "@mui/material/Box";
import { db, storage } from "../util/firebase.config";
import "../styles/form.css";
import Form from "react-bootstrap/Form";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "@mui/material";

export default function CreateRecipe() {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    ingredients: [],
    instructions: [],
    servings: 0,
    cookTime: "",
    category: "",
  });
  const categories = [
    "breakfast",
    "lunch",
    "dinner",
    "snacks",
    "appetizers",
    "sweets",
    "holiday",
    "soups",
  ];
  const categoryOptions = categories.map((category) => {
    return (
      <option key={category} value={category}>
        {category}
      </option>
    );
  });
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFilesChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleIngredient = (e, i) => {
    e.preventDefault();
    const ingredientsClone = [...formData.ingredients];
    ingredientsClone[i] = e.target.value;
    setFormData({
      ...formData,
      ingredients: ingredientsClone,
    });
  };
  const handleIngredientNext = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, ""],
    });
  };
  const handleRemoveIngredient = (e, i) => {
    e.preventDefault();
    const ingredientsClone = [...formData.ingredients];
    console.log(ingredientsClone);
    const newIngredientsClone = ingredientsClone.splice(-1);

    setFormData({
      ...formData,
      ingredients: newIngredientsClone,
    });
  };

  const handeleInstruction = (e, i) => {
    e.preventDefault();
    const instructionsClone = [...formData.instructions];
    instructionsClone[i] = e.target.value;
    setFormData({
      ...formData,
      instructions: instructionsClone,
    });
  };
  const handleInstructionNext = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      instructions: [...formData.instructions, ""],
    });
  };
  const handleSubmit = () => {
    if (
      !formData.title ||
      !formData.description ||
      !formData.ingredients ||
      !formData.instructions ||
      !formData.cookTime ||
      !formData.servings ||
      !formData.category
    ) {
      alert("Please fill all the fields");
      return;
    }

    const storageRef = ref(storage, `/images/${formData.image.name}`);

    const uploadImage = uploadBytesResumable(storageRef, formData.image);

    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercent);
      },
      (err) => {
        console.log(err);
      },
      () => {
        setFormData({
          title: "",
          image: "",
          description: "",
          ingredients: [],
          instructions: [],
          servings: 0,
          cookTime: "",
          category: "",
        });

        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const recipeRef = collection(db, "recipes");
          addDoc(recipeRef, { ...formData, image: url })
            .then(() => {
              ("Article added successfully");
              setProgress(0);
            })
            .catch((err) => {
              console.log("Error adding article");
            });
        });
      }
    );
  };

  return (
    <Container>
      <h2>Create Recipe</h2>

      <Box className="form-group">
        <label htmlFor="">Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={formData.title}
          onChange={(e) => handleChange(e)}
        />
      </Box>
      <Box>
        <label htmlFor="">Image</label>
        <input
          type="file"
          name="image"
          className="form-control"
          onChange={(e) => handleFilesChange(e)}
        />
      </Box>
      <Box>
        {" "}
        <label htmlFor="">video</label>
        <input
          type="file"
          name="video"
          className="form-control"
          onChange={(e) => handleFilesChange(e)}
        />
      </Box>
      <Box>
        {progress === 0 ? null : (
          <div className="progress">
            <div
              className="progress-bar progress-bar-striped mt-2"
              style={{ width: `${progress}%` }}
            >
              {`uploading image ${progress}%`}
            </div>
          </div>
        )}
      </Box>

      {/* description */}
      <Box>
        <label htmlFor="">Description</label>
        <textarea
          name="description"
          className="form-control"
          value={formData.description}
          onChange={(e) => handleChange(e)}
        />
      </Box>

      <Box>
        <br />
        <Form.Label className="form-label">Ingredients</Form.Label>
        {formData?.ingredients?.map((ingredient, i) => (
          <Form.Control
            type="text"
            key={i}
            onChange={(e) => handleIngredient(e, i)}
          />
        ))}
        <div id="ingredients-buttons">
          <button
            className="ingredient-btn"
            id="add"
            onClick={handleIngredientNext}
          >
            Add
          </button>
          <button
            className="ingredient-btn"
            id="remove"
            onClick={handleRemoveIngredient}
          >
            Remove
          </button>
        </div>
        <br />
      </Box>
      <Form.Group>
        <Form.Label className="form-label">Instructions</Form.Label>
        {formData?.instructions?.map((step, i) => (
          <Form.Control
            type="text"
            key={i}
            value={step}
            onChange={(e) => handeleInstruction(e, i)}
          />
        ))}
        <div id="ingredients-buttons">
          <button
            className="ingredient-btn"
            id="add"
            onClick={handleInstructionNext}
          >
            Add
          </button>
          <button
            className="ingredient-btn"
            id="remove"
            onClick={handleRemoveIngredient}
          >
            Remove
          </button>
        </div>
      </Form.Group>
      <Row>
        <Col>
          <Form.Label className="form-label">Cook Time</Form.Label>
          <Form.Control
            type="text"
            name="cookTime"
            value={formData.cookTime}
            onChange={(e) => handleChange(e)}
            required
          />
        </Col>

        <Col>
          <Form.Label className="form-label">Servings</Form.Label>
          <Form.Control
            type="number"
            step="1"
            min="1"
            onChange={(e) =>
              setFormData({ ...formData, servings: e.target.value })
            }
            required
          />
        </Col>
      </Row>
      <Form.Group>
        <Form.Label className="form-label">Category</Form.Label>
        <Form.Select
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        >
          <option>Choose a category</option>
          {categoryOptions}
        </Form.Select>
      </Form.Group>

      <input className="form-control btn-primary mt-2" type="submit" />

      <button className="form-control btn-primary mt-2" onClick={handleSubmit}>
        Save
      </button>
    </Container>
  );
}
