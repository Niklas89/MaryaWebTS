import { Link, useLocation, useNavigate } from "react-router-dom";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button, Checkbox, FormControlLabel, Grid, isMuiElement, TextField, Typography } from "@mui/material";
import { FormFieldType, useFormBuilder } from "./FormModel";
import { useCallback, useEffect, useState } from "react";
import { AxiosFunction } from "../../api/AxiosFunction";
import { IUser } from "../../interfaces/IUser";
import { toast } from "react-toastify";
import { AxiosError, AxiosResponse } from "axios";
import * as Yup from "yup";
import { FormikValues } from "formik";
import useAuth from "../../hooks/useAuth";
import { CheckBox } from "@mui/icons-material";
import { pink } from "@mui/material/colors";

const LOGIN_URL = "user/login";

const userFormFields: FormFieldType[] = [
    { name: "email", field: TextField, label: "E-mail", isMultiLine: false },
    { name: "password", field: TextField, label: "Mot de passe", type: "password", isMultiLine: false },
];

const FormLogin = () => {

    const { setAuth, persist, setPersist } = useAuth();

    const navigate = useNavigate();
    const location: any = useLocation();
    const from = location.state?.from?.pathname || "/";

    const initialValues = {
        email: "",
        password: "",
    };

    const [userInfo, setUserInfos] = useState<IUser>(initialValues);

    const { postQuery } = AxiosFunction();

    const validationShema = Yup.object().shape({
        email: Yup.string().email("Votre e-mail n\'est pas valide").required("Merci de remplir le champ e-mail"),
        password: Yup.string().min(6, "Mot de passe trop court").max(50, "Mot de passe trop long").matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*#?&\/]{6,50}$/, "Le mot de passe doit contenir une majuscule, une minuscule, et un nombre.").required("Merci de remplir le champ mot de passe"),
    });
    const handleSubmit = useCallback((values: FormikValues, callback: any) => {

        const postData = { ...values };

        postQuery(LOGIN_URL, postData).then((response: AxiosResponse) => {
            const accessToken = response.data.accessToken;
            const role = response.data.idRole;
            //const email = response.data.email;
            const user = response.data.user.id;
            console.log("responce: " + user);
            const userId = setUserInfos(response.data)
            console.log(userId)
            //console.log("accessToken: " + accessToken);
            setAuth?.({ role, accessToken })
            //navigate(from, { replace: true });
        }).catch((error: AxiosError) => {
            toast.error("Ce compte existe déjà, merci de vous connecter.", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                toastId: "submit-dog-file-error"

            });
            return callback();
        }).finally(callback)
    }, [postQuery]);

    //pour la checkbox
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
    const togglePersist = () => {
        setPersist?.(!persist);
    }

    useEffect(() => {
        if (persist !== undefined) {
            localStorage.setItem("persist", persist.toString()); // store in localstorage at persist state change
        }
    }, [persist])

    const { renderForm } = useFormBuilder(validationShema, userInfo, userFormFields,
        { submit: handleSubmit }
    );
    return (
        <section>
            <Grid textAlign="center" item xs={12} pt={5}>
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
            {renderForm}
            <Grid item textAlign="center" xs={12}>
                <FormControlLabel control={
                    <Checkbox
                        id="persist"
                        onChange={togglePersist}
                        checked={persist}
                        {...label}
                        sx={{
                            color: "#0FC2C0",
                            "&:hover": {
                                color: "#0FC2C0",
                            }
                        }} />}
                    label="Se souvenir de moi!" />
            </Grid>
            <Grid container direction="row" justifyContent="center">
                <Grid item xs={0} mt={5} pb={13}>
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
        </section >
    );
};

export default FormLogin;