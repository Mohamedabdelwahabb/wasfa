import { useFirestore } from "../hooks/useFirestore";

import { useState } from "react";
import "../styles/grocery.css";

import AddIcon from "@mui/icons-material/Add";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Container,
  Box,
  Typography,
  Button,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Chip,
} from "@mui/material";

import Speech from "../components/speech/Speech";

import * as React from "react";
import { styled } from "@mui/material/styles";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import BackDrop from "../components/dropdown/BackDrop";
import { useCollection } from "../hooks/useCollection";
import { ShoppingCard } from "../components/shoppingCard/ShoppingCard";

import { dltDoceById } from "../util/firebase.config";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
  height: "100%",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
}));

export default function Shopping() {
  const { addDocument } = useFirestore("ShoppingCart");
  const [shoppingList] = useCollection("ShoppingCart");
  const [name, setName] = useState("");
  const [cartList, setCartList] = useState([]);
  const [title, setTitle] = useState("");
  const [docId, setDocId] = useState("");

  const add = (e) => {
    e.preventDefault();
    if (!name) {
      return;
    }
    setCartList((cartList) => [...cartList, name]);
    setName("");
  };

  const remove = (index) => {
    setCartList((cartList) => cartList.filter((_, i) => i !== index));
  };

  const writeDoc = () => {
    const data = {
      title:
        title === ""
          ? `list of ${new Date().getDate()}/${new Date().getMonth()}`
          : title,

      cartList,
    };
    addDocument(data);
    setCartList([]);
    setTitle("");
  };

  return (
    <Container sx={{ marginTop: "4em" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item xs={2} md={2}>
            <Item>
              <BackDrop setTitle={setTitle} />
              {shoppingList &&
                shoppingList?.map(({ title, id }) => {
                  return (
                    <Box key={id} sx={{ display: "flex" }}>
                      <Button onClick={() => setDocId(id)}>
                        <Typography>{title} </Typography>
                      </Button>
                      <Button
                        sx={{ color: "red" }}
                        onClick={() => {
                          dltDoceById(id, "ShoppingCart");
                        }}
                      >
                        <DeleteIcon />
                      </Button>
                    </Box>
                  );
                })}
            </Item>
          </Grid>
          <Grid item xs={6} md={6}>
            <Item>
              <Box
                onSubmit={add}
                component="form"
                noValidate
                autoComplete="off"
              >
                <FormControl sx={{ width: "40ch", borderRadius: "15px" }}>
                  <OutlinedInput
                    sx={{ borderRadius: "15px" }}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    startAdornment={
                      <InputAdornment position="start">
                        <AddIcon />
                      </InputAdornment>
                    }
                    placeholder="Add item"
                  />
                </FormControl>
              </Box>
              {cartList.length > 0 ? (
                <Box margin="1em">
                  <Button
                    variant="contained"
                    sx={{ margin: "1em" }}
                    onClick={() => writeDoc()}
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "red", color: "white" }}
                    startIcon={<DeleteIcon />}
                    onClick={() => setCartList([])}
                  >
                    delete
                  </Button>
                </Box>
              ) : (
                <Box>Add something to your list</Box>
              )}
              <Box className="item-list">
                {cartList.reverse().map((item, index) => (
                  <Box className="item-container" key={index}>
                    <Box className="item-name">
                      <Chip
                        variant="outlined"
                        icon={<ShoppingBasketIcon />}
                        label={item}
                        onDelete={() => remove(index)}
                      />
                    </Box>
                  </Box>
                ))}
              </Box>
            </Item>
          </Grid>
          <Grid item xs={2} md={2}>
            <Item>
              <Speech
                setName={setName}
                setCartList={setCartList}
                items={cartList}
                name={name}
              />
            </Item>
          </Grid>
        </Grid>
      </Box>

      <Grid container>
        <Grid item xs={10} md={10}>
          <Item>
            {docId === "" ? "choose list" : <ShoppingCard id={docId} />}
          </Item>
        </Grid>
      </Grid>
    </Container>
  );
}
