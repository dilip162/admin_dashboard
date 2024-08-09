import { Button, TextField } from "@mui/material";
import { useState } from "react";

import "./App.css";
const App = () => {
  const [remember, setRemember] = useState(false);
  const [formValues, setFormValues] = useState({
    username: {
      value: "",
      error: false,
      errorMessage: "username cannot be empty",
    },

    password: {
      value: "",
      error: false,
      errorMessage: "password cannot be empty",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: {
        ...formValues[name],
        value,
        error: value ? false : true,
      },
    });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    const [username, password] = Object.keys(formValues);

    if (
      (!formValues.username.value && !formValues.password.value) ||
      !formValues.username.value ||
      !formValues.password.value
    ) {
      setFormValues({
        ...formValues,
        [username]: {
          ...formValues[username],
          error: !formValues.name.value ? true : false,
        },
        [password]: {
          ...formValues[password],
          error: !formValues.password.value ? true : false,
        },
      });
    }

    setRemember(!remember);
    const usernameVal = formValues.username.value;
    const passwordVal = formValues.password.value;

    if (usernameVal && passwordVal) {
      if (document.getElementById("remember").checked) {
        localStorage.setItem("username", usernameVal);
        localStorage.setItem("password", passwordVal);
        console.log("hello");
      }
    }

    return false;
  };

  const handleReset = () => {
    const [username, password] = Object.keys(formValues);
    setFormValues({
      ...formValues,
      [username]: { ...formValues[username], value: "" },
      [password]: { ...formValues[password], value: "" },
    });
  };

  return (
    <>
      
      <div className="container">
        <form onSubmit={handlesubmit}>
          <h1>Admin Login</h1>
          <div className="form_conatiner">
            <TextField
              fullWidth
              placeholder="Enter your name"
              label="Username"
              name="username"
              variant="outlined"
              value={formValues.username.value}
              onChange={handleChange}
              error={formValues.username.error}
              helperText={
                formValues.username.error && formValues.username.errorMessage
              }
            />

            <br />
            <br />

            <TextField
              fullWidth
              placeholder="Enter password"
              label="password"
              name="password"
              variant="outlined"
              value={formValues.password.value}
              onChange={handleChange}
              error={formValues.password.error}
              helperText={
                formValues.password.error && formValues.password.errorMessage
              }
            />

            <br />
            <br />
            <input
              type="checkbox"
              name="remember"
              id="remember"
              onChange={(e) => setRemember(e.target.checked)}
            />
            <label className="remebertxt" htmlFor="remember">
              Remember me
            </label>
            <br />
            <Button
              sx={{ m: 2 }}
              variant="outlined"
              type="reset"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default App;
