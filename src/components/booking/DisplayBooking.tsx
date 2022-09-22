import { Card, CardContent, Typography } from '@mui/material';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AxiosFunction } from '../../api/AxiosFunction';
import { IBooking } from '../../interfaces/IBooking';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ScheduleIcon from '@mui/icons-material/Schedule';
import EuroIcon from '@mui/icons-material/Euro';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import PersonIcon from '@mui/icons-material/Person';
import moment from 'moment';
import { IUser } from '../../interfaces/IUser';
import { IService } from '../../interfaces/IService';


const DisplayBooking = () => {
    const { id } = useParams();
    const { getQuery } = AxiosFunction();
    const [booking, setBooking] = useState<IBooking>();
    const [userProfile, setUserProfile] = useState<IUser>();
    const [service, setService] = useState<IService>();

    useEffect(() => {
        getQuery(`booking/${id}`)
            .then((res: AxiosResponse) => {
                setBooking({
                    nbHours: res.data.nbHours,
                    totalPrice: res.data.totalPrice,
                    appointmentDate: res.data.appointmentDate,
                    idService: res.data.idService,
                })
            })
    }, [])

    useEffect(() => {
        if (booking) {
            getQuery(`service/${booking?.idService}`).then((res: AxiosResponse) => {
                setService({
                    name: res.data.name,
                })
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

    //Avoir si on garde
    const nbHoursTypo = (valueHours: number) => {
        if (valueHours !== null) {
            < Typography sx={{ mb: 1.5 }}>
                <RoomServiceIcon /> : (booking?.nbHours)
            </Typography >
        }
    }

    //TODO a refaire
    const hour = moment(booking?.appointmentDate).format('LT')
    const date = moment(booking?.appointmentDate).format('Do MMMM YYYY')

    return (
        <div>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ mb: 1.5 }}>
                        <PersonIcon /> : {userProfile?.lastName + " " + userProfile?.firstName}
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
                    <Typography sx={{ mb: 1.5 }}>
                        <EuroIcon /> : {booking?.totalPrice}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }}>
                        <EuroIcon /> : nombre d'heure ?
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default DisplayBooking;