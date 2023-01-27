import { useCallback, useEffect, useState } from "react";
import { IService } from "../../interfaces/IService";
import * as Yup from "yup";
import { AxiosFunction } from "../../api/AxiosFunction";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import RadioGroup from "@mui/material/RadioGroup";
import { FormFieldType, useFormBuilder } from "./FormModel";
import { DateTimePicker } from "@mui/x-date-pickers";
import { FormikValues } from "formik";
import { toast } from "react-toastify";
import { Grid, Select, TextField } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { IBookings } from "../../interfaces/IBooking";

const BOOKING_URL = "booking/add";
const from = "/login";

let formFields: FormFieldType[] = [];

const FormAddBooking = () => {
  const initialValues = {};
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [services, setServices] = useState<Array<IService>>();
  const [booking, setBooking] = useState<IBookings>();
  const { id } = useParams();
  const { getQuery, postQuery } = AxiosFunction();

  const validationShema = Yup.object().shape({
    appointmentDate: Yup.date().required("Merci de remplir la date et heure."),
  });

  useEffect(() => {
    getQuery(`service/by-category/${id}`)
      .then((res: AxiosResponse) => {
        setServices(res?.data);
        const type = res.data?.[1].idType;
        if (type === 1) {
          formFields = [
            {
              name: "idService",
              field: RadioGroup,
              title: "Services à l'heure :",
              fields: res.data?.map((item: IService) => {
                return {
                  value: item.id,
                  name: "idService",
                  label: item.name + " " + item.price + " €",
                };
              }),
            },
            {
              name: "appointmentDate",
              field: DateTimePicker,
              title: "Pour le :",
              label: "Date et heure :",
              isMultiLine: true,
            },
            {
              name: "nbHours",
              field: Select,
              label: "Nombre d'heure",
              menuItems: [
                { value: "1", label: "1 heure" },
                { value: "2", label: "2 heures" },
                { value: "3", label: "3 heures" },
                { value: "4", label: "4 heures" },
                { value: "5", label: "5 heures" },
              ],
            },
            {
              name: "description",
              field: TextField,
              label: "Description",
              isMultiLine: true,
              labelButton: "Réserver",
            },
          ];
        } else {
          formFields = [
            {
              name: "idService",
              field: RadioGroup,
              title: "Services à la prestation :",
              fields: res.data?.map((item: IService) => {
                return {
                  value: item.id,
                  name: "idService",
                  label: item.name + " " + item.price + " €",
                };
              }),
            },
            {
              name: "appointmentDate",
              field: DateTimePicker,
              title: "Pour le :",
              label: "Date et heure :",
              isMultiLine: true,
            },
            {
              name: "description",
              field: TextField,
              label: "Description",
              isMultiLine: true,
              labelButton: "Réserver",
            },
          ];
        }
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }, [id]);

  const handleSubmit = useCallback(
    (values: FormikValues, callback: any) => {
      const idRole = auth?.role;
      if (idRole === undefined) {
        toast.error(
          "Veuillez vous connecter pour pouvoir continuer la réservation.",
          {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            toastId: "submit-file-error",
          }
        );
        // navigate(from, { replace: true });
      } else {
        const date = values.appointmentDate;
        const idServiceNum = Number(values.idService);
        const price = services?.find(
          (item: IService) => item.id === idServiceNum
        )?.price;
        if (!values.nbHours) {
          const postData = {
            accepted: 0,
            totalPrice: price,
            idService: idServiceNum,
            appointmentDate: date,
            description: values.description,
          };
          postQuery(BOOKING_URL, postData)
            .then((response: AxiosResponse) => {
              setBooking(response.data);
              const urlBooking =
                "/booking/confirmation/" + response.data.booking;
              navigate(urlBooking, { replace: true });
            })
            .catch((error: AxiosError) => {
              toast.error("Une erreur s'est produite.", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                toastId: "submit-file-error",
              });
              return;
            });
        } else {
          const hours = values.nbHours;
          const priceTotal = Number(hours) * Number(price);
          const postData = {
            accepted: 0,
            totalPrice: priceTotal,
            nbHours: values.nbHours,
            idService: idServiceNum,
            appointmentDate: date,
            description: values.description,
          };
          postQuery(BOOKING_URL, postData)
            .then((response: AxiosResponse) => {
              setBooking(response.data);
              const urlBooking =
                "/booking/confirmation/" + response.data.booking;
              navigate(urlBooking, { replace: true });
            })
            .catch((error: AxiosError) => {
              toast.error("Une erreur s'est produite.", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                toastId: "submit-file-error",
              });
              return;
            });
        }
      }
    },
    [postQuery]
  );

  const { renderForm } = useFormBuilder(
    validationShema,
    initialValues,
    formFields,
    { submit: handleSubmit }
  );
  return (
    <Grid container mb={5} justifyContent="center">
      <Grid item>{renderForm}</Grid>
    </Grid>
  );
};

export default FormAddBooking;
