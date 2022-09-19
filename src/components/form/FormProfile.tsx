import { Link, useNavigate, useLocation } from "react-router-dom";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Grid, TextField, Typography } from "@mui/material";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { useState, useEffect, useRef } from 'react';
import axios from '../../api/axios';
import { AxiosResponse } from 'axios';
import { IUser } from '../../interfaces/IUser';



const Profile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const effectRan = useRef(false);
    const goBack = () => navigate(-1);
    const axiosPrivate = useAxiosPrivate();
    const [userProfile, setUserProfile] = useState<object>();
    const { auth } = useAuth();
    const id = auth?.id;

    // useEffect when component loads
    useEffect(() => {
        let isMounted = true;
        // cancel our request if the component unmounts
        const controller = new AbortController();

      if (effectRan.current === true) {
        
        const getUser = async () => {
            try {
                const response = await axiosPrivate.get("/client/profile/", {
                    signal: controller.signal
                });
                console.log("response data ");
                console.log(response.data);
                isMounted && setUserProfile(response.data);
            } catch (err) {
                console.error("catch:"); 
                console.error(err); 
                // if refresh token has expired, logout to login. Redirect to current page after login
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getUser();
    }
        // cleanup function runs as the component unmounts
        return () => {
            isMounted = false;
            controller.abort(); // cancel any request that we have pending when the component unmounts
            effectRan.current = true;
        }
    
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    
    
    
    return (
        <section>
            <form>
        <Grid container spacing={5} mt={5} direction="row" justifyContent="center">
            <Typography variant="h4">Profil {auth?.role}</Typography>
        </Grid>
        <Grid container spacing={5} mt={5} direction="row" justifyContent="center">
            <Grid item xs={0}>
                <TextField
                    id="lastname"
                    label="Nom"
                    name="lastname"
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
                    required
                />
            </Grid>
        </Grid>
        <Grid container spacing={5} mt={1} direction="row" justifyContent="center">
            <Grid item xs={0}>
                <TextField
                    id="email"
                    label="E-mail"
                    name="mail"
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
                    type="password"
                    
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

export default Profile;