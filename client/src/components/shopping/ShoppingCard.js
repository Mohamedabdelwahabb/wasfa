import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//!
import {
  arrayRemove,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../util/firebase.config";
//!

import { Button, Checkbox, Grid, Typography, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "../../styles/grocery.css";
//! custom style
import { Item } from "../../pages/Shopping";
import { Loading } from "../loading/Loading";
//!

const ShoppingCard = () => {
  const { id } = useParams();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ischecked, setIsChecked] = useState(false);
  const docRef = doc(db, "ShoppingCart", id);
  useEffect(() => {
    onSnapshot(docRef, (doc) => {
      setCart(doc.data());
      setLoading(false);
    });
    if (!cart) {
      setLoading(true);
    }
  }, [id]);
  const updateList = async (id, data) => {
    const removeRes = await updateDoc(docRef, {
      cartList: arrayRemove(data),
    });
    return removeRes;
  };
  const handleToggle = (e) => {
    setIsChecked(e.target.checked);
  };
  return (
    <Grid container>
      {loading && <Loading />}
      <Grid item xs={12} md={12}>
        <Item>
          {cart &&
            cart?.cartList?.map((item, ind) => {
              return (
                <Box key={ind} sx={{ display: "flex", alignItems: "center" }}>
                  <Typography className={ischecked ? "compelet" : ""}>
                    {item}
                  </Typography>
                  <Checkbox
                    color="success"
                    value={item}
                    onClick={(e) => {
                      handleToggle(e);
                    }}
                  />
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
