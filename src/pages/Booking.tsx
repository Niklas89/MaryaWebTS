import { Typography } from "@mui/material";
import GetBooking from "../components/booking/GetBooking";

const Booking = () => {
    return (
        <>
            <Typography textAlign="center" mt={3} sx={{
                color: "#0CABA8",
                fontWeight: "bold"
            }}
                variant="h3">
                Mes réservations
            </Typography>
            <GetBooking present={true} future={false} past={false} accepted={true} />
            <GetBooking present={true} future={false} past={false} accepted={false} />
        </>
    );
};

export default Booking;