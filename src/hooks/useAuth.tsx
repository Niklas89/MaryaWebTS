import Cookies from "js-cookie";
import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider";


// global auth state to use throughout the application globally
const useAuth = () => { 
    const { auth } = useContext(AuthContext);
    useDebugValue(auth, auth => auth?.email ? "Logged In" : "Logged Out")
    console.log(auth?.email);
    if(auth?.role == undefined)
            console.log("Cookie: " + Cookies.get("email"));
    return useContext(AuthContext);
}

export default useAuth;