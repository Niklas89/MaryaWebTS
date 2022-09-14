import { useContext, useDebugValue } from "react";
//import AuthContext from "../context/AuthProvider";
import { IUserData } from "../interfaces/interfaces";
import { createContext, useState } from "react";

const AuthContext = createContext<IUserData>({});

// global auth state to use throughout the application globally
const useAuth = () => { 
    const  auth  = useContext(AuthContext);
    useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out")
    return useContext(AuthContext);
}

export default useAuth;