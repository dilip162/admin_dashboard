import Grid from '@mui/material/Grid'
import ImageIcon from '@mui/icons-material/Image';
import { Button, FormControl, FormControlLabel, FormHelperText, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, SvgIcon, TextField, colors } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../utils/intercepter';

const AddNewUser = () => {
    const navigate = useNavigate();
    const [getCountryData, setCountryData] = useState(null);
    const [getStateData, setStateData] = useState(null);
    const [getCityData, setCityData] = useState(null);
    const [responseMessage, setResponseMessage] = useState("");
    const [getRegionValue, setRegionValue] = useState({
        country: "",
        state: "",
        city: ""
    });
    const [getAddUserData, setAddUserData] = useState({
        username: "",
        password: "",
        email: "",
        fname: "",
        lname: "",
        gender: "",
        role: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        image_URL: "",
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "image_URL") {
            const file = e.target.files[0];
            console.log(file);
            if (file) {
                const imageUrl = URL.createObjectURL(file);

                setAddUserData({
                    ...getAddUserData,
                    [name]: imageUrl,
                });
            }
        } else {
            setAddUserData({
                ...getAddUserData,
                [name]: value,
            });

        }
        if (name == 'country' && value) {
            getStates(value).then((response) => {
                setStateData(response.data.stateDetails)
                console.log(response);
            });
        }
        if (name == 'state' && value) {
            getCity(value).then((response) => {
                setCityData(response.data.cityDetails)
            });
        }
    };

    const regionClick = (e,item,type)=>{
        setRegionValue((prevState) => {
            return ({
                ...prevState,
                [type]: item.name
            });
        });
    }

    

    const handlesubmit = async (e) => {
        e.preventDefault();
        console.log("Form Submitted:", getAddUserData);

        try {
            let payload = {};
            for (let [key, value] of Object.entries(getAddUserData)) {
                payload[key] = value
            }
            console.log(payload)

            payload.remember = 'true';
            payload.role_name =getAddUserData.role;
            payload.country = getRegionValue.country;
            payload.state = getRegionValue.state;
            payload.city = getRegionValue.city;
            payload.country_id = getAddUserData.country;
            payload.state_id = getAddUserData.state;
            payload.city_id = getAddUserData.city;

            const response = await api.post("user/create",  payload);
            setResponseMessage("Data posted successfully!");
            setTimeout(() => {
                navigate("/admin/users");
            }, 5000);
            console.log("Response:", response.data);
            console.log(responseMessage);
        } catch (error) {
            setResponseMessage("Failed to post data.");
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        let mounted = true;
        getCountry().then(function (response) {
            // handle success
            if (mounted) {
                setCountryData(response.data.data);

            }

        })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            })
        return () => mounted = false;
    }, [])

    const getCountry = () => {
        return api.get('user/countries');
    }

    const getStates = (countryid) => {
        return api.get('user/countries/states/' + countryid);

    }

    const getCity = (stateid) => {
        return api.get('user/countries/states/city/' + stateid);

    }

    return (
        <>
            <div className="mainpage">
                <h2>Add New User</h2>
                <form id='myform' onSubmit={handlesubmit} >
                    <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                        <Grid container item spacing={3}>
                            <TextField
                                type="text"
                                variant='outlined'
                                color='secondary'
                                label="User Name"
                                name="username"
                                onChange={handleInputChange}
                                value={getAddUserData.username}
                                error={getAddUserData.username.error}
                                helperText={
                                    getAddUserData.username.error && getAddUserData.username.errorMessage
                                }
                                fullWidth
                            />
                        </Grid>

                        <Grid container item spacing={3}>
                            <TextField
                                type="text"
                                variant='outlined'
                                color='secondary'
                                label="Password"
                                name="password"
                                onChange={handleInputChange}
                                value={getAddUserData.password}
                                error={getAddUserData.password.error}
                                helperText={
                                    getAddUserData.password.error && getAddUserData.password.errorMessage
                                }
                                fullWidth
                            />
                        </Grid>

                        <Grid container item spacing={3}>
                            <TextField
                                type="email"
                                variant='outlined'
                                color='secondary'
                                label="Email"
                                name="email"
                                onChange={handleInputChange}
                                value={getAddUserData.email}
                                error={getAddUserData.email.error}
                                helperText={
                                    getAddUserData.email.error && getAddUserData.email.errorMessage
                                }
                                fullWidth
                            />
                        </Grid>

                    </Stack>
                    <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                        <Grid container item spacing={3}>
                            <TextField
                                type="text"
                                variant='outlined'
                                color='secondary'
                                label="First Name"
                                name="fname"
                                onChange={handleInputChange}
                                value={getAddUserData.fname}
                                error={getAddUserData.fname.error}
                                helperText={
                                    getAddUserData.fname.error && getAddUserData.fname.errorMessage
                                }
                                fullWidth

                            />
                        </Grid>

                        <Grid container item spacing={3}>
                            <TextField
                                type="text"
                                variant='outlined'
                                color='secondary'
                                label="Last Name"
                                name="lname"
                                onChange={handleInputChange}
                                value={getAddUserData.lname}
                                error={getAddUserData.lname.error}
                                helperText={
                                    getAddUserData.lname.error && getAddUserData.lname.errorMessage
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
                                    name="role"
                                    label="Roles"
                                    onChange={handleInputChange}
                                    value={getAddUserData.role}
                                    error={getAddUserData.role.error}
                                    fullWidth

                                >
                                    <MenuItem value={1}>Super Admin</MenuItem>
                                    <MenuItem value={2}>Admin</MenuItem>
                                    <MenuItem value={3}>Editor</MenuItem>
                                    <MenuItem value={4}>User</MenuItem>
                                </Select>
                                <FormHelperText className="required">{getAddUserData.role.error && getAddUserData.role.errorMessage}</FormHelperText>
                            </FormControl>

                        </Grid>
                    </Stack>
                    <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                        <Grid container item spacing={3}>
                            <TextField
                                type="text"
                                variant='outlined'
                                color='secondary'
                                label="Address"
                                name="address"
                                size='normal'
                                onChange={handleInputChange}
                                value={getAddUserData.address}
                                error={getAddUserData.address.error}
                                helperText={
                                    getAddUserData.address.error && getAddUserData.address.errorMessage
                                }
                                fullWidth
                            />
                        </Grid>
                        <Grid container item spacing={3}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-error-label">Country</InputLabel>
                                <Select
                                    labelId="demo-simple-select-error-label"
                                    id="demo-simple-select-error"
                                    label="Country"
                                    name='country'
                                    onChange={handleInputChange}
                                    value={getAddUserData.country}
                                    error={getAddUserData.country.error}
                                    fullWidth
                                >
                                     {getCountryData && getCountryData.map((item) => {
                                    return (<MenuItem onClick={(e)=>regionClick(e,item,'country')} value={item.id}>{item.name}</MenuItem>)
                                })}
                                </Select>
                                <FormHelperText className="required">{getAddUserData.country.error && getAddUserData.country.errorMessage}</FormHelperText>

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
                                    onChange={handleInputChange}
                                    value={getAddUserData.state}
                                    error={getAddUserData.state.error}
                                >
                                    {getStateData && getStateData.map((item) => {
                                    return (<MenuItem onClick={(e)=>regionClick(e,item,'state')} value={item.id}>{item.name}</MenuItem>)
                                })}
                                </Select>
                                <FormHelperText className="required">{getAddUserData.state.error && getAddUserData.state.errorMessage}</FormHelperText>
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
                                    onChange={handleInputChange}
                                    value={getAddUserData.city}
                                    error={getAddUserData.city.error}
                                    fullWidth
                                >
                                    {getCityData && getCityData.map((item) => {
                                    return (<MenuItem onClick={(e)=>regionClick(e,item,'city')} value={item.id}>{item.name}</MenuItem>)
                                })}
                                </Select>
                                <FormHelperText className="required">{getAddUserData.city.error && getAddUserData.city.errorMessage}</FormHelperText>
                            </FormControl>
                        </Grid>

                        <Grid container item spacing={3}>
                            <TextField
                                type="text"
                                variant='outlined'
                                color='secondary'
                                label="Pin Code"
                                name="pincode"
                                onChange={handleInputChange}
                                value={getAddUserData.pincode}
                                error={getAddUserData.pincode.error}
                                helperText={
                                    getAddUserData.pincode.error && getAddUserData.pincode.errorMessage
                                }
                                fullWidth

                            />
                        </Grid>
                        <Grid container item spacing={3}>
                            <FormControl variant="standard">
                                <FormLabel id="demo-error-radios">Gender</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-error-radios"
                                    name="gender"
                                    fullWidth
                                    onChange={handleInputChange}
                                    value={getAddUserData.gender}
                                    error={getAddUserData.gender.error}
                                >
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                                </RadioGroup>
                                <FormHelperText className="required">{getAddUserData.gender.error && getAddUserData.gender.errorMessage}</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Stack>

                    <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>

                        <TextField
                            type="file"
                            variant='outlined'
                            color='secondary'
                            accept="image/*"
                            id="fileUploadButton"
                            name="image_URL"
                            onChange={handleInputChange}
                            error={getAddUserData.image_URL.error}
                            helperText={
                                getAddUserData.image_URL.error && getAddUserData.image_URL.errorMessage
                            }
                            fullWidth
                        />
                        <label htmlFor={'fileUploadButton'}>
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
                        <Button variant="contained" type="submit">
                            Submit
                        </Button>
                    </Stack>
                </form>
            </div>
        </>
    )
}

export default AddNewUser;