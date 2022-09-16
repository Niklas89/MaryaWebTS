import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

// RequireAuth component can protect any child component that are nested inside of it
const RequireAuth = ({ allowedRoles }: any) => {
    const { auth } = useAuth();
    const location = useLocation();
    
    useEffect(() => {
        if(auth?.role == undefined)
            console.log("Cookie: " + Cookies.get("email"));

        console.log(auth?.role);
        console.log(auth);
    }, [])

    return ( 
        allowedRoles?.find((role: any) => role === auth?.role)
            ? <Outlet /> // Outlet component represents any child component of RequireAuth component
            : auth?.email
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
                
    );
}

export default RequireAuth;