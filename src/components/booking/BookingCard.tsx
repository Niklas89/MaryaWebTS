import {
  Button,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { IBooking } from "../../interfaces/IBooking";
import { dateParser } from "../Utils";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TodayIcon from "@mui/icons-material/Today";
import EuroIcon from "@mui/icons-material/Euro";
import LayersIcon from "@mui/icons-material/Layers";
import CommentIcon from "@mui/icons-material/Comment";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import WarningIcon from "@mui/icons-material/Warning";
import { Link } from "react-router-dom";
import moment from "moment";
import { date } from "yup";

const BookingCard = ({ data }: IBooking) => {
  const [serviceName, setServiceName] = useState<string>();
  // const [idBooking, setIdBooking] = useState<number>();
  // const [dateResult, setDateResult] = useState<boolean>();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    // setIdBooking(data?.id);
    if (!data?.message) {
      const idService = data?.idService?.toString();
      axios({
        method: "get",
        url: `/service/${idService}`,
      }).then((res) => {
        setServiceName(res.data.name);
      });
    }
    // if (data?.appointmentDate) {
    //     timestampAppointment = new Date(dateParser(data?.appointmentDate)).getTime();
    //     setDateResult(timestampAppointment > Date.now());
    // }
  }, [data?.message]);

  const deleteBooking = (id: number | undefined) => {
    axiosPrivate
      .patch(`/booking/cancel/${id}`)
      .then(() => window.location.reload());
  };
  let description;
  if (data?.description) {
    description = (
      <ListItem>
        <ListItemIcon>
          <CommentIcon />
        </ListItemIcon>
        <ListItemText primary={`${data?.description}`} />
      </ListItem>
    );
  }
  let isPaid;
  let warning;
  if (!data?.isPaid === true) {
    const id = "/booking/confirmation/" + data?.id;
    warning = (
      <ListItem
        sx={{
          marginTop: 2,
          marginBottom: 2,
          textAlign: "center",
          borderRadius: "11px",
          backgroundColor: "#DBF227",
          fontWeight: "bold",
        }}
      >
        <Typography
          textAlign="center"
          sx={{
            color: "#023535",
            backgroundColor: "#DBF227",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
        >
          <WarningIcon
            sx={{
              fontSize: 30,
              color: "wait",
            }}
          />{" "}
          Attention prestation impayée.
        </Typography>
      </ListItem>
    );
    isPaid = (
      <ListItemButton
        component="a"
        href={id}
        sx={{
          color: "#023535",
          backgroundColor: "#DBF227",
          fontWeight: "bold",
          textAlign: "center",
          borderRadius: "5px",
          "&:hover": {
            backgroundColor: "#DBF227",
          },
        }}
      >
        <ListItemText
          sx={{
            color: "#023535",
            backgroundColor: "#DBF227",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
          primary="Payer"
        />
      </ListItemButton>
    );
  }
  return (
    <>
      {data?.message ? (
        <Typography
          variant="body1"
          textAlign="center"
          sx={{
            color: "#023535",
            backgroundColor: "#DBF227",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
        >
          {data?.message}
        </Typography>
      ) : (
        <Card
          sx={{
            backgroundColor: "#0FC2C0",
            color: "white",
            minHeight: "auto",
          }}
        >
          <CardHeader title="Réservation" sx={{ paddingBottom: 0 }} />
          <CardContent sx={{ paddingTop: 0 }}>
            <List>
              {warning}
              <ListItem>
                <ListItemIcon>
                  <TodayIcon />
                </ListItemIcon>
                <ListItemText
                  primary={`Le ${dateParser(data?.appointmentDate)}`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LayersIcon />
                </ListItemIcon>
                <ListItemText primary={`${serviceName}`} />
              </ListItem>
              {data?.nbHours && (
                <ListItem>
                  <ListItemIcon>
                    <AccessTimeIcon />
                  </ListItemIcon>
                  <ListItemText primary={`${data?.nbHours} heures`} />
                </ListItem>
              )}
              <ListItem>
                <ListItemIcon>
                  <EuroIcon />
                </ListItemIcon>
                <ListItemText primary={`${data?.totalPrice} €`} />
              </ListItem>
              {description}
              {!data?.accepted && (
                <>
                  <ListItem>
                    {isPaid}
                    <ListItemButton
                      component="button"
                      onClick={() => {
                        deleteBooking(data?.id);
                      }}
                      sx={{
                        backgroundColor: "#1B4F4F",
                        textAlign: "center",
                        borderRadius: "5px",
                        marginLeft: "15px",
                        marginRight: "15px",
                        "&:hover": {
                          backgroundColor: "#023535",
                        },
                      }}
                    >
                      <ListItemText primary="Supprimer" />
                    </ListItemButton>
                  </ListItem>
                </>
              )}
            </List>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default BookingCard;
