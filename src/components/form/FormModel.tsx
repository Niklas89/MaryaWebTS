import { Field, FormikProvider, FormikValues, useFormik } from "formik";
import React, { useCallback, useMemo } from "react";
import Grid from "@mui/material/Grid";
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { DateTimePicker } from "@mui/x-date-pickers";
import { PhotoCamera } from "@mui/icons-material";

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
                    item
                    {...(item.field === TextField && item?.isMultiLine ? {
                        lg: 10,
                        md: 10,
                        sm: 10,
                        xs: 10
                    } : { lg: 4, md: 6, sm: 10, xs: 10 })}
                >
                    <FormControl key={item.name + 'form_control'} fullWidth sx={{ m: 1 }}>
                        {menuLabel}
                        {item.type === 'file' ?
                            <Button variant="outlined" sx={{ py: '14px' }} component="label"
                                size="large" startIcon={<PhotoCamera />}>
                                Image de profil
                            </Button>
                            :
                            item.field === DateTimePicker ?
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
                                    {...(item.type ? { type: item.type } : { component: item.field })}
                                    {...(item.isMultiLine ? { multiline: true, rows: 4 } : {})}
                                    {...((item.field === Select) ? {
                                        onChange: (value: any) => {
                                            return formik.setFieldValue(item.name, value.target?.value)
                                        }
                                    } : {
                                        onChange: formik.handleChange,
                                        onBlur: formik.handleBlur
                                    })}
                                    {...(item.field === TextField && formik.errors[item.name] && formik.touched[item.name] ? { helperText: formik.errors[item.name] } : {})}
                                    //{...(item.type !== undefined ? { error: Boolean(formik.errors[item.name] && formik.touched[item.name]) } : {})}
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
                <form onSubmit={formik.handleSubmit} key={"formik_form"} onChange={formik.handleChange} >
                    <Grid container spacing={5} key="grid" direction="row" justifyContent="space-around">
                        {formFields.map((item) => {
                            return renderField(item)
                        })}
                    </Grid>
                    <Box key={"button_controller_box"} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            id={'cancel'}
                            key={"cancel_button"}
                            name={"cancel"}
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                            onClick={() => formik.resetForm()}
                            sx={{ mt: 3, ml: 1 }}
                        >
                            Annuler
                        </Button>

                        <Button
                            name={"submit"}
                            id={"submit"}
                            key={"submit_button"}
                            variant={"contained"}
                            endIcon={<SendIcon />}
                            type="submit"
                            sx={{ mt: 3, ml: 1 }}
                        >
                            Enregistrer
                        </Button>
                    </Box>
                </form>
            </FormikProvider >
        );
    }, [formFields, formik]);

    return { handleFormSubmit, formik, renderForm }
}
