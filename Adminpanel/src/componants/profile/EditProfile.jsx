import "../css/Profile.css";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import ImageIcon from "@mui/icons-material/Image";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  SvgIcon,
  TextField,
} from "@mui/material";

const EditProfile = () => {
  const [error, setError] = useState();
  const [getUserData, setUserData] = useState({
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
    email: {
      value: "",
      error: false,
      errorMessage: "email cannot be empty",
    },
    firstName: {
      value: "",
      error: false,
      errorMessage: "firstName cannot be empty",
    },
    lastName: {
      value: "",
      error: false,
      errorMessage: "lastname cannot be empty",
    },
    gender: {
      value: "",
      error: false,
      errorMessage: "gender cannot be empty",
    },
    roles: {
      value: "",
      error: false,
      errorMessage: "roles cannot be empty",
    },
    address: {
      value: "",
      error: false,
      errorMessage: "address cannot be empty",
    },
    city: {
      value: "",
      error: false,
      errorMessage: "city cannot be empty",
    },
    state: {
      value: "",
      error: false,
      errorMessage: "state cannot be empty",
    },
    pincode: {
      value: "",
      error: false,
      errorMessage: "pincode cannot be empty",
    },
    country: {
      value: "",
      error: false,
      errorMessage: "country cannot be empty",
    },
    file: {
      value: "",
      error: false,
      errorMessage: "image cannot be empty",
    },
  });

  const handleEdit = (e) => {
    const { name, value } = e.target;
    setError(false);
    setUserData((prevState) => {
      return {
        ...prevState,
        [name]: {
          ...getUserData[name],
          value,
          error: value ? false : true,
        },
      };
    });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    const [
      username,
      password,
      email,
      firstName,
      lastName,
      gender,
      roles,
      address,
      city,
      state,
      pincode,
      country,
      file,
    ] = Object.keys(getUserData);

    if (!getUserData.username.value) {
      // --------------------
      setUserData({
        ...getUserData,
        [username]: {
          ...getUserData[username],
          error: !getUserData.username.value ? true : false,
        },
        [password]: {
          ...getUserData[password],
          error: !getUserData.password.value ? true : false,
        },
        [email]: {
          ...getUserData[email],
          error: !getUserData.email.value ? true : false,
        },
        [firstName]: {
          ...getUserData[firstName],
          error: !getUserData.firstName.value ? true : false,
        },
        [lastName]: {
          ...getUserData[lastName],
          error: !getUserData.lastName.value ? true : false,
        },
        [gender]: {
          ...getUserData[gender],
          error: !getUserData.gender.value ? true : false,
        },
        [roles]: {
          ...getUserData[roles],
          error: !getUserData.roles.value ? true : false,
        },
        [address]: {
          ...getUserData[address],
          error: !getUserData.address.value ? true : false,
        },
        [city]: {
          ...getUserData[city],
          error: !getUserData.city.value ? true : false,
        },
        [state]: {
          ...getUserData[state],
          error: !getUserData.state.value ? true : false,
        },
        [pincode]: {
          ...getUserData[pincode],
          error: !getUserData.pincode.value ? true : false,
        },
        [country]: {
          ...getUserData[country],
          error: !getUserData.country.value ? true : false,
        },
        [file]: {
          ...getUserData[file],
          error: !getUserData.file.value ? true : false,
        },
      });

      console.log(getUserData);

      // ---------------
    }
  };

  return (
    <>
      <h2>Edit Profile</h2>
      <form id="myform" onSubmit={handlesubmit}>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <Grid container item spacing={3}>
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="User Name"
              name="username"
              onChange={handleEdit}
              value={getUserData.username.value}
              error={getUserData.username.error}
              helperText={
                getUserData.username.error && getUserData.username.errorMessage
              }
              fullWidth
            />
          </Grid>

          <Grid container item spacing={3}>
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Password"
              name="password"
              onChange={handleEdit}
              value={getUserData.password.value}
              error={getUserData.password.error}
              helperText={
                getUserData.password.error && getUserData.password.errorMessage
              }
              fullWidth
            />
          </Grid>

          <Grid container item spacing={3}>
            <TextField
              type="email"
              variant="outlined"
              color="secondary"
              label="Email"
              name="email"
              onChange={handleEdit}
              value={getUserData.email.value}
              error={getUserData.email.error}
              helperText={
                getUserData.email.error && getUserData.email.errorMessage
              }
              fullWidth
            />
          </Grid>
        </Stack>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <Grid container item spacing={3}>
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="First Name"
              name="firstName"
              onChange={handleEdit}
              value={getUserData.firstName.value}
              error={getUserData.firstName.error}
              helperText={
                getUserData.firstName.error &&
                getUserData.firstName.errorMessage
              }
              fullWidth
            />
          </Grid>

          <Grid container item spacing={3}>
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Last Name"
              name="lastName"
              onChange={handleEdit}
              value={getUserData.lastName.value}
              error={getUserData.lastName.error}
              helperText={
                getUserData.lastName.error && getUserData.lastName.errorMessage
              }
              fullWidth
            />
          </Grid>

          <Grid container item spacing={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-error-label">Roles</InputLabel>
              <Select
                labelId="demo-simple-select-error-label"
                id="demo-simple-select-error"
                name="roles"
                label="Roles"
                fullWidth
                onChange={handleEdit}
                value={getUserData.roles.value}
                error={getUserData.roles.error}
              >
                <MenuItem value={10}>Super Admin</MenuItem>
                <MenuItem value={20}>Admin</MenuItem>
                <MenuItem value={30}>Editor</MenuItem>
                <MenuItem value={40}>User</MenuItem>
              </Select>
              <FormHelperText className="required">
                {getUserData.roles.error && getUserData.roles.errorMessage}
              </FormHelperText>
            </FormControl>
          </Grid>
        </Stack>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <Grid container item spacing={3}>
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Address"
              size="normal"
              onChange={handleEdit}
              value={getUserData.address.value}
              error={getUserData.address.error}
              helperText={
                getUserData.address.error && getUserData.address.errorMessage
              }
              fullWidth
            />
          </Grid>
          <Grid container item spacing={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-error-label">
                Country
              </InputLabel>
              <Select
                labelId="demo-simple-select-error-label"
                id="demo-simple-select-error"
                label="Country"
                name="country"
                fullWidth
                onChange={handleEdit}
                value={getUserData.country.value}
                error={getUserData.country.error}
              >
                <MenuItem value={10}>India</MenuItem>
                <MenuItem value={20}>Russia</MenuItem>
                <MenuItem value={30}>Japan</MenuItem>
                <MenuItem value={40}>USA</MenuItem>
                <MenuItem value={50}>France</MenuItem>
              </Select>
              <FormHelperText className="required">
                {getUserData.country.error && getUserData.country.errorMessage}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid container item spacing={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-error-label">State</InputLabel>
              <Select
                labelId="demo-simple-select-error-label"
                id="demo-simple-select-error"
                name="state"
                label="State"
                onChange={handleEdit}
                value={getUserData.state.value}
                error={getUserData.state.error}
              >
                <MenuItem value={10}>Delhi</MenuItem>
                <MenuItem value={20}>Utter Pradesh</MenuItem>
                <MenuItem value={30}>Bihar</MenuItem>
                <MenuItem value={40}>Kerala</MenuItem>
                <MenuItem value={50}>Harayana</MenuItem>
              </Select>
              <FormHelperText className="required">
                {getUserData.state.error && getUserData.state.errorMessage}
              </FormHelperText>
            </FormControl>
          </Grid>
        </Stack>

        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <Grid container item spacing={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">City</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="city"
                label="City"
                fullWidth
                onChange={handleEdit}
                value={getUserData.city.value}
                error={getUserData.city.error}
              >
                <MenuItem value={10}>Delhi</MenuItem>
                <MenuItem value={20}>Mumbai</MenuItem>
                <MenuItem value={30}>Lucknow</MenuItem>
                <MenuItem value={40}>Bengaluru</MenuItem>
                <MenuItem value={50}>Jaipur</MenuItem>
              </Select>
              <FormHelperText className="required">
                {getUserData.city.error && getUserData.city.errorMessage}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid container item spacing={3}>
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Pin Code"
              name="pincode"
              onChange={handleEdit}
              value={getUserData.pincode.value}
              error={getUserData.pincode.error}
              helperText={
                getUserData.pincode.error && getUserData.pincode.errorMessage
              }
              fullWidth
            />
          </Grid>
          <Grid container item spacing={3}>
            <FormControl error={error} variant="standard">
              <FormLabel id="demo-error-radios">Gender</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-error-radios"
                name="gender"
                fullWidth
                onChange={handleEdit}
                value={getUserData.gender.value}
                error={getUserData.gender.error}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>

              <FormHelperText className="required">
                {getUserData.gender.error && getUserData.gender.errorMessage}
              </FormHelperText>
            </FormControl>
          </Grid>
        </Stack>

        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            type="file"
            accept="image/*"
            id="fileUploadButton"
            name="file"
            onChange={handleEdit}
            error={getUserData.file.error}
            helperText={getUserData.file.error && getUserData.file.errorMessage}
            fullWidth
          />
          <label htmlFor={"fileUploadButton"}>
            <Button
              color="secondary"
              variant="contained"
              component="span"
              startIcon={
                <SvgIcon fontSize="small">
                  <ImageIcon />
                </SvgIcon>
              }
            >
              Image
            </Button>
          </label>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Button variant="contained" type="reset">
            Edit
          </Button>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default EditProfile;
