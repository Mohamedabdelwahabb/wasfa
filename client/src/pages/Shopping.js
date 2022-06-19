import { useState } from "react";
import { Outlet } from "react-router-dom";
//
import { Container, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
//
import BackDrop from "../components/shopping/BackDrop";
import ShoppingList from "../components/shopping/ShoppingList";
import CreateList from "../components/shopping/CreateList";
import Speech from "../components/speech/Speech";
//
export default function Shopping() {
  const [name, setName] = useState("");
  const [cartList, setCartList] = useState([]);
  const [title, setTitle] = useState("");

  return (
    <Container sx={{ marginTop: "4em" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item xs={4} md={4}>
            <Item>
              <BackDrop setTitle={setTitle} />
              <ShoppingList />
            </Item>
          </Grid>
          <Grid item xs={6} md={6}>
            <Item>
              <CreateList
                setTitle={setTitle}
                title={title}
                cartList={cartList}
                setCartList={setCartList}
                name={name}
                setName={setName}
              />
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
      <Box></Box>
      <Outlet />
    </Container>
  );
}

export const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
  height: "100%",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
}));
