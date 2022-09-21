import { ReactNode } from "react"

export interface IBooking {
    accepted?: boolean,
    appointmentDate?: string,
    description?: string,
    nbHours?: number,
    totalPrice?: number,
    idService?: number,
    data?: {
        accepted?: boolean,
        appointmentDate?: string,
        description?: string,
        nbHours?: number,
        totalPrice?: number,
        idService?: number,
        message?: string
    },
}

export interface IGetBooking {
    present?: boolean,
    past?: boolean,
    future?: boolean,
    accepted?: boolean
    props?: {
        present?: boolean,
        past?: boolean,
        future?: boolean,
        accepted?: boolean
    }
}