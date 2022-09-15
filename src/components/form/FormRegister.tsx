import { useState, useCallback } from "react";
import { IUser } from '../../interfaces/IUser';
import * as Yup from "yup";
import { FormFieldType, useFormBuilder } from "./FormModel";
import { FormikValues } from "formik";
import { toast } from "react-toastify";
import { Grid, TextField, Typography } from "@mui/material";
import { AxiosFunction } from "../../api/AxiosFunction";


const userFormFields: FormFieldType[] = [
    { name: 'lastName', field: TextField, label: "Nom", isMultiLine: false },
    { name: 'firstName', field: TextField, label: "Prenom", isMultiLine: false },
    { name: 'email', field: TextField, label: "E-mail", isMultiLine: false },
    { name: 'password', field: TextField, label: "Mot de passe", type: "password", isMultiLine: false },

]


const FormRegister = () => {

    const initialValues = {
        lasteName: "test",
        firstName: "test",
        email: "test@test.fr",
        password: "123456Fhjg",
        idRole: 1
    };

    const [userInfo, setUserInfos] = useState<IUser>(initialValues)

    const { postQuery } = AxiosFunction()

    const validationShema = Yup.object().shape({
        email: Yup.string().email().required("Merci de remplir le champ e-mail"),
        lastName: Yup.string().required("Merci de remplir le champ nom"),
        firstName: Yup.string().required("Merci de remplir le champ prenom"),
        password: Yup.string().required("Merci de remplir le champ mot de passe"),
    })

    const handleSubmit = useCallback((values: FormikValues, callback: any) => {

        const postData = { ...values, 'idRole': '1' };
        postQuery('user/register', postData).then((response) => {
            toast.success('Les données ont bien été enregistrées', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                toastId: 'submit-dog-success'
            });
            setUserInfos(response.data)
            console.log({ ...values })
        }).catch(() => {
            toast.error('Une erreur s\'est produite.', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                toastId: 'submit-dog-file-error'
            });
            return callback();
        })
    }, [postQuery]);


    const { renderForm } = useFormBuilder(validationShema, userInfo, userFormFields,
        { submit: handleSubmit }
    )

    return (
        <>
            <Grid container spacing={3} mt={1} direction="row">
                <Grid textAlign="center" item xs={12}>
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