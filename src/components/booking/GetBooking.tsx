import { Button, ButtonGroup, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { IBooking, IGetBooking } from "../../interfaces/IBooking";
import BookingCard from "./BookingCard";
import "../../styles/Button.css";
import { toast, ToastContainer } from "react-toastify";

const GetBooking = (props: IGetBooking) => {
  const [bookings, setBookings] = useState<Array<object>>();
  const [futureModal, setFutureModal] = useState<boolean>(
    props.future ? props.future : false
  );
  const [pastModal, setPastModal] = useState<boolean>(
    props.past ? props.past : false
  );
  const [presentModal, setPresentModal] = useState<boolean>(
    props.present ? props.present : false
  );

  const axiosPrivate = useAxiosPrivate();

  const handleModals = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.id === "past") {
      setFutureModal(false);
      setPastModal(true);
      setPresentModal(false);
    } else if (e.currentTarget.id === "present") {
      setFutureModal(false);
      setPastModal(false);
      setPresentModal(true);
    } else if (e.currentTarget.id === "future") {
      setFutureModal(true);
      setPastModal(false);
      setPresentModal(false);
    }
  };

  useEffect(() => {
    if (futureModal) {
      axiosPrivate
        .get(`/client/booking/future/${props.accepted}`)
        .then((res) => {           
          if (res.data !== null) {
            setBookings(res.data.bookings);
          } else {
            setBookings([{ message: "Pas de prestation" }]);
          }
        });
    } else if (pastModal) {
      axiosPrivate.get(`/client/booking/past/${props.accepted}`).then((res) => {
        if (res.data !== null) {
          setBookings(res.data.bookings);
        } else {
          setBookings([{ message: "Pas de prestation" }]);
        }
      });
    } else if (presentModal) {
      axiosPrivate
        .get(`/client/booking/present/${props.accepted}`)
        .then((res) => {
          if (res.data !== null) {
            setBookings(res.data.bookings);
          } else {
            setBookings([{ message: "Pas de prestation" }]);
          }
        });
    }
  }, [presentModal, pastModal, futureModal]);

  return (
    <>
      <Grid
        container
        columnSpacing={2}
        rowSpacing={3}
        mb={3}
        mt={2}
        maxWidth="0.9"
        justifyContent="center"
        mx="auto"
      >
        <Grid item xs={12} textAlign="center">
          <Typography
            sx={{
              color: "#0CABA8",
              fontWeight: "bold",
            }}
            variant="h5"
          >
            {props.accepted === true ? "Acceptés" : "Non acceptés"}
          </Typography>
        </Grid>
        <Grid item xs={12} textAlign="center">
          <ButtonGroup aria-label="button group">
            <Button
              id="past"
              onClick={handleModals}
              className={pastModal ? "selected" : "notSelected"}
            >
              Passées
            </Button>
            <Button
              id="present"
              onClick={handleModals}
              className={presentModal ? "selected" : "notSelected"}
            >
              Du jour
            </Button>
            <Button
              id="future"
              onClick={handleModals}
              className={futureModal ? "selected" : "notSelected"}
            >
              A venir
            </Button>
          </ButtonGroup>
        </Grid>
        {
          bookings?.map((booking: IBooking, index: number) => {
            return (
              <Grid item xs={10} md={6} lg={4} key={index}>
                <BookingCard data={booking} />
              </Grid>
            );
          })!
        }
      </Grid>
    </>
  );
};

export default GetBooking;
