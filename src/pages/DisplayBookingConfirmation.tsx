import { Container, Typography } from "@mui/material";
import DisplayBooking from "../components/booking/DisplayBooking";

const DisplayBookingConfirmation = () => {
  return (
    <Container maxWidth={false}>
      <Typography
        textAlign="center"
        mt={3}
        sx={{
          color: "#0CABA8",
          fontWeight: "bold",
        }}
        variant="h4"
      >
        Récapitulatif de ma réservation
      </Typography>
      <DisplayBooking />
    </Container>
  );
};

export default DisplayBookingConfirmation;
