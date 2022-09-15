import { useRef, useState, useEffect, useContext } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import axios from "../api/axios";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { ButtonProps } from '@mui/material/Button';
import { AxiosError, AxiosResponse } from "axios";
import { styled } from '@mui/material/styles';
import { Box, Container } from "@mui/system";
import Cookies from "js-cookie";

const LOGIN_URL = "/user/login"; // login endpoint in backend nodejs api

const LoginButton = styled(Button)<ButtonProps>(() => ({
    backgroundColor: "#023535",
    "&:hover": {
        backgroundColor: "#023535",
    }
}));

const FormLogin = () => {
    // const error: any = document.getElementById("error");
    const error = document.getElementById("error");

    const { auth, setAuth } = useAuth();

    const navigate = useNavigate();
    const location: any = useLocation();
    // navigate to the location where the user wanted to go before they were sent to the login page OR the home page
    const from = location.state?.from?.pathname || "/";
    //const from = "/home";
    // set focus on user input and error message
    
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);
    const [email, setEmail] = useState<string>("");
    const [pwd, setPwd] = useState<string>("");
    const [err, setErr] = useState<boolean>(false) 

    // when component loads set focus on first input field / user field
    useEffect(() => {
        if (userRef.current !== null)
            userRef.current.focus();
    }, [])

    // make error message disapear when ajusting fields 
    /*useEffect(() => {
        setErrMsg("");
    }, [email, pwd])*/

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // prevent default behavior of the page which would reload of the page
        e.preventDefault();
        axios({
            method: "post",
            url: LOGIN_URL,
            withCredentials: true,
            data: {
                email: email,
                password: pwd
            }
        })
            .then((res: AxiosResponse) => {
                const accessToken = res.data.accessToken;
                const role = res.data.idRole;
                console.log("test1");
                console.log(role);
                console.log(accessToken);
                console.log(email);
                console.log(pwd);

                // auth state stored in our global context with the usecontext hook :
                setAuth?.({ email, pwd, role, accessToken });
                Cookies.set("email", email);
                console.log(auth?.email);
                
                // clear components after submit complete
                setEmail("");
                setPwd("");
                // after the form is submited, navigate to the location where the user wanted to go before they were sent to the login page
                navigate(from, { replace: true });
            })
            // .catch((err: AxiosError) => {
                .catch((err) => {
                setErr(true);
                
                if(error != null) {
                    error.innerHTML = err.response?.data;
                    error.removeAttribute("hidden");
                    console.log(err.response?.data);
                }
                


                if (errRef.current !== null)
                    errRef.current.focus();
            })

        /*
        try {
            // post login file to backend api
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email: email, password: pwd }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            );
            const accessToken = response?.data?.accessToken;
            console.log(accessToken)
            const role = response?.data?.idRole;
            // auth state stored in our global context with the usecontext hook :
            setAuth?.({ user, pwd, role, accessToken });

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
        */
    }


    return (
        <section>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3} mt={1} direction="row">
                    <Grid item xs={12}>
                        <Typography hidden sx={{
                            fontSize: "12px",
                            backgroundColor: "#DBF227",
                            fontWeight: "bold",
                            borderRadius: 2,
                            padding: "5px 10px",
                        }} id="error">
                        </Typography>
                    </Grid>
                    <Grid textAlign="center" item xs={12}>
                        <Typography
                            sx={{
                                color: "#0FC2C0",
                                fontWeight: "bold"
                            }}
                            variant="h3"
                        >
                            Connexion
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} textAlign={["center", "center", "right"]}>
                        <TextField
                            id="email"
                            ref={userRef}
                            label="E-mail"
                            name="mail"
                            autoComplete="off" // not fill input with past entries
                            onChange={(e) => setEmail(e.target.value)} // function to set user state
                            value={email} // user state in value
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} textAlign={["center", "center", "left"]}>
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
                    <Grid item textAlign="center" xs={12}>
                        <LoginButton
                            variant="contained"
                            startIcon={<DoneOutlineIcon />}
                            type="submit"
                        >
                            Connexion
                        </LoginButton>
                    </Grid>
                </Grid>
            </form>
            <Grid container direction="row" justifyContent="center">
                <Grid item xs={0} mt={5} mb={3}>
                    <Typography>Besoin d'un compte ?</Typography>
                    <Button
                        variant="contained"
                        component={Link}
                        to="/register"
                        startIcon={<AddCircleOutlineIcon />}
                        sx={{
                            backgroundColor: "#0FC2C0",
                            "&:hover": {
                                backgroundColor: "#0FC2C0",
                            }
                        }}
                    >
                        Inscription
                    </Button>
                </Grid>
            </Grid>
        </section>

    );
};

export default FormLogin;