import { Typography } from '@mui/material';
import React from 'react';
import FormBooking from '../components/booking/FormBooking';

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
            <FormBooking />
        </div>
    );
};

export default BookingService;