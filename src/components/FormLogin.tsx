import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import axios from "../api/axios";
import { Button, Grid, TextField, Typography } from "@mui/material";

const LOGIN_URL = "/user/login"; // login endpoint in backend nodejs api

const FormLogin = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    // navigate to the location where the user wanted to go before they were sent to the login page OR the home page
    //const from = location.state?.from?.pathname || "/";
    const from = "/home";
    // set focus on user input and error message
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);
    const [user, setUser] = useState<string>("");
    const [pwd, setPwd] = useState<string>("");
    const [errMsg, setErrMsg] = useState<string>("");

    // when component loads set focus on first input field / user field
    useEffect(() => {
        if (userRef.current !== null)
            userRef.current.focus();
    }, [])

    // make error message disapear when ajusting fields 
    useEffect(() => {
        setErrMsg("");
    }, [user, pwd])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // prevent default behavior of the page which would reload of the page

        try {
            // post login file to backend api
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email: user, password: pwd }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            );
            const accessToken = response?.data?.accessToken;
            console.log(accessToken)
            const role = response?.data?.idRole;
            // auth state stored in our global context with the usecontext hook :
            // setAuth?.({ email, pwd, role, accessToken });

            // clear components after submit complete
            setUser("");
            setPwd("");
            // after the form is submited, navigate to the location where the user wanted to go before they were sent to the login page
            navigate(from, { replace: true });
        } catch (err: any) {
            if (!err?.response) {
                setErrMsg("Le serveur ne repond pas");
            } else if (err.response?.status === 400) {
                setErrMsg("Manque le champ Email ou mot de passe");
            } else if (err.response?.status === 401) {
                setErrMsg("Vous n'êtes pas authorisé/e");
            } else {
                setErrMsg("Erreur de connection");
            }
            if (errRef.current !== null)
                errRef.current.focus();
        }
    }
    return (
        <section>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={5} mt={5} direction="row" justifyContent="center">
                    <Typography variant="h4">Connexion</Typography>
                </Grid>
                <Grid container spacing={5} mt={5} direction="row" justifyContent="center">
                    <Grid item xs={0}>
                        <TextField
                            id="email"
                            ref={userRef}
                            label="E-mail"
                            name="mail"
                            autoComplete="off" // not fill input with past entries
                            onChange={(e) => setUser(e.target.value)} // function to set user state
                            value={user} // user state in value
                            required
                        />
                    </Grid>
                    <Grid item xs={0}>
                        <TextField
                            id="pwd"
                            label="Mot de passe"
                            name="pwd"
                            type="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={0} direction="row" justifyContent="center">
                    <Grid item xs={0} mt={2}>
                        <Button
                            variant="contained"
                            color="success"
                            startIcon={<DoneOutlineIcon />}
                            type="submit"
                        >
                            Connection
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Grid container direction="row" justifyContent="center">
                <Grid item xs={0} mt={6}>
                    <Typography>Besoin d'un compte ?</Typography>
                    <Button
                        variant="contained"
                        component={Link}
                        to="/register"
                        startIcon={<AddCircleOutlineIcon />}
                    >
                        Inscription
                    </Button>
                </Grid>
            </Grid>
        </section>
    );
};

export default FormLogin;