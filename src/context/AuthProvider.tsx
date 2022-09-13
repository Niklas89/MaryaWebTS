import { createContext, useState } from "react";
import { IUserData } from "../interfaces/interfaces";

const AuthContext = createContext<any | IUserData>({});

interface props {
    children: JSX.Element | JSX.Element[]
}

export const AuthProvider = ({ children }: props) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;