import { Link, useNavigate, useLocation } from "react-router-dom";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { Button, Grid, TextField, Typography } from "@mui/material";
import useAuth from "../hooks/useAuth";



const Profile = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    const { auth } = useAuth();
    console.log(auth);
    console.log(auth?.role);
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
                        size="small">
                Changer mot de passe
            </Button>
        </Grid>
    </Grid>
    <button onClick={goBack}>Retour</button> 
        </section>
    );
};

export default Profile;