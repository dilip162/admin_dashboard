import "../css/Profile.css";
import { useState } from "react";
import Box from '@mui/material/Box';
import { Button, Container, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField } from "@mui/material";
import { Link } from "react-router-dom";
  
const EditProfile =() =>{

    const [getUserData, setUserData] = useState({
        firstName:{
            value: "",
            error: false,
            errorMessage: "firstName cannot be empty",
          }, 
        lastName:{
            value: "",
            error: false,
            errorMessage: "lastname cannot be empty",
          },
        email:{
            value: "",
            error: false,
            errorMessage: "email cannot be empty",
          }, 
        gender:{
            value: "",
            error: false,
            errorMessage: "gender cannot be empty",
          }, 
        address:{
            value: "",
            error: false,
            errorMessage: "address cannot be empty",
          }, 
        city:{
            value: "",
            error: false,
            errorMessage: "city cannot be empty",
          },  
        state:{
            value: "",
            error: false,
            errorMessage: "state cannot be empty",
          }, 
        country:{
            value: "",
            error: false,
            errorMessage: "country cannot be empty",
          }, 
        pincode:{
            value: "",
            error: false,
            errorMessage: "pincode cannot be empty",
          },  
        file:{
            value: "",
            error: false,
            errorMessage: "image cannot be empty",
          }  

    });

    const handleEdit = (e)=>{
        const { name, value } = e.target;
        setUserData((prevState) => {
            return({
              ...prevState,
              [name]:  {
                ...getUserData[name],
                value,
                error: value ? false : true,
              }
            });
          });
    }
    
   
    return(
        <>
      
        <h2>Edit Profile</h2>
            <form id='myform' sx={{width:'1000px', }}>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="First Name"
                        name="firstName"
                        onChange={handleEdit}
                        value={getUserData.firstName.value}
                        fullWidth
                        required
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Last Name"
                        name="lastName"
                        onChange={handleEdit}
                        value={getUserData.lastName.value}
                        fullWidth
                        required
                    />
                </Stack>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                <TextField
                    type="email"
                    variant='outlined'
                    color='secondary'
                    label="Email"
                    name="email"
                    onChange={handleEdit}
                    value={getUserData.email.value}
                    fullWidth
                    required
                    
                />
                <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="gender"
        onChange={handleEdit}
        value={getUserData.gender.value}
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
        
      </RadioGroup>
    </FormControl>

                    </Stack>
                    <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Address"
                        size='normal'
                        onChange={handleEdit}
                        value={getUserData.address.value}
                        fullWidth
                        required
                    sx={{mb: 4}}
                />
                <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="City"
                        name="city"
                        onChange={handleEdit}
                        value={getUserData.city.value}
                        fullWidth
                        required
                    />
                    </Stack>
                
<Stack spacing={2} direction="row" sx={{marginBottom: 4}}>

<FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">State</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="state"
          label="State"
          onChange={handleEdit}
          value={getUserData.state.value}
          required
        >
          <MenuItem value={10}>Delhi</MenuItem>
          <MenuItem value={20}>Utter Pradesh</MenuItem>
          <MenuItem value={30}>Bihar</MenuItem>
          <MenuItem value={40}>Kerala</MenuItem>
          <MenuItem value={50}>Harayana</MenuItem>
        </Select>
      </FormControl>
      
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Country</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Country"
          name='country'
          onChange={handleEdit}
          value={getUserData.country.value}
          required
        >
          <MenuItem value={10}>India</MenuItem>
          <MenuItem value={20}>Russia</MenuItem>
          <MenuItem value={30}>Japan</MenuItem>
          <MenuItem value={40}>USA</MenuItem>
          <MenuItem value={50}>France</MenuItem>
        </Select>
      </FormControl>   
    </Stack>

              <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
              <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Pin Code"
                        name="pincode"
                        onChange={handleEdit}
                        value={getUserData.pincode.value}
                        fullWidth
                        required
                    />
                    
                    <TextField
                        type="file"
                        variant='outlined'
                        color='secondary'
                        label="Image"
                        accept="image/*"
                        id="imgInp"
                        onChange={handleEdit}
                        fullWidth
                    />
                    <img src={getUserData.file.value}  height={100} width={100} alt='your image'/>
                </Stack>

    <br/>

    <Stack direction="row" spacing={2}>
      <Button variant="outlined" type='reset'  color="error">
        Edit
      </Button>
      <Button variant="contained" type='submit'  color="success" >
        Save
      </Button>
    </Stack>
            </form>
            
        </>
    )
}

export default EditProfile;