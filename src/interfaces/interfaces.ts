import { Dispatch, SetStateAction } from "react";

export interface IUserData {
    user?: string
    pwd?: string
    role?: number
    accessToken?: string
    auth?: {user?: string
        pwd?: string
        role?: number
        accessToken?: string}
    setAuth?: Dispatch<SetStateAction<IUserData>>
}

export type AuthContextType = {
    auth?: IUserData;
    setAuth?: (auth: IUserData) => void;
    //updateTodo: (id: number) => void;
  };

export interface StringArray {
    length: number;
    [index: number]: string;
}