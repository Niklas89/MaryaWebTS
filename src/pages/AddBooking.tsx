import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AxiosFunction } from "../api/AxiosFunction";
import { AxiosResponse } from "axios";
import FormAddBooking from "../components/form/FormAddBooking";
import { Container, Typography } from "@mui/material";

const AddBooking = () => {
  const [service, setService] = useState<string>();
  const { id } = useParams();
  const { getQuery } = AxiosFunction();

  useEffect(() => {
    getQuery(`service/category/${id}`).then((res: AxiosResponse) => {
      setService(res.data.name);
    });
  }, [id]);

  return (
    <Container maxWidth={false}>
      <Typography variant="h3" textAlign="center" sx={{ fontWeight: "bold", color: "#035A5A" }} mt={5}>
        {service}
      </Typography>
      <FormAddBooking />
    </Container>
  );
};

export default AddBooking;
