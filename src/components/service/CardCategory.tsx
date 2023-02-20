import {
  CardHeader,
  Grid,
  Card,
  CardMedia,
  Box,
  Typography,
} from "@mui/material";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import { ICategory } from "../../interfaces/ICategory";

const GETCATEGORY_URL = "/service/category";

const CardCategory = () => {
  const [categories, setCategories] = useState<Array<object>>();

  const colorArray: Array<string> = [
    "#0FC2C0",
    "#035A5A",
    "#4ABADF",
    "#008F8C",
    "#023535",
    "#3CAC6B",
  ];

  useEffect(() => {
    axios({
      method: "get",
      url: GETCATEGORY_URL,
    }).then((res: AxiosResponse) => setCategories(res.data));
  }, []);

  return (
    <>
      <Typography
        sx={{
          alignContent: "center",
          color: "#0FC2C0",
          fontWeight: "bold",
        }}
        variant="h3"
      >
        Nos services
      </Typography>
      <Grid
        container
        textAlign="center"
        columnSpacing={2}
        rowSpacing={3}
        justifyContent="center"
        sx={{
          width: 0.9,
          margin: "10px auto 40px auto",
        }}
      >
        {categories?.map((category: ICategory, index: number) => {
          return (
            <Grid item key={category.id} sm={8} md={6} lg={4}>
              <Card
                component={Link}
                to={`/booking/create/${category.id}`}
                sx={{
                  backgroundColor: colorArray[index],
                  display: "flex",
                  flexDirection: "column",
                  padding: "5px 10px",
                  textDecoration: "none",
                  "&:hover": { transform: "scale(1.02)" },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  <CardHeader
                    title={category.name}
                    sx={{
                      color: "white",
                    }}
                  />
                  <CardMedia
                    component="img"
                    sx={{
                      maxHeight: 220,
                      maxWidth: 220,
                      objectFit: "contain",
                    }}
                    image={`./assets/img/categorie/${category.name}.png`}
                    alt={`${category.name}`}
                  />
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default CardCategory;
