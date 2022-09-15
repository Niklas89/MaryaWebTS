import { Dispatch, SetStateAction } from "react";

export interface IUserData {
    email?: string
    pwd?: string
    role?: number
    accessToken?: string
    auth?: {email?: string
        pwd?: string
        role?: number
        accessToken?: string}
    setAuth?: Dispatch<SetStateAction<IUserData>>
}

export type AuthContextType = {
    auth?: {email?: string
        pwd?: string
        role?: number
        accessToken?: string};
    setAuth?: (auth: IUserData) => void;
    //updateTodo: (id: number) => void;
  }; 