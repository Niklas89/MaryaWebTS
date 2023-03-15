import { useState, useCallback, useEffect } from "react";
import * as Yup from "yup";
import { FormFieldType, useFormBuilder } from "../form/FormModel";
import { FormikValues } from "formik";
import { toast } from "react-toastify";
import { Grid, TextField, Typography } from "@mui/material";
import { AxiosFunction } from "../../api/AxiosFunction";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosResponse } from "axios";
import { IUser } from "../../interfaces/IUser";

const userFormFields: FormFieldType[] = [
    { name: "password", field: TextField, label: "Nouveau Mot de passe", type: "password", isMultiLine: false, labelButton: "Sauvegarder" },
];

const FormResetPasswordSaveNew = () => {
    const navigate = useNavigate();
    const { token } = useParams();
    const from = "/login";

    const initialValues = {
        id: 0,
        password: "",
        resetToken: ""
    };

    const [userToken, setUserToken] = useState<IUser>(initialValues);

    const { postQuery, getQuery } = AxiosFunction();

    const validationShema = Yup.object().shape({
        password: Yup.string().min(6, "Mot de passe trop court").max(50, "Mot de passe trop long").matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*#?&\/]{6,50}$/, "Le mot de passe doit contenir une majuscule, une minuscule, et un nombre.").required("Merci de remplir le champ mot de passe")
    });

    const handleSubmit = useCallback((values: FormikValues, callback: any) => {
        const postData = { ...values, id: userToken.id, resetToken: userToken.resetToken };

        postQuery("/auth/new-password/", postData).then(() => {
            navigate(from, { replace: true });
        }).catch(() => {
            toast.error("Une erreur est survenue lors de la sauvegarde du mot de passe.", {
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

    const { renderForm } = useFormBuilder(validationShema, userToken, userFormFields,
        { submit: handleSubmit }
    );

    useEffect(() => {
            getQuery(`auth/reset/${token}`).then((response: AxiosResponse) => {
                setUserToken({
                    id: response.data.user.id,
                    resetToken: response.data.token,
                    password: ""
                });
            }).catch(() => {
                toast.error("Votre demande de réinitialisation du mot de passe a expirée. Veuillez réessayer.", {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    toastId: "submit-error"
    
                });
                return;
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
                        Renseigner un Mot de Passe
                    </Typography>
                </Grid>
            </Grid>
            {renderForm}
        </>
    );
};

export default FormResetPasswordSaveNew;

function postQuery(arg0: string, postData: { [x: string]: any; }) {
    throw new Error("Function not implemented.");
}
