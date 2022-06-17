import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../util/firebase.config";
// !mui
import { Container, FormGroup, Box } from "@mui/material";
// !

import { ButtonA } from "./RecipeDetail";
import styled from "@emotion/styled";

export default function CreateRecipe() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [vidoeUrl, setVideoUrl] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    video: null,
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
  const upload = () => {
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
        getDownloadURL(uploadImage.snapshot.ref)
          .then((url) => {
            setImageUrl(url);
          })
          .then(() => {
            setProgress(0);
          })
          .catch((err) => {
            console.log("Error");
          });
      }
    );
  };
  const uploadVideoFunc = () => {
    const storageRef = ref(storage, `/videos/${formData.video.name}`);

    const uploadVideo = uploadBytesResumable(storageRef, formData.video);
    uploadVideo.on(
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
        getDownloadURL(uploadVideo.snapshot.ref)
          .then((url) => {
            setVideoUrl(url);
          })
          .then(() => {
            setProgress(0);
          })
          .catch((err) => {
            console.log("Error");
          });
      }
    );
  };
  const handleSubmit = () => {
    if (!formData.title) {
      alert("Please fill title");
      return;
    }
    const recipeRef = collection(db, "favorites");
    addDoc(recipeRef, { ...formData, image: imageUrl, video: vidoeUrl });
    setFormData({
      title: "",
      image: null,
      video: null,
      description: "",
      ingredients: [],
      instructions: [],
      servings: 0,
      cookTime: "",
      category: "",
    });
    navigate("/favorite");
  };

  return (
    <Container
      sx={{
        display: "grid",
        gridRowGap: "20px",
        padding: "20px",
        margin: "4em 20em",
        color: "white",
        backgroundColor: " #2ab2af",
      }}
    >
      <h2>Create Recipe</h2>
      <form>
        <Box>
          <Label sx={{ color: "white" }}>Title</Label>
          <Input
            focused
            type="text"
            name="title"
            value={formData.title}
            onChange={(e) => handleChange(e)}
          />
        </Box>
        {/* <Box bgcolor={red}>
        <UploaodFiles setImageUrl={setImageUrl} />
      </Box> */}
        <Box>
          <Label>Image</Label>
          <Input
            type="file"
            accept="image/*"
            name="image"
            onChange={(e) => handleFilesChange(e)}
          />

          <ButtonA onClick={upload}> upload</ButtonA>
        </Box>
        <Box></Box>
        <Box>
          <Label>video</Label>
          <Input
            type="file"
            name="video"
            onChange={(e) => handleFilesChange(e)}
          />
          <ButtonA onClick={uploadVideoFunc}> upload</ButtonA>
        </Box>
        {progress === 0 ? null : (
          <div>
            <div style={{ width: `${progress}%` }}>
              {`uploading  ${progress}%`}
            </div>
          </div>
        )}
        {/* description */}
        <Box>
          <Label htmlFor="">Description</Label>
          <Input
            name="description"
            value={formData.description}
            onChange={(e) => handleChange(e)}
          />
        </Box>

        <Box>
          <Label>Ingredients</Label>
          {formData?.ingredients?.map((ingredient, i) => (
            <Input
              type="text"
              key={i}
              onChange={(e) => handleIngredient(e, i)}
            />
          ))}
          <div>
            <ButtonA size="small" onClick={handleIngredientNext}>
              Add
            </ButtonA>
            <ButtonA size="small" onClick={handleRemoveIngredient}>
              Remove
            </ButtonA>
          </div>
          <br />
        </Box>
        <FormGroup>
          <Label>Instructions</Label>
          {formData?.instructions?.map((step, i) => (
            <Input
              type="text"
              key={i}
              value={step}
              onChange={(e) => handeleInstruction(e, i)}
            />
          ))}
          <Box>
            <ButtonA onClick={handleInstructionNext}>Add</ButtonA>
            <ButtonA onClick={handleRemoveIngredient}>Remove</ButtonA>
          </Box>
        </FormGroup>

        <Label>Cook Time</Label>
        <Input
          type="text"
          name="cookTime"
          value={formData.cookTime}
          onChange={(e) => handleChange(e)}
        />

        <Label>Servings</Label>
        <Input
          type="number"
          step="1"
          min="1"
          onChange={(e) =>
            setFormData({ ...formData, servings: e.target.value })
          }
        />

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
      </form>
    </Container>
  );
}

const Input = styled("input")({
  border: "2px solid white ",
  backgroundColor: "white",
  color: "green",
  margin: "2em",
  width: "300px",
});
const Label = styled("label")({
  color: "white",
  width: "30px",
});
