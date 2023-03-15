import { Button, ButtonGroup, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { IBooking, IGetBooking } from "../../interfaces/IBooking";
import BookingCard from "./BookingCard";
import "../../styles/Button.css";

const GetBooking = (props: IGetBooking) => {
  const [bookings, setBookings] = useState<Array<object>>();
  const [modalSelected, setModalSelected] = useState<string>("present");

  const axiosPrivate = useAxiosPrivate();

  const handleModals = (e: React.MouseEvent<HTMLButtonElement>) => {
    setModalSelected(e.currentTarget.id);
  };

  useEffect(() => {
    modalSelected &&
      axiosPrivate
        .get(`/client/booking/${modalSelected}/${props.accepted}`)
        .then((res) => {
          if (res.data !== null) {
            setBookings(res.data.bookings);
          } else {
            setBookings([{ message: "Pas de prestation" }]);
          }
        });
  }, [modalSelected]);

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
              className={modalSelected === "past" ? "selected" : "notSelected"}
            >
              Passées
            </Button>
            <Button
              id="present"
              onClick={handleModals}
              className={
                modalSelected === "present" ? "selected" : "notSelected"
              }
            >
              Du jour
            </Button>
            <Button
              id="future"
              onClick={handleModals}
              className={
                modalSelected === "future" ? "selected" : "notSelected"
              }
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
