import { useState } from "react";
import { useNavigate } from "react-router-dom";
//!
import { collection, addDoc } from "firebase/firestore";
import { db } from "../util/firebase.config";
// !mui
import styled from "@emotion/styled";
import { Container, FormGroup, Box } from "@mui/material";
// !

import ImgUpload from "../components/form/ImagUpload";
import VideoUpload from "../components/form/VideoUpload";
import Instructions from "../components/form/Instruction";
import Ingredient from "../components/form/ingredient";
import { ButtonA } from "./RecipeDetail";
import { categoryOptions } from "../components/form/category";
//!

//
export default function CreateRecipe() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [vidoeUrl, setVideoUrl] = useState("");
  const [instructions, setInstructions] = useState([]);
  const [ingredients, setIngredient] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    image: null,
    video: null,
    description: "",
    ingredients: [],
    servings: 0,
    cookTime: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    if (!formData.title) {
      alert("Please fill title");
      return;
    }
    const data = {
      ...formData,
      image: imageUrl,
      video: vidoeUrl,
      ingredients,
      instructions,
    };
    const recipeRef = collection(db, "recipes");

    addDoc(recipeRef, data);
    setFormData({
      title: "",
      image: null,
      video: null,
      description: "",
      servings: 0,
      cookTime: "",
      category: "",
    });
    navigate("/favorite");
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        margin: "4em auto",
        color: "white",
        backgroundColor: " #2ab2af",
      }}
    >
      <h2>Create Recipe</h2>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Label>Title</Label>
        <Input
          focused
          type="text"
          name="title"
          value={formData.title}
          onChange={(e) => handleChange(e)}
        />
      </Box>
      <Box>
        <Label>Image</Label>
        <ImgUpload setImageUrl={setImageUrl} setProgress={setProgress} />
      </Box>
      <Box>
        <Label>Video</Label>
        <VideoUpload setVideoUrl={setVideoUrl} setProgress={setProgress} />
      </Box>

      {progress === 0 ? null : (
        <div>
          <div style={{ width: `${progress}%` }}>
            {`uploading  ${progress}%`}
          </div>
        </div>
      )}

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Label htmlFor="">Description</Label>
        <Input
          name="description"
          value={formData.description}
          onChange={(e) => handleChange(e)}
        />
      </Box>

      <Box>
        <Label>Ingredients</Label>
        <Ingredient ingredients={ingredients} setIngredient={setIngredient} />
      </Box>
      <Box>
        <Label>Instructions</Label>
        <Instructions
          setInstruction={setInstructions}
          instruction={instructions}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Label>Cook Time</Label>
        <Input
          type="text"
          name="cookTime"
          value={formData.cookTime}
          onChange={(e) => handleChange(e)}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Label>Servings</Label>
        <Input
          type="number"
          step="1"
          min="1"
          placeholder="How many portions does this recipe make?"
          onChange={(e) =>
            setFormData({ ...formData, servings: e.target.value })
          }
        />
      </Box>
      <FormGroup>
        <Label>Category</Label>

        <select
          onChange={(e) => {
            setFormData({ ...formData, category: e.target.value });
            console.log(formData.category);
          }}
        >
          {categoryOptions}
        </select>
      </FormGroup>

      <ButtonA onClick={handleSubmit}>Save</ButtonA>
    </Container>
  );
}

const Input = styled("input")({
  border: "2px solid white ",
  backgroundColor: "white",
  height: "30px",
  margin: "1em",
  width: "600px",
  borderRadius: "15px",
});
const Label = styled("label")({
  color: "white",
  fontWeight: "bold",
  width: "60px",
});
