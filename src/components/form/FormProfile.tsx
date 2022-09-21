import { useState, useCallback, useEffect, useRef } from "react";
import { IUser } from "../../interfaces/IUser";
import * as Yup from "yup";
import { FormFieldType, useFormBuilder } from "./FormModel";
import { FormikValues } from "formik";
import { toast } from "react-toastify";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { AxiosFunction } from "../../api/AxiosFunction";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";

const userFormFields: FormFieldType[] = [
    { name: "lastName", field: TextField, label: "Nom", isMultiLine: false },
    { name: "firstName", field: TextField, label: "Prenom", isMultiLine: false },
    { name: "email", field: TextField, label: "E-mail", isMultiLine: false },
    { name: "address", field: TextField, label: "Adresse", isMultiLine: false },
    { name: "city", field: TextField, label: "Ville", isMultiLine: false },
    { name: "postalCode", field: TextField, label: "Code Postal", isMultiLine: false },
    { name: "phone", field: TextField, label: "Téléphone", isMultiLine: false, labelButton: "Modifier" },
];

const FormProfile = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const logout = useLogout();
    const location = useLocation();
    const goBack = () => navigate(-1);
    const axiosPrivate = useAxiosPrivate();

    const initialValues = {
        lastName: "",
        firstName: "",
        email: "",
        address: "",
        city: "",
        postalCode: "",
        phone: ""
    };

    const [userProfile, setUserProfile] = useState<IUser>(initialValues);

    const { patchQuery } = AxiosFunction();

    const validationShema = Yup.object().shape({
        lastName: Yup.string().matches(/^[A-Za-z]+$/, "Le nom doit contenir que des lettres.").required("Merci de remplir le champ nom"),
        firstName: Yup.string().matches(/^[A-Za-z]+$/, "Le nom doit contenir que des lettres.").required("Merci de remplir le champ prenom"),
        email: Yup.string().email("Votre e-mail n\'est pas valide").required("Merci de remplir le champ e-mail"),
        address: Yup.string().required("Merci de remplir le champ adresse"),
        city: Yup.string().matches(/^[A-Za-z]+$/, "La ville doit contenir que des lettres.").required("Merci de remplir le champ ville"),
        postalCode: Yup.number().required("Merci de remplir le champ code postal"),
        phone: Yup.number().required("Merci de remplir le champ téléphone")
    });

    const handleSubmit = useCallback((values: FormikValues, callback: any) => {

        const postData = { ...values };

        patchQuery("/client/edit/", postData).then((response: AxiosResponse) => {
            setUserProfile({
                lastName: response.data.lastName,
                firstName: response.data.firstName,
                email: response.data.email,
                address: response.data.client.address,
                city: response.data.client.city,
                postalCode: response.data.client.postalCode,
                phone: response.data.client.phone
            })
        }).catch((error: AxiosError) => {
            toast.error("Une erreur est survenue lors de la modification.", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                toastId: "submit-error"

            });
            return callback();
        }).finally(callback)
    }, [patchQuery]);

    const { renderForm } = useFormBuilder(validationShema, userProfile, userFormFields,
        { submit: handleSubmit }
    );

    console.log(auth?.role);

    useEffect(() => {
        axiosPrivate.get("/client/profile/")
            .then((response: AxiosResponse) => {
                setUserProfile({
                    lastName: response.data.lastName,
                    firstName: response.data.firstName,
                    email: response.data.email,
                    address: response.data.client.address,
                    city: response.data.client.city,
                    postalCode: response.data.client.postalCode,
                    phone: response.data.client.phone
                })
            })
            .catch(() => {
                // if refresh token has expired, logout to login. Redirect to current page after login
                navigate('/login', { state: { from: location }, replace: true });
            });
    }, [])

    return (
        <>
            <Grid container direction="row">
                <Grid textAlign="center" p={5} item xs={12}>
                    <Typography
                        sx={{
                            color: "#0FC2C0",
                            fontWeight: "bold"
                        }}
                        variant="h3"
                    >
                        Modifier le profil
                    </Typography>
                </Grid>
            </Grid>
            {renderForm}
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
                <Grid item xs={0} mt={1}>
                    <Button
                        variant="contained"
                        startIcon={<ArrowBackIcon />}
                        onClick={goBack}
                        size="small">
                        Retour
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default FormProfile;