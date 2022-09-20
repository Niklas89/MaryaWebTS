import { Link, useNavigate, useLocation } from "react-router-dom";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Grid, TextField, Typography } from "@mui/material";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { AxiosResponse } from 'axios';
import { IUser } from '../../interfaces/IUser';



const FormProfile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const goBack = () => navigate(-1);
    const axiosPrivate = useAxiosPrivate();
    const [userProfile, setUserProfile] = useState<IUser>({});
    const { auth } = useAuth();
    const id = auth?.id;

    useEffect(() => {
            axiosPrivate.get("/client/profile/")
            .then((res: AxiosResponse) => {setUserProfile(res.data)})
            .catch(() => {
                // if refresh token has expired, logout to login. Redirect to current page after login
                navigate('/login', { state: { from: location }, replace: true });
            });
    }, [])

    
    console.log(userProfile);
    console.log("auth");
    console.log(auth);
    
    return (
        <section>
            <form>
        <Grid container spacing={5} mt={5} direction="row" justifyContent="center">
            <Typography variant="h4">Profil {userProfile?.firstName}</Typography>
            <p>Id: {auth?.id}</p>
            <p>Email: {auth?.email}</p>
            <p>Role: {auth?.role}</p>
        </Grid>
        <Grid container spacing={5} mt={5} direction="row" justifyContent="center">
            <Grid item xs={0}>
                <TextField
                    id="lastname"
                    label="Nom"
                    name="lastname"
                    value={userProfile?.firstName || ''}
                     // function to set user state
                    // user state in value
                    required
                />
            </Grid>
            <Grid item xs={0}>
                <TextField
                    id="firstname"
                    label="Prénom"
                    name="firstname"
                    value={userProfile?.lastName || ''}
                    required
                />
            </Grid>
        </Grid>
        <Grid container spacing={5} mt={1} direction="row" justifyContent="center">
            <Grid item xs={0}>
                <TextField
                    id="email"
                    label="E-mail"
                    name="email"
                    value={auth?.email || ''}
                     // function to set user state
                    // user state in value
                    required
                />
            </Grid>
            <Grid item xs={0}>
                <TextField
                    id="city"
                    label="Ville"
                    name="city"
                    required
                />
            </Grid>
        </Grid>
        <Grid container spacing={5} mt={1} direction="row" justifyContent="center">
            <Grid item xs={0}>
                <TextField
                    id="postalcode"
                    label="Code Postal"
                    name="postalcode"
                    required
                />
            </Grid>
            <Grid item xs={0}>
                <TextField
                    id="phone"
                    label="Numéro de téléphone"
                    name="phone"
                    required
                />
            </Grid>
        </Grid>
        <Grid container spacing={0} mt={1} direction="row" justifyContent="center">
            <Grid item xs={0} mt={2}>
                <Button
                    variant="contained"
                    color="success"
                    startIcon={<DoneOutlineIcon />}
                    type="submit">
                    Modifier mes informations
                </Button>
            </Grid>
        </Grid>
    </form>
    <Grid container mb={2} direction="row" justifyContent="center">
        <Grid item xs={0} mt={2}>
            <Button
                        variant="contained"
                        component={Link}
                        to="#"
                        size="medium">
                Changer mot de passe
            </Button>
        </Grid>
    </Grid>
    <Grid container mb={5} ml={5} direction="row" justifyContent="left">
        <Grid item xs={0} mt={2}>
            <Button
                        variant="contained"
                        startIcon={<ArrowBackIcon />}
                        onClick={goBack}
                        size="small">
                Retour
            </Button>
        </Grid>
    </Grid>

        </section>
    );
};

export default FormProfile;