import { Card, CardContent, Typography } from '@mui/material';
import { AxiosResponse } from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AxiosFunction } from '../../api/AxiosFunction';
import { IBooking } from '../../interfaces/IBooking';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ScheduleIcon from '@mui/icons-material/Schedule';
import EuroIcon from '@mui/icons-material/Euro';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import moment from 'moment';

const FormBooking = () => {
    const { id } = useParams();
    const { getQuery } = AxiosFunction();
    const [booking, setBooking] = useState<IBooking>()

    const getBookingInfos = useCallback(() => {
        getQuery(`booking/${id}`)
            .then((res: AxiosResponse) => {
                setBooking({
                    nbHours: res.data.nbHours,
                    totalPrice: res.data.totalPrice,
                    appointmentDate: res.data.appointmentDate,
                })
            })
    }, [getQuery])

    useEffect(() => {
        getBookingInfos();
    }, [booking, getBookingInfos])

    const hour = moment(booking?.appointmentDate).format('LT')
    const date = moment(booking?.appointmentDate).format('Do MMMM YYYY')

    return (
        <div>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ mb: 1.5 }}>
                        <RoomServiceIcon /> : Prestation
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
                </CardContent>
            </Card>
        </div>
    );
};

export default FormBooking;