import { useState, useCallback, useEffect } from "react";
import { IChangePassword } from "../../interfaces/IChangePassword";
import * as Yup from "yup";
import { FormFieldType, useFormBuilder } from "./FormModel";
import { FormikValues } from "formik";
import { toast } from "react-toastify";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { AxiosFunction } from "../../api/AxiosFunction";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useLocation } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import useLogout from "../../hooks/useLogout";

const userFormFields: FormFieldType[] = [
    { name: "lastPassword", field: TextField, label: "Ancien Mot de passe", type: "password", isMultiLine: false },
    { name: "newPassword", field: TextField, label: "Nouveau Mot de passe", type: "password", isMultiLine: false, labelButton: "Modifier" },
];

const FormChangePassword = () => {
    const navigate = useNavigate();
    const logout = useLogout();
    const location: any = useLocation();
    const goBack = () => navigate(-1);
    const from = location.state?.from?.pathname || "/profile";

    const initialValues = {
        lastPassword: "",
        newPassword: ""
    };

    const [userPassword, setUserPassword] = useState<IChangePassword>(initialValues);

    const { patchQuery } = AxiosFunction();

    const validationShema = Yup.object().shape({
        lastPassword: Yup.string().required("Merci de remplir le champ de l'ancien mot de passe"),
        newPassword: Yup.string().min(6, "Mot de passe trop court").max(50, "Mot de passe trop long").matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*#?&\/]{6,50}$/, "Le mot de passe doit contenir une majuscule, une minuscule, et un nombre.").required("Merci de remplir le champ mot de passe")
    });

    const handleSubmit = useCallback((values: FormikValues, callback: any) => {

        const postData = { ...values };

        patchQuery("/user//edit-password/", postData).then((response: AxiosResponse) => {
            setUserPassword({
                lastPassword: response.data.lastPassword,
                newPassword: response.data.newPassword
            });
            logout();
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
    }, [patchQuery, from, navigate]);

    const { renderForm } = useFormBuilder(validationShema, userPassword, userFormFields,
        { submit: handleSubmit }
    );


    useEffect(() => {
        userPassword.lastPassword = ""
        userPassword.newPassword = ""
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
                        Changer le Mot de Passe
                    </Typography>
                </Grid>
            </Grid>
            {renderForm}
        </>
    );
};

export default FormChangePassword;