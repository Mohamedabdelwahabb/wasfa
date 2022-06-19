import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//!
import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../util/firebase.config";
//!

import { Button, Checkbox, Grid, Typography, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "../../styles/grocery.css";
//! custom style
import { Item } from "../../pages/Shopping";
//!

const ShoppingCard = () => {
  const { id } = useParams();
  const [cart, setCart] = useState([]);
  const docRef = doc(db, "ShoppingCart", id);

  const updateList = async (id, data) => {
    const removeRes = await updateDoc(docRef, {
      cartList: arrayRemove(data),
    });
    return removeRes;
  };

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
  }, []);

  return (
    <Grid container>
      <Grid item xs={10} md={10}>
        <Item>
          {cart &&
            cart?.cartList?.map((item, ind) => {
              return (
                <Box key={ind} sx={{ display: "flex", alignItems: "center" }}>
                  <Typography>{item}</Typography>
                  <Checkbox color="success" value={item} />
                  <Button
                    sx={{ color: "red" }}
                    onClick={() => {
                      updateList(ind, item);
                    }}
                  >
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
export default ShoppingCard;
