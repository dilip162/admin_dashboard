import "../css/Profile.css";
import { useEffect, useState } from "react";
import Grid from '@mui/material/Grid'
import ImageIcon from '@mui/icons-material/Image';
import { Button, FormControl, FormControlLabel, FormHelperText, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, SvgIcon, TextField, colors } from "@mui/material";
import api from "../../utils/intercepter";

const EditProfile = () => {

    const [getExistingData, setExistingData] = useState(JSON.parse(localStorage.getItem('userdata')));
    const [getCountryData, setCountryData] = useState(null);
    const [getStateData, setStateData] = useState(null);
    const [getCityData, setCityData] = useState(null);
    const [getRegionValue, setRegionValue] = useState({
        country: getExistingData.country,
        state: getExistingData.state,
        city: getExistingData.city
    });
    const [getUserData, setUserData] = useState({
        username: {
            value: getExistingData.username,
            error: false,
            errorMessage: "username cannot be empty",
        },
        password: {
            value: getExistingData.password,
            error: false,
            errorMessage: "password cannot be empty",
        },
        email: {
            value: getExistingData.email,
            error: false,
            errorMessage: "email cannot be empty",
        },
        fname: {
            value: getExistingData.fname,
            error: false,
            errorMessage: "firstName cannot be empty",
        },
        lname: {
            value: getExistingData.lname,
            error: false,
            errorMessage: "lastname cannot be empty",
        },
        gender: {
            value: getExistingData.gender,
            error: false,
            errorMessage: "gender cannot be empty",
        },
        role: {
            value: getExistingData.role,
            error: false,
            errorMessage: "roles cannot be empty",
        },
        address: {
            value: getExistingData.address,
            error: false,
            errorMessage: "address cannot be empty",
        },
        city: {
            value: getExistingData.city_id,
            error: false,
            errorMessage: "city cannot be empty",
        },
        state: {
            value: getExistingData.state_id,
            error: false,
            errorMessage: "state cannot be empty",
        },
        pincode: {
            value: getExistingData.pincode,
            error: false,
            errorMessage: "pincode cannot be empty",
        },
        country: {
            value: getExistingData.country_id,
            error: false,
            errorMessage: "country cannot be empty",
        },
        image_URL: {
            value: getExistingData.image_URL,
            error: false,
            errorMessage: "image cannot be empty",
        }

    });

    const handleEdit = (e) => {
        const { name, value } = e.target;
        setUserData((prevState) => {
            return ({
                ...prevState,
                [name]: {
                    ...getUserData[name],
                    value,
                    error: value ? false : true,
                }
            });
        });

        if (name == 'country' && value) {
            getStates(value).then((response) => {
                setStateData(response.data.stateDetails)
            });
        }
        if (name == 'state' && value) {
            getCity(value).then((response) => {
                setCityData(response.data.cityDetails)
            });
        }
    }

    const regionClick = (e,item,type)=>{
        setRegionValue((prevState) => {
            return ({
                ...prevState,
                [type]: item.name
            });
        });
    }

    const handlesubmit = (e) => {
        e.preventDefault();
        const [username,
            password,
            email,
            fname,
            lname,
            gender,
            role,
            address,
            city,
            state,
            pincode,
            country,
            image_URL] = Object.keys(getUserData);

        if (
            (!getUserData.username.value)
        ) {
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
                [fname]: {
                    ...getUserData[fname],
                    error: !getUserData.fname.value ? true : false,
                },
                [lname]: {
                    ...getUserData[lname],
                    error: !getUserData.lname.value ? true : false,
                },
                [gender]: {
                    ...getUserData[gender],
                    error: !getUserData.gender.value ? true : false,
                },
                [role]: {
                    ...getUserData[role],
                    error: !getUserData.role.value ? true : false,
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
                [image_URL]: {
                    ...getUserData[image_URL],
                    error: !getUserData.image_URL.value ? true : false,
                },
            });

            console.log(getUserData)

            // ---------------
        } else {

            let payload = {};
            for (let [key, value] of Object.entries(getUserData)) {
                payload[key] = value.value
            }
            console.log(payload)
            payload.id = getExistingData.id;
            payload.isDeleted = '0';
            payload.remember = 'true';
            payload.created_date = '';
            payload.updated_date = '';
            payload.country = getRegionValue.country;
            payload.state = getRegionValue.state;
            payload.city = getRegionValue.city
            
            api.put("/update/" + getExistingData.id, payload
            )
                .then((response) => {
                    console.log(response);
                    if (response.data) {
                        localStorage.setItem("token", response.data.token);
                        localStorage.setItem(
                            "userdata",
                            JSON.stringify(response.data.data)
                        );
                        // Route to /admin/dashboard
                        navigate("/admin/dashboard");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        return false;
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
        if (getExistingData.country_id) {
            getStates(getExistingData.country_id).then((response) => {
                setStateData(response.data.stateDetails);
            })
        }
        if (getExistingData.state_id) {
            getCity(getExistingData.state_id).then((response) => {
                setCityData(response.data.cityDetails)
            })

        }
        return () => mounted = false;
    }, [])

    const getCountry = () => {
        return api.get('/countries');
    }

    const getStates = (countryid) => {
        return api.get('/countries/states/' + countryid);

    }

    const getCity = (stateid) => {
        return api.get('/countries/states/city/' + stateid);

    }

    return (
        <>
     <div className="mainpage">
            <h2>Edit Profile</h2>
            <form id='myform' onSubmit={handlesubmit}>
                <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                    <Grid container item spacing={3}>
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="User Name"
                            name="username"
                            onChange={handleEdit}
                            inputProps={{ readOnly: true }}
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
                            variant='outlined'
                            color='secondary'
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
                            variant='outlined'
                            color='secondary'
                            label="Email"
                            name="email"
                            onChange={handleEdit}
                            inputProps={{ readOnly: true }}
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
                            variant='outlined'
                            color='secondary'
                            label="First Name"
                            name="fname"
                            onChange={handleEdit}
                            value={getUserData.fname.value}
                            error={getUserData.fname.error}
                            helperText={
                                getUserData.fname.error && getUserData.fname.errorMessage
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
                            onChange={handleEdit}
                            value={getUserData.lname.value}
                            error={getUserData.lname.error}
                            helperText={
                                getUserData.lname.error && getUserData.lname.errorMessage
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
                                fullWidth
                                onChange={handleEdit}
                                value={getUserData.role.value}
                                error={getUserData.role.error}

                            >
                                <MenuItem value={1}>Super Admin</MenuItem>
                                <MenuItem value={2}>Admin</MenuItem>
                                <MenuItem value={3}>Editor</MenuItem>
                                <MenuItem value={4}>User</MenuItem>
                            </Select>
                            <FormHelperText className="required">{getUserData.role.error && getUserData.role.errorMessage}</FormHelperText>
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
                            <InputLabel id="demo-simple-select-error-label">Country</InputLabel>
                            <Select
                                labelId="demo-simple-select-error-label"
                                id="demo-simple-select-error"
                                label="Country"
                                name='country'
                                fullWidth
                                onChange={handleEdit}
                                value={getUserData.country.value}
                                error={getUserData.country.error}
                            >
                                {getCountryData && getCountryData.map((item) => {
                                    return (<MenuItem onClick={(e)=>regionClick(e,item,'country')} value={item.id}>{item.name}</MenuItem>)
                                })}
                            </Select>
                            <FormHelperText className="required">{getUserData.country.error && getUserData.country.errorMessage}</FormHelperText>
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
                                {getStateData && getStateData.map((item) => {
                                    return (<MenuItem onClick={(e)=>regionClick(e,item,'state')} value={item.id}>{item.name}</MenuItem>)
                                })}
                            </Select>
                            <FormHelperText className="required">{getUserData.state.error && getUserData.state.errorMessage}</FormHelperText>
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
                                {getCityData && getCityData.map((item) => {
                                    return (<MenuItem onClick={(e)=>regionClick(e,item,'city')} value={item.id}>{item.name}</MenuItem>)
                                })}

                            </Select>
                            <FormHelperText className="required">{getUserData.city.error && getUserData.city.errorMessage}</FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid container item spacing={3}>
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
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
                        <FormControl variant="standard">
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
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="other" control={<Radio />} label="Other" />
                            </RadioGroup>

                            <FormHelperText className="required">{getUserData.gender.error && getUserData.gender.errorMessage}</FormHelperText>
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
                        onChange={handleEdit}
                        error={getUserData.image_URL.error}
                        helperText={
                            getUserData.image_URL.error && getUserData.image_URL.errorMessage
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
                    <Button variant="contained" type='reset'>
                        Edit
                    </Button>
                    <Button variant="contained" type="submit">
                        Submit
                    </Button>
                </Stack>
            </form>
            </div>

        </>
    )
}

export default EditProfile;