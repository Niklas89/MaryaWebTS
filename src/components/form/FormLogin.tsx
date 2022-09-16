import { useRef, useState, useEffect, useContext } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import axios from "../../api/axios";
import { Button, Checkbox, Grid, TextField, Typography } from "@mui/material";
import { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { AxiosResponse } from "axios";
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

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

    const { auth, setAuth, persist, setPersist } = useAuth();

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
                console.log("role: " + role);
                console.log("accessToken: " + accessToken);
                console.log("email "+email);
                console.log("pwd "+pwd);

                // auth state stored in our global context with the usecontext hook :
                //ICI
                console.log(auth)
                setAuth?.({ email, pwd, role, accessToken });
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
    }

    const togglePersist = () => {
        // setPersist?.((prev: any) => !prev);
        setPersist?.(!persist);
    }

    
    useEffect(() => { 
        if(persist !== undefined) {
            localStorage.setItem("persist", persist.toString()); // store in localstorage at persist state change
        }
    }, [persist]) // [persist] : listen to when the persist state changes


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
                        <Checkbox 
                        id="persist"
                        onChange={togglePersist}
                        checked={persist} 
                        {...label} />
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