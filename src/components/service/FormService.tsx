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

let formFields: FormFieldType[] = [

    //{ name: "bidule", field: FormControlLabel, attributes: { control: <Radio />, label: 'euh' } }

];


const FormService = () => {

    const initialValues = {
        //appointmentDate: moment()
        //bidule: "test"
    }

    const { setAuth } = useAuth();
    const [booking, setBooking] = useState(initialValues);
    const [services, setServices] = useState<Array<IService>>();
    const { id } = useParams();
    const { getQuery } = AxiosFunction();
    const validationShema = Yup.object().shape({
        // appointmentDate: Yup.string().required("Merci de remplire la date et heure"),
    })

    const serviceFormFields: FormFieldType[] = services?.map((item: IService) => {
        const myArray = {
            name: item.name,
            field: FormControlLabel,
            label: item.name,
            attributes: {
                control: <Radio />,
            }
        };
        return myArray;
    }) ?? formFields;
    // formFields.push({ name: "radioGroup", field: RadioGroup, fields: services?.map((item: IService) => { return { label: item.name + ' ' + item.price + ' €' } }) });

    useEffect(() => {
        getQuery(`service/by-category/${id}`)
            .then((res: AxiosResponse) => {
                setServices(res.data)
                formFields = [
                    { name: "radioGroup", field: RadioGroup, fields: res.data?.map((item: IService) => { return { label: item.name + ' ' + item.price + ' €' } }) },
                    { name: "appointmentDate", field: DateTimePicker, label: "Date et heure:", isMultiLine: true }
                ];
                console.log(formFields);
            })
    }, []);


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

    const { renderForm } = useFormBuilder(validationShema, initialValues, formFields,
        //{ submit: handleSubmit }
    );


    return (
        <div>
            {renderForm}
        </div >
    );
};

export default FormService;