import { Field, FormikProvider, FormikValues, useFormik } from "formik";
import React, { useCallback, useMemo } from "react";
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import styled from "@emotion/styled";
import { Button, Grid, ButtonProps, InputLabel, TextField, Typography, FormControl, MenuItem, Select, } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const LoginButton = styled(Button)<ButtonProps>(() => ({
    backgroundColor: "#023535",
    "&:hover": {
        backgroundColor: "#023535",
    }
}));

export interface IMenuItem {
    value: any;
    label: string | number;
}

export interface FormFieldType {
    name: any;
    field: any;
    label?: string;
    attributes?: object;
    values?: FormikValues[];
    isMultiLine?: boolean;
    menuItems?: IMenuItem[];
    title?: string;
    type?: string;
}

export function useFormBuilder(
    schema: any,
    defaultValues: any,
    formFields: FormFieldType[],
    handleFormCallback?: {
        change?: any;
        submit?: any;
    },
) {
    const formik = useFormik({
        initialValues: defaultValues,
        validationSchema: schema,
        onSubmit: (values) => handleFormSubmit(values),
        enableReinitialize: true
    })
    const handleFormSubmit: any = useCallback((values: FormikValues) => {
        if (handleFormCallback?.submit && typeof handleFormCallback.submit === 'function') {

            handleFormCallback.submit(values, () => formik.setValues);
        }

    }, [formik.setValues, handleFormCallback]);

    const renderField = (item: FormFieldType) => {

        const menuLabel = (item?.menuItems ? <InputLabel id={item.name} key={item.name + "_menu_label"}>{item.label}</InputLabel> : null)
        /*const radioButton = (
            item?.b
        )*/
        const title = (item?.title ? <Grid
            key={item.name + '_title'}
            item
            lg={12}
            md={12}
            sm={12}
            xs={12}
        ><Typography variant="h4" my={5}>{item.title}</Typography></Grid> : null)

        return (
            <React.Fragment key={item.name + 'fragment'}>
                {title}
                <Grid
                    key={item.name}
                    p={3}
                    item
                    {...(item.field === TextField && item?.isMultiLine ? {
                        lg: 10,
                        md: 10,
                        sm: 10,
                        xs: 10
                    } : { lg: 5, md: 5, sm: 12, xs: 12 })}
                >
                    <FormControl key={item.name + 'form_control'} fullWidth sx={{ m: 1 }}>
                        {menuLabel}
                        {item.field === DateTimePicker ?
                            <DateTimePicker
                                key={item.name + '_input'}
                                renderInput={(params) => (
                                    <TextField
                                        id={item.name}
                                        error={Boolean(formik.touched.birthday && formik.errors.birthday)}
                                        label={item.label}
                                        name={item.name}
                                        fullWidth
                                        {...params}
                                    />
                                )}
                                value={formik.values[item.name]}
                                onChange={(value) => {
                                    return formik.setFieldValue(item.name, value, true)
                                }}
                            />
                            :
                            <Field
                                id={item.name}
                                key={item.name + '_field'}
                                {...(item.label ? { label: item.label } : {})}
                                name={item.name}
                                {...(item.type === "password" ? { component: item.field, type: item.type } : item.type ? { type: item.type } : { component: item.field })}
                                {...(item.isMultiLine ? { multiline: true, rows: 4 } : {})}
                                {...((item.field === Select) ? {
                                    onChange: (value: any) => {
                                        return formik.setFieldValue(item.name, value.target?.value)
                                    }
                                } : {
                                    onChange: formik.handleChange,
                                    onBlur: formik.handleBlur
                                })}
                                {...({ value: formik.values[item.name] })}
                                {...({ error: Boolean(formik.errors[item.name] && formik.touched[item.name]) })}
                                {...(item.field === TextField && formik.errors[item.name] && formik.touched[item.name] ? { helperText: formik.errors[item.name] } : {})}
                                {...(item.attributes)}
                            >
                                {item?.menuItems?.map((menuItem: IMenuItem, index: number) => {
                                    return (
                                        <MenuItem key={index}
                                            id={menuItem.value + '_' + index}
                                            value={menuItem.value}>{menuItem.label}</MenuItem>
                                    )
                                })}
                            </Field>
                        }
                    </FormControl>
                </Grid>
            </React.Fragment>


        )
    }

    const renderForm = useMemo(() => {
        return (

            <FormikProvider key={"formik"} value={formik}>
                <ToastContainer />
                <form onSubmit={formik.handleSubmit} key={"formik_form"} onChange={formik.handleChange} >

                    <Grid container p={4} direction="row" justifyContent="space-evenly" alignItems="center">
                        {formFields.map((item) => {
                            return renderField(item)
                        })}
                    </Grid>
                    <Grid container p={4} direction="row" justifyContent="space-evenly" alignItems="center">
                        <LoginButton
                            name={"submit"}
                            id={"submit"}
                            key={"submit_button"}
                            variant={"contained"}
                            endIcon={<DoneOutlineIcon />}
                            type="submit"
                        >
                            Enregistrer
                        </LoginButton>
                    </Grid>

                </form>
            </FormikProvider >

        );
    }, [formFields, formik]);

    return { handleFormSubmit, formik, renderForm }

}