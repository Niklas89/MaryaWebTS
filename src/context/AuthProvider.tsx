import { createContext, useState } from "react";
import { IUserData, AuthContextType } from "../interfaces/interfaces";

const AuthContext = createContext<AuthContextType>({});

interface props {
    children: JSX.Element | JSX.Element[]
}

export const AuthProvider = ({ children }: props) => {
    const [auth, setAuth] = useState<IUserData>({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;