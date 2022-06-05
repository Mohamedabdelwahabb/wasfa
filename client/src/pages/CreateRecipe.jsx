import { useState } from "react";
import { Timestamp, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { db, storage } from "../util/firebase";
import "../styles/Form.css";
import Form from "react-bootstrap/Form";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
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
    console.log(newIngredientsClone);
    console.log(ingredientsClone);
    setFormData({
      ...formData,
      ingredients: ingredientsClone,
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
  const handlePublish = () => {
    if (
      !formData.title ||
      !formData.image ||
      !formData.description ||
      !formData.ingredients ||
      !formData.instructions ||
      !formData.cookTime ||
      !formData.servings
    ) {
      alert("Please fill all the fields");
      return;
    }

    const storageRef = ref(
      storage,
      `/images/${Date.now()}${formData.image.name}`
    );

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
          categories: "",
        });

        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const articleRef = collection(db, "favorites");
          addDoc(articleRef, {
            title: formData.title,
            image: url,
            description: formData.description,
            ingredients: formData.ingredients,
            instructions: formData.instructions,
            cookTime: formData.cookTime,
            servings: formData.servings,
            category: formData.category,
            createdAt: Timestamp.now().toDate(),
          })
            .then(() => {
              alert("Article added successfully");
              setProgress(0);
            })
            .catch((err) => {
              alert("Error adding article");
            });
        });
      }
    );
  };

  return (
    <div className="border p-3 mt-3 bg-light" style={{ position: "fixed" }}>
      <>
        <h2>Create article</h2>
        <div className="form-group">
          <label htmlFor="">Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={(e) => handleChange(e)}
          />
        </div>
        {/* image */}
        <label htmlFor="">Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          className="form-control"
          onChange={(e) => handleImageChange(e)}
        />

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
        {/* description */}
        <label htmlFor="">Description</label>
        <textarea
          name="description"
          className="form-control"
          value={formData.description}
          onChange={(e) => handleChange(e)}
        />
        <Form.Group>
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
        </Form.Group>
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

        <button
          className="form-control btn-primary mt-2"
          onClick={handlePublish}
        >
          Publish
        </button>
      </>
    </div>
  );
}
