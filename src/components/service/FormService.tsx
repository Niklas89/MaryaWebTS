import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IService } from '../../interfaces/IService';
import * as Yup from "yup";
import { AxiosFunction } from '../../api/AxiosFunction';
import { useParams } from 'react-router-dom';
import { AxiosError, AxiosResponse } from 'axios';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from '../../api/axios';
import { FormFieldType, useFormBuilder } from '../form/FormModel';
import { DateTimePicker } from '@mui/x-date-pickers';
import moment from "moment";
import { FormikValues } from 'formik';
import { toast } from "react-toastify";
import useAuth from '../../hooks/useAuth';
import { IBookings } from '../../interfaces/IBooking';


const LOGIN_URL = "booking";

const serviceFormFields: FormFieldType[] = [

    { name: "appointmentDate", field: DateTimePicker, label: "Date et heure:", isMultiLine: true },

];


const FormService = () => {

    const initialValues = {
        appointmentDate: moment()
    }

    const { setAuth } = useAuth();
    const [booking, setBooking] = useState<IBookings>(initialValues);
    const [services, setServices] = useState<IService[]>();
    const { id } = useParams();

    const validationShema = Yup.object().shape({
        appointmentDate: Yup.string().required("Merci de remplire la date et heure"),
    })

    useEffect(() => {
        axios({
            method: "get",
            url: `/service/by-category/${id}`
        })
            .then((res: AxiosResponse) => setServices(res.data))
    }, []);


    const button = services?.map((item: IService) => {
        return (
            <FormControlLabel key={item.id} value={item?.id} control={<Radio />} label={item.name + ' ' + item.price + ' €'} />
        )
    })

    const { postQuery } = AxiosFunction();

    const handleSubmit = useCallback((values: FormikValues, callback: any) => {

        const postData = { ...values, "idService": id, "idClient": "1" };

        postQuery(LOGIN_URL, postData).then((response: AxiosResponse) => {
            const accessToken = response.data.accessToken;
            const role = response.data.idRole;
            const services = setServices(response.data);
            setAuth?.({ role, accessToken });
            //navigate(from, { replace: true });
        }).catch((error: AxiosError) => {
            toast.error("Une erreur c'est produite, vérifier vos identifiants.", {
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

    const { renderForm } = useFormBuilder(validationShema, services, booking, serviceFormFields,
        //{ submit: handleSubmit }
    );


    return (
        <div>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Les services proposer :</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                >
                    {button}
                </RadioGroup>
            </FormControl>
            {renderForm}
        </div >
    );
};

export default FormService;