import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IService } from '../../interfaces/IService';
import * as Yup from "yup";
import { AxiosFunction } from '../../api/AxiosFunction';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosError, AxiosResponse } from 'axios';
import RadioGroup from '@mui/material/RadioGroup';
import { FormFieldType, useFormBuilder } from '../form/FormModel';
import { DateTimePicker } from '@mui/x-date-pickers';
import { FormikValues } from 'formik';
import { toast } from "react-toastify";
import { Select } from '@mui/material';
import useAuth from '../../hooks/useAuth';
import { IBookings } from '../../interfaces/IBooking';
import moment from 'moment';

const LOGIN_URL = "booking";
const from = "/login";

let formFields: FormFieldType[] = [

];

const FormService = () => {

    const initialValues = {

    }
    const { auth } = useAuth();
    const idUser = auth?.id;
    const navigate = useNavigate();
    const [services, setServices] = useState<Array<IService>>();
    const [booking, setBooking] = useState<IBookings>()
    const { id } = useParams();
    const { getQuery } = AxiosFunction();

    const validationShema = Yup.object().shape({
        //@TODO: Voir quel date et heure ne soit pas inferieur à moment()
        appointmentDate: Yup.string().required("Merci de remplire la date et heure"),
    })

    useEffect(() => {
        getQuery(`service/by-category/${id}`)
            .then((res: AxiosResponse) => {
                setServices(res?.data)
                const type = res.data?.[1].idType
                if (type === 1) {
                    formFields = [
                        //@TODO: changer le nom totalPrice
                        { name: "totalPrice", field: RadioGroup, title: "Services à l'heure:", fields: res.data?.map((item: IService) => { return { value: item.id, name: "totalPrice", label: item.name + ' ' + item.price + ' €' } }) },
                        { name: "appointmentDate", field: DateTimePicker, title: "Pour le:", label: "Date et heure:", isMultiLine: true },
                        { name: "nbHours", field: Select, label: "Nombre d'heure", menuItems: [{ value: "1", label: "1 Heure" }, { value: "2", label: "2 Heures" }, { value: "3", label: "3 Heures" }, { value: "4", label: "4 Heures" }, { value: "5", label: "5 Heures" }], labelButton: "Réserver" },
                    ];
                } else {
                    formFields = [
                        { name: "totalPrice", field: RadioGroup, title: "Services à la prestation:", fields: res.data?.map((item: IService) => { return { value: item.id, name: "totalPrice", label: item.name + ' ' + item.price + ' €' } }) },
                        { name: "appointmentDate", field: DateTimePicker, title: "Pour le:", label: "Date et heure:", isMultiLine: true, labelButton: "Réserver" }
                    ];
                }
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
                return;
            });
    }, []);

    const { postQuery } = AxiosFunction();

    const handleSubmit = useCallback((values: FormikValues, callback: any) => {
        const idUser = auth?.id;
        if (idUser === undefined) {
            navigate(from, { replace: true });
        } else {
            const date = values.appointmentDate
            const idService = values.totalPrice
            const price = services?.find((item: IService) => item.id === Number(idService))?.price
            //ici calculer le total
            //@TODO: calculer le total du prix

            if (!values.nbHours) {

                const postData = { accepted: 0, totalPrice: price, idClient: 1, idService: idService, appointmentDate: date }
                //const booking = { booking: postData }

                //console.log(idService)
                // postQuery(LOGIN_URL, postData).then((response: AxiosResponse) => {
                //     setBooking(response.data)
                //     console.log(setBooking(response.data))
                // })
            } else {
                const idService = values.totalPrice;
                //console.log(services)
                const priceTotal = values.totalPrice
                const postData = { nbHours: values.nbHours, accepted: 0, }
                postQuery(LOGIN_URL, postData).then((response: AxiosResponse) => {
                    setBooking(response.data)
                })
            }
        }
    }, []);

    const { renderForm } = useFormBuilder(validationShema, initialValues, formFields,
        { submit: handleSubmit }
    );
    return (
        <div>
            {renderForm}
        </div >
    );
};

export default FormService;

function callback(): any {
    throw new Error('Function not implemented.');
}
