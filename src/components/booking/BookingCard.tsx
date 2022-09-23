import { Card, CardContent, CardHeader, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { IBooking } from "../../interfaces/IBooking";
import { dateParser } from "../Utils";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TodayIcon from "@mui/icons-material/Today";
import EuroIcon from "@mui/icons-material/Euro";
import LayersIcon from "@mui/icons-material/Layers";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { BorderAllRounded } from "@mui/icons-material";

const BookingCard = ({ data }: IBooking) => {
    const [serviceName, setServiceName] = useState<string>();

    useEffect(() => {
        if (!data?.message) {
            const idService = data?.idService?.toString();
            axios({
                method: "get",
                url: `/service/${idService}`
            })
                .then(res => {
                    setServiceName(res.data.name);

                })
        }
    })

    return (
        <>
            {
                data?.message ? (
                    <Typography variant="body1" textAlign="center" sx={{
                        color: "#023535",
                        backgroundColor: "#DBF227",
                        borderRadius: "5px",
                        fontWeight: "bold"
                    }}>
                        {data?.message}
                    </Typography>
                ) : (
                    <Card sx={{
                        backgroundColor: "#0FC2C0",
                        color: "white"
                    }} >
                        <CardHeader title="Réservation" />
                        <CardContent>
                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <TodayIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={`Le ${dateParser(data?.appointmentDate)}`} />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <LayersIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={`${serviceName}`} />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <AccessTimeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={`${data?.nbHours} heures`} />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <EuroIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={`${data?.totalPrice} €`} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={`${data?.description}`} />
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card >
                )
            }

        </>
    );
};

export default BookingCard;