import { CircularProgress } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <div className="App">
      <div className="progress-container">
        <CircularProgress />
      </div>
    </div>
  );
};

export { Loading };
