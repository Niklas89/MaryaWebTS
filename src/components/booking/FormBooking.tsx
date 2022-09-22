import { useState, useCallback, useEffect, useRef } from "react";
import { IUser } from "../../interfaces/IUser";
import * as Yup from "yup";

import { FormikValues } from "formik";
import { toast } from "react-toastify";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { AxiosFunction } from "../../api/AxiosFunction";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
import { FormFieldType, useFormBuilder } from "../form/FormModel";
import { IBooking } from "../../interfaces/IBooking";

const userFormFields: FormFieldType[] = [
    { name: "address", field: TextField, label: "Adresse", isMultiLine: false },
    { name: "city", field: TextField, label: "Ville", isMultiLine: false },
    { name: "postalCode", field: TextField, label: "Code Postal", isMultiLine: false },
    { name: "phone", field: TextField, label: "Téléphone", isMultiLine: false },
    { name: "description", field: TextField, label: "description", isMultiLine: true, labelButton: "Valider" },
]

const FormBooking = () => {

    const navigate = useNavigate();

    const initialValues = {
        address: "",
        city: "",
        postalCode: "",
        phone: "",
        description: "",
    };

    const urlBooking = "/booking";

    const [userProfile, setUserProfile] = useState<IUser>(initialValues);
    //const [booking, setBooking] = useState<IBooking>()

    const { patchQuery } = AxiosFunction();

    const validationShema = Yup.object().shape({
        address: Yup.string().required("Merci de remplir le champ adresse"),
        city: Yup.string().matches(/^[A-Za-z]+$/, "La ville doit contenir que des lettres.").required("Merci de remplir le champ ville"),
        postalCode: Yup.number().required("Merci de remplir le champ code postal"),
        phone: Yup.number().required("Merci de remplir le champ téléphone"),
        description: Yup.string()
    });

    const handleSubmit = useCallback((values: FormikValues, callback: any) => {

        const dataClient = { address: values.address, city: values.city, postalCode: values.postalCode, phone: values.phone };

        patchQuery("client/edit/", dataClient).then((response: AxiosResponse) => {
            setUserProfile({
                address: response.data.client.address,
                city: response.data.client.city,
                postalCode: response.data.client.postalCode,
                phone: response.data.client.phone
            });
            navigate(urlBooking, { replace: true });
        }).catch((error: AxiosError) => {
            toast.error("Une erreur est survenue lors de la modification du profil.", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                toastId: "submit-error"
            });
            return callback();
        })

    }, [patchQuery]);

    const { renderForm } = useFormBuilder(validationShema, userProfile, userFormFields,
        { submit: handleSubmit }
    );

    return (
        <>
            {renderForm}
            <Grid container mb={2} direction="row" justifyContent="center">
                <Grid item xs={0} mt={2}>
                    <Button
                        variant="contained"
                        size="medium">
                        Annuler la prestation
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default FormBooking;