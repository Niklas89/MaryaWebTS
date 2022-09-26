import { Alert, Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import { AxiosResponse } from 'axios';
import { useEffect, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AxiosFunction } from '../../api/AxiosFunction';
import { IBooking } from '../../interfaces/IBooking';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ScheduleIcon from '@mui/icons-material/Schedule';
import EuroIcon from '@mui/icons-material/Euro';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import ForumIcon from '@mui/icons-material/Forum';
import moment from 'moment';
import { IUser } from '../../interfaces/IUser';
import { IService } from '../../interfaces/IService';
import { toast } from "react-toastify";


const DisplayBooking = () => {
    const { id } = useParams();
    const { getQuery, postQuery, patchQuery } = AxiosFunction();
    const [booking, setBooking] = useState<IBooking>();
    const [userProfile, setUserProfile] = useState<IUser>();
    const [service, setService] = useState<IService>();
    const [message, setMessage] = useState("");

    const checkout = () => {
        const postData = { bookingId: booking?.id, priceId: service?.priceId, nbHours: booking?.nbHours };

        postQuery("/checkout/create-stripe-session", postData).then((response: AxiosResponse) => {
            window.location.href = response.data;
        }).catch(() => {
            toast.error("Une erreur est survenue lors de la redirection vers la page de paiement sécurisée.", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                toastId: "submit-error"

            });
        })
    };

    useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    
        if (query.get("success")) {
            const postData = { bookingId: id };
            patchQuery(`booking/paid/${id}`, postData)
                .then((res: AxiosResponse) => {
                    setMessage(
                        "Votre réservation a été payé avec succès. Le service a été envoyé à nos partenaires. Vous recevrez une confirmation par email dès qu'un partenaire aura accepté votre réservation."
                    );
                }).catch(() => {
                    toast.error("Une erreur est survenue lors du changement de l'état de votre réservation à payé.", {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        toastId: "submit-error"
        
                    });
                });
        }

        getQuery(`booking/${id}`)
            .then((res: AxiosResponse) => {
                setBooking({
                    id: res.data.id,
                    nbHours: res.data.nbHours,
                    totalPrice: res.data.totalPrice,
                    appointmentDate: res.data.appointmentDate,
                    idService: res.data.idService,
                    description: res.data.description,
                });
            })
    }, [])

    useEffect(() => {
        if (booking) {
            getQuery(`service/${booking?.idService}`).then((res: AxiosResponse) => {
                setService({
                    name: res.data.name,
                    priceId: res.data.priceId
                });
            })
        }
    }, [booking])

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
                })
            })
        }
    }, [booking])

    const nbHoursTypo = () => {
        if (booking?.nbHours === 1) {
            return (
                < Typography sx={{ mb: 1.5 }}>
                    <TimelapseIcon /> : Pour {booking?.nbHours} Heure
                </Typography >)
        } else if (booking?.nbHours !== null) {
            return (
                < Typography sx={{ mb: 1.5 }}>
                    <TimelapseIcon /> : Pour {booking?.nbHours} Heures
                </Typography >)
        }
    }
    const desciptionTypo = () => {
        if (booking?.description !== null) {
            return (
                < Typography sx={{ mb: 1.5 }}>
                    <ForumIcon /> : {booking?.description}
                </Typography >)
        }
    }

    const hour = moment(booking?.appointmentDate).format('LT');
    const date = moment(booking?.appointmentDate).format('Do MMMM YYYY');

    return message ? (
        <div>
            <Alert severity="success">{message}</Alert>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ mb: 1.5 }}>
                        <PersonIcon /> : {userProfile?.lastName + " " + userProfile?.firstName}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }}>
                        <LocationOnIcon /> : {userProfile?.address + " " + userProfile?.postalCode + " " + userProfile?.city}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }}>
                        <SmartphoneIcon /> : {userProfile?.phone}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }}>
                        <RoomServiceIcon /> : {service?.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }}>
                        <CalendarMonthIcon /> : {date}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }}>
                        <ScheduleIcon /> : {hour}
                    </Typography>
                    {nbHoursTypo()}
                    <Typography sx={{ mb: 1.5 }}>
                        <EuroIcon /> : {booking?.totalPrice} euros TTC
                    </Typography>
                    {desciptionTypo()}
                </CardContent>
            </Card>
            </div> ) : (
        <div>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ mb: 1.5 }}>
                        <PersonIcon /> : {userProfile?.lastName + " " + userProfile?.firstName}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }}>
                        <LocationOnIcon /> : {userProfile?.address + " " + userProfile?.postalCode + " " + userProfile?.city}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }}>
                        <SmartphoneIcon /> : {userProfile?.phone}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }}>
                        <RoomServiceIcon /> : {service?.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }}>
                        <CalendarMonthIcon /> : {date}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }}>
                        <ScheduleIcon /> : {hour}
                    </Typography>
                    {nbHoursTypo()}
                    <Typography sx={{ mb: 1.5 }}>
                        <EuroIcon /> : {booking?.totalPrice} euros TTC
                    </Typography>
                    {desciptionTypo()}
                    <Grid container mb={5} ml={5} direction="row" justifyContent="left">
                        <Grid item xs={0} mt={1}>
                            <Button
                                        variant="contained"
                                        onClick={checkout}
                                        size="medium">
                                Payer en ligne
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    );
};

export default DisplayBooking;