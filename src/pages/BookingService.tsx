import { Typography } from '@mui/material';
import React from 'react';
import DisplayBooking from '../components/booking/DisplayBooking';
import FormBooking from '../components/booking/FormBooking';
//<DisplayBooking />

const BookingService = () => {
    return (
        <div>
            <Typography textAlign="center" mt={3} sx={{
                color: "#0CABA8",
                fontWeight: "bold"
            }}
                variant="h3">
                Ma réservation
            </Typography>
            <DisplayBooking />
            <FormBooking />
        </div>
    );
};

export default BookingService;