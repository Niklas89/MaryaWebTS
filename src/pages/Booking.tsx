import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import GetBooking from "../components/booking/GetBooking";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { IBooking } from "../interfaces/IBooking";

const Booking = () => {
  const [bookingNotPaid, setBookingNotPaid] = useState<number>(0);
  const [countDone, setCountDone] = useState<boolean>(false);

  const axiosPrivate = useAxiosPrivate();

  let countFutureFalse = 0;
  let countFutureTrue = 0;

  useEffect(() => {
    const promiseFutureFalse = axiosPrivate
      .get("/client/booking/future/false")
      .then((res) => {
        if (res.data !== null) {
          res.data.bookings.map((booking: IBooking) => {
            if (!booking.isPaid) {
              countFutureFalse += 1;
            }
          });
        }
      });
    const promiseFutureTrue = axiosPrivate
      .get("/client/booking/future/true")
      .then((res) => {
        if (res.data !== null) {
          res.data.bookings.map((booking: IBooking) => {
            if (!booking.isPaid) {
              countFutureTrue += 1;
            }
          });
        }
      });

    Promise.all([promiseFutureFalse, promiseFutureTrue]).then(() => {
      setBookingNotPaid(countFutureFalse + countFutureTrue);
      setCountDone(true);
    });
  }, []);

  useEffect(() => {
    countDone &&
      bookingNotPaid >= 1 &&
      toast.error(
        `Vous avez ${bookingNotPaid} ${
          bookingNotPaid > 1 ? "prestations" : "prestation"
        } ${bookingNotPaid > 1 ? "impayées" : "impayée"}.`,
        {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          toastId: "submit-dog-file-error",
        }
      );
  }, [countDone]);

  return (
    <>
      <Container maxWidth={false}>
        <Typography
          textAlign="left"
          mt={3}
          sx={{
            color: "#035A5A",
            fontWeight: "bold",
          }}
          variant="h3"
        >
          Mes réservations
        </Typography>
        <GetBooking
          accepted={true}
        />
        <GetBooking
          accepted={false}
        />
      </Container>
      <ToastContainer />
    </>
  );
};

export default Booking;
