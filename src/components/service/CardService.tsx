import { Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';
import { IService } from '../../interfaces/IService';

const CardService = () => {
    const [services, setServices] = useState<Array<object>>();
    const { id } = useParams();

    useEffect(() => {
        axios({
            method: "get",
            url: `/service/by-category/${id}`
        })
            .then((res: AxiosResponse) => setServices(res.data))
    }, []);

    console.log(services);

    return (
        <Container>
            {
                services?.map((service: IService) => {
                    return (<Grid key={service?.id} container>
                        <Typography>
                            {service?.name}
                        </Typography>
                        <Typography>
                            {service?.price} €
                        </Typography>
                    </Grid>
                )})
            }
        </Container>
    );
};

export default CardService;