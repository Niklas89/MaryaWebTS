import { CheckBox } from '@mui/icons-material';
import { Grid, Input, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { DateTimePicker } from '@mui/x-date-pickers';
import { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';
import { IService } from '../../interfaces/IService';
import { FormFieldType } from '../form/FormModel';

const formFileds: FormFieldType[] = [
    { name: "service", field: Input, label: "Service", isMultiLine: false },
    { name: "date", field: DateTimePicker, label: "Date de la prestation", isMultiLine: false }
]

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

    //console.log(services);

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
                    )
                })
            }
        </Container>
    );
};

export default CardService;