import { CardHeader, Grid, Typography, Card, CardContent, CardActions, Button, CardMedia, Box } from '@mui/material';
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "../../api/axios";
import { ICategory } from "../../interfaces/ICategory";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const GETCATEGORY_URL = "/service/category";

const CardCategory = () => {
    const [categories, setCategories] = useState<Array<object>>();
    const [color, setColor] = useState<String>();

    const colorArray: Array<string> = ["#0FC2C0", "#035A5A", "#008F8C", "#023535"];

    useEffect(() => {
        axios({
            method: "get",
            url: GETCATEGORY_URL
        })
            .then((res: AxiosResponse) => setCategories(res.data))
    }, []);

    return (
        <Grid container textAlign="center" columnSpacing={2} rowSpacing={3} justifyContent="center" sx={{
            width: 0.9,
            margin: "10px auto 40px auto"
        }}>
            {categories?.map((category: ICategory) => {
                return (
                    <Grid item key={category.id} sm={8} md={6} lg={4}>
                        <Card sx={{
                            backgroundColor: "#0FC2C0",
                            display: "flex",
                            flexDirection: "column",
                            padding: "5px 10px"
                        }}>
                            <Box sx={{
                                display: "flex",
                                justifyContent: "space-evenly"
                            }}>
                                <CardHeader
                                    title={category.name}
                                    sx={{
                                        color: "white"
                                    }}
                                />
                                <CardMedia
                                    component="img"
                                    sx={{
                                        maxHeight: 220,
                                        maxWidth: 220,
                                        objectFit: "contain"
                                    }}
                                    image={`./assets/img/${category.name}.png`}
                                    alt={`${category.name}`}
                                />
                            </Box>
                            <CardActions>
                                <Button
                                    sx={{
                                        color: "white"
                                    }}
                                    component={Link}
                                    to={`/service/${category.id}`}
                                    startIcon={<ArrowForwardIcon />}
                                >
                                    Reserver
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                )
            })}
        </Grid >
    );
};

export default CardCategory;