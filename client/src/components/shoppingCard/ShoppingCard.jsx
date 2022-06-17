import React, { useState, useEffect } from "react";
//!
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../util/firebase.config";
//!
import styled from "@emotion/styled";
import { Button, Checkbox, Grid, Paper, Typography, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
//!
const Item = styled(Paper)(({ theme }) => ({
  textAlign: "center",
  height: "100%",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
}));

export const ShoppingCard = ({ id }) => {
  const [cart, setCart] = useState([]);
  const docRef = doc(db, "ShoppingCart", id);

  const updateList = async (ind, elementName) => {
    console.log(elementName, ind);
    await updateDoc(docRef, {
      items: cart?.items?.filter((item) => item.ind !== ind),
    });
  };

  // const toggleComplete = (index) => {
  //   const newItems = [...items];

  //   newItems[index].complete = !newItems[index].complete;

  //   setItems(newItems);
  // };
  useEffect(() => {
    const unsub = async () => {
      await getDoc(docRef).then((doc) => {
        if (doc.exists) {
          setCart({
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

  return (
    <Grid container>
      <Grid item xs={10} md={10}>
        <Item>
          {" "}
          {cart &&
            cart?.cartList?.map((item, ind) => {
              return (
                <Box key={ind} sx={{ display: "flex", alignItems: "center" }}>
                  <Typography>{item} </Typography>
                  <Checkbox color="success" value={item} />
                  <Button sx={{ color: "red" }} onClick={() => updateList(ind)}>
                    <DeleteIcon />
                  </Button>
                </Box>
              );
            })}
        </Item>
      </Grid>
    </Grid>
  );
};
