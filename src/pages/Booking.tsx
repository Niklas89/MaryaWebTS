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

  let count1 = 0;
  let count2 = 0;

  useEffect(() => {
    const promise1 = axiosPrivate
      .get("/client/booking/future/false")
      .then((res) => {
        if (res.data !== null) {
          res.data.bookings.map((booking: IBooking) => {
            console.log("test1");
            if (!booking.isPaid) {
              count1 += 1;
            }
          });
        }
      });
    const promise2 = axiosPrivate
      .get("/client/booking/future/true")
      .then((res) => {
        if (res.data !== null) {
          res.data.bookings.map((booking: IBooking) => {
            console.log("test2");
            if (!booking.isPaid) {
              count2 += 1;
            }
          });
        }
      });

    Promise.all([promise1, promise2]).then(() => {
      setBookingNotPaid(count1 + count2);
      setCountDone(true);
      console.log(count1, count2);
      
    });
  }, []);

  useEffect(() => {
    countDone &&
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
          present={true}
          future={false}
          past={false}
          accepted={true}
        />
        <GetBooking
          present={true}
          future={false}
          past={false}
          accepted={false}
        />
      </Container>
      <ToastContainer />
    </>
  );
};

export default Booking;
