import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const SingUp = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    const { email, value } = e.target;
    setFormValues({
      ...formValues,
      [email]: value,
    });
  };
  const handleSliderChange = (email) => (e, value) => {
    setFormValues({
      ...formValues,
      [email]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems="center" justify="center" direction="column">
        <Grid item>
          <TextField
            id="name-input"
            name="email"
            label="email"
            type="text"
            value={formValues.email}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="age-input"
            name="password"
            label="password"
            type="password"
            value={formValues.password}
            onChange={handleInputChange}
          />
        </Grid>

        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Grid>
    </form>
  );
};
export default SingUp;
