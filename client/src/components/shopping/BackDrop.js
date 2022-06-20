import { useState } from "react";
//!
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import { Box, Input, Typography } from "@mui/material";
//!
export default function BackDrop({ title, setTitle }) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Button onClick={handleToggle}>Creat new list</Button>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <Box
          sx={{
            width: "50%",
            height: "60Vh",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography color="black" variant="h6">
            create new list
          </Typography>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button onClick={handleClose}>save</Button>
          <Button
            onClick={() => {
              setTitle("");
              handleClose();
            }}
          >
            cancel
          </Button>
        </Box>
      </Backdrop>
    </div>
  );
}
