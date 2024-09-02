import { Box, Grid, Stack } from "@mui/material";
import "../css/Profile.css";
import { useEffect, useState } from "react";
import api from "../../utils/intercepter";
import { useParams } from "react-router-dom";
const ViewProfile = () => {

    const [getUserData, setUserData] = useState('');
    const { id } = useParams();
    useEffect(() => {
        let mounted = true;
        getUser().then(function (response) {
            console.log(response);
            // handle success
            if (mounted) {
                setUserData(response.data.userDetails[0]);
                console.log(response.data.userDetails[0]);
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

    const getUser = () => {
        return api.get('/get/' + id);
    }

    return (
        <>
        <div className="viewpage">
            <h2>View Profile</h2>
            <Box
                height={500}
                width={900}
                my={4}
                display="flex"
                alignItems="center"
                gap={4}
                p={2}
                sx={{ border: '1px solid grey' }}
                
            >
                <table>
                    <tbody>
                        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                            <Grid container item spacing={3}>
                                <tr>
                                    <td>Username</td>
                                    <td>:</td>
                                    <td>{getUserData.username}</td>
                                </tr>
                            </Grid>
                            <Grid container item spacing={3}>
                                <tr>
                                    <td>Password</td>
                                    <td>:</td>
                                    <td>{getUserData.password}</td>
                                </tr>
                            </Grid>
                            <Grid container item spacing={3}>
                                <tr>
                                    <td>Email</td>
                                    <td>:</td>
                                    <td>{getUserData.email}</td>
                                </tr>
                            </Grid>
                        </Stack>
                        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                            <Grid container item spacing={3}>
                                <tr>
                                    <td>First Name</td>
                                    <td>:</td>
                                    <td>{getUserData.fname}</td>
                                </tr>
                            </Grid>
                            <Grid container item spacing={3}>
                                <tr>
                                    <td>Last Name</td>
                                    <td>:</td>
                                    <td>{getUserData.lname}</td>
                                </tr>
                            </Grid>
                            <Grid container item spacing={3}>
                                <tr>
                                    <td>Role</td>
                                    <td>:</td>
                                    <td>{getUserData.role}</td>
                                </tr>
                            </Grid>
                        </Stack>
                        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                            <Grid container item spacing={3}>
                                <tr>
                                    <td>Address</td>
                                    <td>:</td>
                                    <td>{getUserData.address}</td>
                                </tr>
                            </Grid>
                            <Grid container item spacing={3}>
                                <tr>
                                    <td>Country</td>
                                    <td>:</td>
                                    <td>{getUserData.country}</td>
                                </tr>
                            </Grid>
                            <Grid container item spacing={3}>
                                <tr>
                                    <td>State</td>
                                    <td>:</td>
                                    <td>{getUserData.state}</td>
                                </tr>
                            </Grid>
                        </Stack>
                        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                            <Grid container item spacing={3}>
                                <tr>
                                    <td>City</td>
                                    <td>:</td>
                                    <td>{getUserData.city}</td>
                                </tr>
                            </Grid>
                            <Grid container item spacing={3}>
                                <tr>
                                    <td>Pincode</td>
                                    <td>:</td>
                                    <td>{getUserData.pincode}</td>
                                </tr>
                            </Grid>
                            <Grid container item spacing={3}>
                                <tr>
                                    <td>Gender</td>
                                    <td>:</td>
                                    <td>{getUserData.gender}</td>
                                </tr>
                            </Grid>
                        </Stack>
                        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                            <tr>
                                <td>Image_URL</td>
                                <td>:</td>
                                <td>{getUserData.image_URL}</td>
                            </tr>

                        </Stack>
                    </tbody>
                </table>
            </Box>
            </div>
        </>
    )
}

export default ViewProfile;

