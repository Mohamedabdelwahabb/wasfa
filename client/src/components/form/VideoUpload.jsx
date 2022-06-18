import React, { useState } from "react";
//!
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../util/firebase.config";
//!
import { Box, Input } from "@mui/material";
import { ButtonA } from "../../pages/RecipeDetail";
//!

const VideoUpload = ({ setVideoUrl, setProgress }) => {
  const [video, setVideo] = useState("");
  const handleFilesChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const upload = () => {
    const storageRef = ref(storage, `/videos/${video.name}`);

    const uploadeVideo = uploadBytesResumable(storageRef, video);
    uploadeVideo.on(
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
        getDownloadURL(uploadeVideo.snapshot.ref)
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
  return (
    <Box>
      <Input
        type="file"
        accept="video/*"
        name="video"
        onChange={(e) => handleFilesChange(e)}
      />

      <ButtonA onClick={upload}> upload</ButtonA>
    </Box>
  );
};

export default VideoUpload;
