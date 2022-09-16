import { Dispatch, SetStateAction } from "react";
import { IUser } from "./IUser";

export interface IUserData {
    id?: number
    email?: string
    pwd?: string
    role?: number
    accessToken?: string
    auth?: {
        email?: string
        pwd?: string
        role?: number
        accessToken?: string
    }
    setAuth?: Dispatch<SetStateAction<IUserData>>
    setPersist?: Dispatch<SetStateAction<boolean>> | Dispatch<any>
}

export type AuthContextType = {
    auth?: {
        id?: number
        email?: string
        role?: number
        accessToken?: string
    };

    persist?: boolean;
    setAuth?: (auth: IUserData) => void;
    setPersist?: (persist: boolean) => void;
    //updateTodo: (id: number) => void;
};

export interface StringArray {
    length: number;
    [index: number]: string;
}