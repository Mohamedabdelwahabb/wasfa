import React, { useEffect, useState } from "react";
//!
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../util/firebase.config";
//!
import { Box, Input } from "@mui/material";
//!
import { ButtonA } from "../../pages/RecipeDetail";
//!

const ImgUpload = ({ setImageUrl, setProgress }) => {
  const [image, setImage] = useState("");
  const handleFilesChange = (e) => {
    setImage(e.target.files[0]);
  };

  (function () {
    // Create a reference
    console.log(image);
    if (image === "") {
      return;
    } else {
      const storageRef = ref(storage, `/images/${image.name}`);
      const uploadImage = uploadBytesResumable(storageRef, image);
      uploadImage.on(
        "state_changed",
        (snapshot) => {
          const progressPercent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progressPercent);
          setImage("");
        },
        (err) => {
          console.log(err);
        },
        () => {
          getDownloadURL(uploadImage.snapshot.ref)
            .then((url) => {
              setImageUrl(url);
              console.log(url, "itt");
            })
            .then(() => {
              setProgress(0);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      );
    }
  })();

  return (
    <Box>
      <Input
        type="file"
        accept="image/*"
        name="image"
        onChange={(e) => {
          handleFilesChange(e);
        }}
      />

      {/* <ButtonA onClick={upload}> upload</ButtonA> */}
    </Box>
  );
};

export default ImgUpload;
