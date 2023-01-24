import { useState, useCallback, useEffect  } from "react";
import { IUser } from "../../interfaces/IUser";
import * as Yup from "yup";
import { FormFieldType, useFormBuilder } from "../form/FormModel";
import { FormikValues } from "formik";
import { toast } from "react-toastify";
import { Grid, TextField, Typography } from "@mui/material";
import { AxiosFunction } from "../../api/AxiosFunction";
import { useNavigate } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";

const userFormFields: FormFieldType[] = [
    { name: "email", field: TextField, label: "E-mail", isMultiLine: false, labelButton: "Envoyer" }
];

const FormResetPassword = () => {
    const navigate = useNavigate();
    const from = "/login";

    const initialValues = {
        email: ""
    };

    const [userEmail, setEmail] = useState<IUser>(initialValues);

    const { postQuery } = AxiosFunction();

    const validationShema = Yup.object().shape({
        email: Yup.string().email("Votre e-mail n\'est pas valide").required("Merci de remplir le champ e-mail")
    });

    const handleSubmit = useCallback((values: FormikValues, callback: any) => {

        const postData = { ...values };

        postQuery("/auth/reset", postData).then((response: AxiosResponse) => {
            setEmail({
                email: response.data.email
            });
            navigate(from, { replace: true });
        }).catch((error: AxiosError) => {
            toast.error("Une erreur est survenue lors de l'envoie.", {
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
    }, [postQuery, from, navigate]);

    const { renderForm } = useFormBuilder(validationShema, userEmail, userFormFields,
        { submit: handleSubmit }
    );


    useEffect(() => {
        userEmail.email = ""
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
                        Mot de passe oublié
                    </Typography>
                </Grid>
            </Grid>
            {renderForm}
        </>
    );
};

export default FormResetPassword;