import { useState, useCallback } from "react";
import { IUser } from "../../interfaces/IUser";
import * as Yup from "yup";
import { FormFieldType, useFormBuilder } from "./FormModel";
import { FormikValues } from "formik";
import { toast } from "react-toastify";
import { Grid, TextField, Typography } from "@mui/material";
import { AxiosFunction } from "../../api/AxiosFunction";
import { useNavigate } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";


const userFormFields: FormFieldType[] = [
    { name: "lastName", field: TextField, label: "Nom", isMultiLine: false },
    { name: "firstName", field: TextField, label: "Prenom", isMultiLine: false },
    { name: "email", field: TextField, label: "E-mail", isMultiLine: false },
    { name: "password", field: TextField, label: "Mot de passe", type: "password", isMultiLine: false, labelButton: "S'enregistrer" },
];

const FormRegister = () => {

    const navigate = useNavigate();
    const from = "/home";

    const initialValues = {
        lastName: "",
        firstName: "",
        email: "",
        password: "",
    };

    const [userInfo, setUserInfos] = useState<IUser>(initialValues);

    const { postQuery } = AxiosFunction();

    const validationShema = Yup.object().shape({
        email: Yup.string().email("Votre e-mail n\'est pas valide").required("Merci de remplir le champ e-mail"),
        lastName: Yup.string().matches(/^[A-Za-z ]+$/, "Le nom doit contenir que des lettres.").required("Merci de remplir le champ nom"),
        firstName: Yup.string().matches(/^[A-Za-z ]+$/, "Le nom doit contenir que des lettres.").required("Merci de remplir le champ prenom"),
        password: Yup.string().min(6, "Mot de passe trop court").max(50, "Mot de passe trop long").matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*#?&\/]{6,50}$/, "Le mot de passe doit contenir une majuscule, une minuscule, et un nombre.").required("Merci de remplir le champ mot de passe"),
    });

    const handleSubmit = useCallback((values: FormikValues, callback: any) => {

        const postData = { ...values, "idRole": "1" };

        postQuery("user/register", postData).then((response: AxiosResponse) => {
            setUserInfos(response?.data)
            navigate(from, { replace: true });
        }).catch((error: AxiosError) => {
            toast.error("Ce compte existe déjà, merci de vous connecter.", {
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
    }, [postQuery]);

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