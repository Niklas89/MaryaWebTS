import { useState, useCallback, useEffect } from "react";
import { IUser } from "../../interfaces/IUser";
import * as Yup from "yup";
import { FormFieldType, useFormBuilder } from "./FormModel";
import { FormikValues } from "formik";
import { toast } from "react-toastify";
import { Grid, TextField, Typography } from "@mui/material";
import { AxiosFunction } from "../../api/AxiosFunction";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import useAuth from "../../hooks/useAuth";


const userFormFields: FormFieldType[] = [
    { name: "lastName", field: TextField, label: "Nom", isMultiLine: false },
    { name: "firstName", field: TextField, label: "Prenom", isMultiLine: false },
    { name: "email", field: TextField, label: "E-mail", isMultiLine: false },
    { name: "password", field: TextField, label: "Mot de passe", type: "password", isMultiLine: false },
    { name: "phone", field: TextField, label: "Téléphone", isMultiLine: false },
    { name: "address", field: TextField, label: "Adresse", isMultiLine: false },
    { name: "postalCode", field: TextField, label: "Code postal", isMultiLine: false },
    { name: "city", field: TextField, label: "Ville", isMultiLine: false, labelButton: "S'enregistrer" },
];

const FormRegister = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    //const location: any = useLocation();
    //const from = location.state?.from?.pathname || "/";
    const from = "/login"

    const initialValues = {
        lastName: "",
        firstName: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        postalCode: "",
        city: "",
    };

    const [userInfo, setUserInfos] = useState<IUser>(initialValues);

    const { postQuery } = AxiosFunction();

    const validationShema = Yup.object().shape({
        email: Yup.string().email("Votre e-mail n\'est pas valide").required("Merci de remplir le champ e-mail"),
        lastName: Yup.string().matches(/^[A-Za-z ]+$/, "Le nom doit contenir que des lettres.").required("Merci de remplir le champ nom"),
        firstName: Yup.string().matches(/^[A-Za-z ]+$/, "Le prenom doit contenir que des lettres.").required("Merci de remplir le champ prenom"),
        password: Yup.string().min(6, "Mot de passe trop court").max(50, "Mot de passe trop long").matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*#?&\/]{6,50}$/, "Le mot de passe doit contenir une majuscule, une minuscule, et un nombre.").required("Merci de remplir le champ mot de passe"),
        phone: Yup.string().required("Merci de remplir le champ numéro de téléphone."),
        address: Yup.string().required("Merci de remplire le champ adresse"),
        postalCode: Yup.number().required("Merci de remplire le champ code postal"),
        city: Yup.string().required("Merci de remplire le champ ville"),
    });

    const handleSubmit = useCallback((values: FormikValues, callback: any) => {

        const postData = { ...values, "idRole": "1" };

        postQuery("auth/client/register", postData).then((response: AxiosResponse) => {
            const accessToken = response.data.accessToken;
            const role = response.data.idRole;
            setAuth?.({ role, accessToken });
            setUserInfos(response?.data);
            navigate(from, { replace: true });
        }).catch((error: AxiosError) => {
            console.log(error);
            toast.error(`${error.response?.data}`, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                toastId: "submit-file-error"

            });
            return callback();
        }).finally(callback)
    }, [postQuery, from, navigate, setAuth]);

    const { renderForm } = useFormBuilder(validationShema, userInfo, userFormFields,
        { submit: handleSubmit }
    );

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
                        Inscription
                    </Typography>
                </Grid>
            </Grid>
            {renderForm}
        </>
    );
};

export default FormRegister;