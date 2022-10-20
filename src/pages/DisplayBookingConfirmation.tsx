import { Typography } from "@mui/material";
import DisplayBooking from "../components/booking/DisplayBooking";

const DisplayBookingConfirmation = () => {
  return (
    <div>
      <Typography
        textAlign="center"
        mt={3}
        sx={{
          color: "#0CABA8",
          fontWeight: "bold",
        }}
        variant="h3"
      >
        Ma réservation
      </Typography>
      <DisplayBooking />
    </div>
  );
};

export default DisplayBookingConfirmation;
