import { Alert, Button, Grid, Typography } from "@mui/material";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AxiosFunction } from "../../api/AxiosFunction";
import { IBooking } from "../../interfaces/IBooking";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ScheduleIcon from "@mui/icons-material/Schedule";
import EuroIcon from "@mui/icons-material/Euro";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import ForumIcon from "@mui/icons-material/Forum";
import moment from "moment";
import { IUser } from "../../interfaces/IUser";
import { IService } from "../../interfaces/IService";
import { toast } from "react-toastify";

const DisplayBooking = () => {
  const { id } = useParams();
  const { getQuery, postQuery, patchQuery } = AxiosFunction();
  const [booking, setBooking] = useState<IBooking>();
  const [userProfile, setUserProfile] = useState<IUser>();
  const [service, setService] = useState<IService>();
  const [message, setMessage] = useState("");

  const checkout = () => {
    const postData = {
      bookingId: booking?.id,
      priceId: service?.priceId,
      nbHours: booking?.nbHours,
    };

    postQuery("/checkout/create-stripe-session", postData)
      .then((response: AxiosResponse) => {
        window.location.href = response.data;
        console.log(response.data);
      })
      .catch((err) => {
        toast.error(
          "Une erreur est survenue lors de la redirection vers la page de paiement sécurisée.",
          {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            toastId: "submit-error",
          }
        );
      });
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      const postData = { bookingId: id };
      patchQuery(`booking/paid/${id}`, postData)
        .then((res: AxiosResponse) => {
          setMessage(
            "Votre réservation a été payé avec succès. Le service a été envoyé à nos partenaires. Vous recevrez une confirmation par email dès qu'un partenaire aura accepté votre réservation."
          );
        })
        .catch((err) => {
          toast.error(
            "Une erreur est survenue lors du paiement de votre réservation.",
            {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              toastId: "submit-error",
            }
          );
        });
    }

    getQuery(`booking/${id}`).then((res: AxiosResponse) => {
      setBooking({
        id: res.data.id,
        nbHours: res.data.nbHours,
        totalPrice: res.data.totalPrice,
        appointmentDate: res.data.appointmentDate,
        idService: res.data.idService,
        description: res.data.description,
      });
    });
  }, []);

  useEffect(() => {
    if (booking) {
      getQuery(`service/${booking?.idService}`).then((res: AxiosResponse) => {
        setService({
          name: res.data.name,
          priceId: res.data.priceId,
        });
      });
    }
  }, [booking]);

  useEffect(() => {
    if (booking) {
      getQuery(`/client/profile/`).then((res: AxiosResponse) => {
        setUserProfile({
          lastName: res.data.lastName,
          firstName: res.data.firstName,
          address: res.data.client.address,
          city: res.data.client.city,
          postalCode: res.data.client.postalCode,
          phone: res.data.client.phone,
        });
      });
    }
  }, [booking]);

  const nbHoursTypo = () => {
    if (booking?.nbHours === 1) {
      return (
        <Grid container direction="row" alignItems="center" spacing={1}>
          <Grid item>
            <TimelapseIcon />
          </Grid>
          <Grid item>
            <Typography>{booking?.nbHours} heure</Typography>
          </Grid>
        </Grid>
      );
    } else if (booking?.nbHours !== null) {
      return (
        <Grid container direction="row" alignItems="center" spacing={1}>
          <Grid item>
            <TimelapseIcon />
          </Grid>
          <Grid item>
            <Typography>{booking?.nbHours} heures</Typography>
          </Grid>
        </Grid>
      );
    }
  };
  const desciptionTypo = () => {
    if (booking?.description !== null) {
      return (
        <Grid container direction="row" alignItems="center" spacing={1}>
          <Grid item>
            <ForumIcon />
          </Grid>
          <Grid item>
            <Typography>{booking?.description}</Typography>
          </Grid>
        </Grid>
      );
    }
  };

  const hour = moment(booking?.appointmentDate).format("LT");
  const date = moment(booking?.appointmentDate).format("Do MMMM YYYY");

  return message ? (
    <>
      <Alert severity="success" sx={{ marginY: 3 }}>
        {message}
      </Alert>
      <Grid
        container
        mt={3}
        mb={5}
        py={3}
        px={4}
        sx={{
          width: "60%",
          marginX: "auto",
          backgroundColor: "white",
          borderRadius: 12,
          boxShadow: 1,
        }}
      >
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ color: "#023535" }}
        >
          <Grid item xs={12} md={6}>
            <Grid container direction="row" alignItems="center" spacing={1}>
              <Grid item>
                <PersonIcon />
              </Grid>
              <Grid item>
                <Typography>
                  {userProfile?.lastName + " " + userProfile?.firstName}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container direction="row" alignItems="center" spacing={1}>
              <Grid item>
                <LocationOnIcon />
              </Grid>
              <Grid item>
                <Typography>
                  {userProfile?.address +
                    " " +
                    userProfile?.postalCode +
                    " " +
                    userProfile?.city}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container direction="row" alignItems="center" spacing={1}>
              <Grid item>
                <SmartphoneIcon />
              </Grid>
              <Grid item>
                <Typography>{userProfile?.phone}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container direction="row" alignItems="center" spacing={1}>
              <Grid item>
                <RoomServiceIcon />
              </Grid>
              <Grid item>
                <Typography>{service?.name}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container direction="row" alignItems="center" spacing={1}>
              <Grid item>
                <CalendarMonthIcon />
              </Grid>
              <Grid item>
                <Typography>{date}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container direction="row" alignItems="center" spacing={1}>
              <Grid item>
                <ScheduleIcon />
              </Grid>
              <Grid item>
                <Typography>{hour}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container direction="row" alignItems="center" spacing={1}>
              <Grid item>
                <EuroIcon />
              </Grid>
              <Grid item>
                <Typography>{booking?.totalPrice} euros TTC</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            {nbHoursTypo()}
          </Grid>
          <Grid item xs={12}>
            {desciptionTypo()}
          </Grid>
        </Grid>
      </Grid>
      <Grid container mb={3} sx={{ width: "100%", textAlign: "center" }}>
        <Grid item xs={12}>
          <Button
            component={Link}
            to="/booking"
            size="medium"
            sx={{
              width: { xs: "60%", sm: "50%", md: "35%", lg: "20%" },
              paddingY: 1.5,
              color: "white",
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
            Voir toutes mes réservations
          </Button>
        </Grid>
      </Grid>
    </>
  ) : (
    <>
      <Grid
        container
        mt={3}
        mb={5}
        py={3}
        px={4}
        sx={{
          width: "60%",
          marginX: "auto",
          backgroundColor: "white",
          borderRadius: 12,
          boxShadow: 1,
        }}
      >
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ color: "#023535" }}
        >
          <Grid item xs={12} md={6}>
            <Grid container direction="row" alignItems="center" spacing={1}>
              <Grid item>
                <PersonIcon />
              </Grid>
              <Grid item>
                <Typography>
                  {userProfile?.lastName + " " + userProfile?.firstName}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container direction="row" alignItems="center" spacing={1}>
              <Grid item>
                <LocationOnIcon />
              </Grid>
              <Grid item>
                <Typography>
                  {userProfile?.address +
                    " " +
                    userProfile?.postalCode +
                    " " +
                    userProfile?.city}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container direction="row" alignItems="center" spacing={1}>
              <Grid item>
                <SmartphoneIcon />
              </Grid>
              <Grid item>
                <Typography>{userProfile?.phone}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container direction="row" alignItems="center" spacing={1}>
              <Grid item>
                <RoomServiceIcon />
              </Grid>
              <Grid item>
                <Typography>{service?.name}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container direction="row" alignItems="center" spacing={1}>
              <Grid item>
                <CalendarMonthIcon />
              </Grid>
              <Grid item>
                <Typography>{date}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container direction="row" alignItems="center" spacing={1}>
              <Grid item>
                <ScheduleIcon />
              </Grid>
              <Grid item>
                <Typography>{hour}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container direction="row" alignItems="center" spacing={1}>
              <Grid item>
                <EuroIcon />
              </Grid>
              <Grid item>
                <Typography>{booking?.totalPrice} euros TTC</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            {nbHoursTypo()}
          </Grid>
          <Grid item xs={12}>
            {desciptionTypo()}
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              variant="contained"
              onClick={checkout}
              sx={{
                textAlign: "center",
                width: "100%",
                backgroundColor: "#1C4A4A",
                paddingY: 1.5,
                marginTop: 2,
                textTransform: "none",
                fontWeight: "bold",
                fontSize: 16,
                borderRadius: 5,
                "&:hover": {
                  backgroundColor: "#1C4A4A",
                  opacity: 0.9,
                },
              }}
            >
              Payer en ligne
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default DisplayBooking;
