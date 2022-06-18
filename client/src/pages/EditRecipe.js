import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
//!
import { doc, getDoc } from "firebase/firestore";
import { db } from "../util/firebase.config";
import { useFirestore } from "../hooks/useFirestore";
//!
import { Container, FormGroup } from "@mui/material";
import styled from "@emotion/styled";
//!
export default function EditRecipe() {
  const { editDocument } = useFirestore("favorites");
  const navigate = useNavigate();
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [formData, setformData] = useState({
    newTitle: "",
    newDesc: "",
    newCookTime: "",
  });

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
  console.log(recipe);
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleEdit = async (e) => {
    e.preventDefault();

    const fieldsToUpdate = {
      title: formData.newTitle === "" ? recipe.title : formData.newTitle,
      description:
        formData.newDesc === "" ? recipe.description : formData.newDesc,
      cookTime:
        formData.newCookTime === "" ? recipe.cookTime : formData.newCookTime,
    };
    console.log(recipe);
    await editDocument(docRef, fieldsToUpdate);
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
      {recipe && (
        <>
          <form onSubmit={handleEdit}>
            <FormGroup>
              <Label>Title</Label>
              <Input
                type="text"
                name="newTitle"
                onChange={(e) => handleChange(e)}
                defaultValue={recipe.title}
              />
            </FormGroup>

            <Label>Cook Time</Label>
            <Input
              type="text"
              name="newCookTime"
              onChange={(e) => handleChange(e)}
              defaultValue={recipe.cookTime}
            />

            <FormGroup>
              <Label>desc</Label>
              <Input
                type="text"
                name="newDesc"
                onChange={(e) => handleChange(e)}
                defaultValue={recipe.description}
              />
            </FormGroup>
            <button type="submit">Update</button>
          </form>
        </>
      )}
    </Container>
  );
}
const Input = styled("input")({
  border: "2px solid white ",
  backgroundColor: "white",
  margin: "2em",
  width: "300px",
});
const Label = styled("label")({
  color: "white",
  width: "30px",
});
