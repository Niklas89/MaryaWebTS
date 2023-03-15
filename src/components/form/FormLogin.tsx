import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { FormFieldType, useFormBuilder } from "./FormModel";
import { useCallback, useEffect, useState } from "react";
import { AxiosFunction } from "../../api/AxiosFunction";
import { IUser } from "../../interfaces/IUser";
import { toast } from "react-toastify";
import { AxiosError, AxiosResponse } from "axios";
import * as Yup from "yup";
import { FormikValues } from "formik";
import useAuth from "../../hooks/useAuth";

const LOGIN_URL = "auth/login";

const userFormFields: FormFieldType[] = [
  { name: "email", field: TextField, label: "E-mail", isMultiLine: false },
  {
    name: "password",
    field: TextField,
    label: "Mot de passe",
    type: "password",
    isMultiLine: false,
    labelButton: "Se connecter",
  },
];

const FormLogin = () => {
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location: any = useLocation();
  const from = location.state?.from?.pathname || "/";

  const initialValues = {
    email: "",
    password: "",
  };

  const [userInfo, setUserInfos] = useState<IUser>(initialValues);

  const { postQuery } = AxiosFunction();

  const validationShema = Yup.object().shape({
    email: Yup.string()
      .email("Votre e-mail n'est pas valide")
      .required("Merci de remplir l'e-mail"),
    password: Yup.string()
      .min(6, "Le mot de passe est trop court")
      .max(50, "Le mot de passe est trop long")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*#?&\/]{6,50}$/,
        "Le mot de passe doit contenir une majuscule, une minuscule, et un nombre."
      )
      .required("Merci de remplir le mot de passe"),
  });
  const handleSubmit = useCallback(
    (values: FormikValues, callback: any) => {
      const postData = { ...values };

      postQuery(LOGIN_URL, postData)
        .then((response: AxiosResponse) => {
          const accessToken = response.data.accessToken;
          const role = response.data.idRole;
          
          setUserInfos(response.data);
          setAuth?.({ role, accessToken });
          navigate(from, { replace: true });
        })
        .catch((error: AxiosError) => {
          toast.error(`${error.response?.data}`, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            toastId: "submit-dog-file-error",
          });
          return callback();
        })
        .finally(callback);
    },
    [postQuery, from, navigate, setAuth]
  );

  //pour la checkbox
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const togglePersist = () => {
    setPersist?.(!persist);
  };

  useEffect(() => {
    if (persist !== undefined) {
      localStorage.setItem("persist", persist.toString()); // store in localstorage at persist state change
    }
  }, [persist]);

  const { renderForm } = useFormBuilder(
    validationShema,
    userInfo,
    userFormFields,
    { submit: handleSubmit }
  );
  return (
    <>
      <Grid textAlign="center" item xs={12} pt={5}>
        <Typography
          sx={{
            color: "#0FC2C0",
            fontWeight: "bold",
          }}
          variant="h3"
        >
          Content de vous revoir !
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "#035A5A", fontWeight: "bold" }}
        >
          Connectez-vous pour accéder à votre compte
        </Typography>
      </Grid>
      {renderForm}
      <Grid item textAlign="center" xs={12} mb={5}>
        <FormControlLabel
          control={
            <Checkbox
              id="persist"
              onChange={togglePersist}
              checked={persist}
              {...label}
              size="small"
              sx={{
                color: "#0FC2C0",
                "&.Mui-checked": {
                  color: "#0FC2C0",
                },
              }}
            />
          }
          label="Se souvenir de moi"
        />
        <Button
          variant="text"
          component={Link}
          to="/resetpassword"
          sx={{
            textTransform: "none",
            "&:hover": {
              backgroundColor: "transparent",
              textDecoration: "underline",
            },
          }}
        >
          Mot de passe oublié ?
        </Button>
      </Grid>
      <Grid container direction="column" justifyContent="center" mb={8}>
        <Grid
          item
          sx={{
            borderTop: 1.5,
            borderColor: "#D6D6D6",
            width: "80%",
            marginX: "auto",
          }}
        ></Grid>
        <Grid item xs={0} mt={5} textAlign="center" sx={{ width: "100%" }}>
          <Typography
            mb={3}
            variant="h6"
            sx={{
              color: "#023535",
              fontWeight: "bold",
            }}
          >
            Besoin d'un compte client ?
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="/register"
            sx={{
              width: {xs: "60%", sm:"50%", md: "35%", lg:"20%"},
              paddingY: 1.5,
              backgroundColor: "#0FC2C0",
              textTransform: "none",
              fontWeight: "bold",
              fontSize: 16,
              borderRadius: 5,
              "&:hover": {
                opacity: 0.9,
                backgroundColor: "#0FC2C0",
              },
            }}
          >
            Inscription
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default FormLogin;
