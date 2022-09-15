import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";

// RequireAuth component can protect any child component that are nested inside of it
//const RequireAuth = ({ allowedRoles }: any) => {
    const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    
    useEffect(() => {
        console.log(auth?.role);
    }, [])

    return ( 
        // allowedRoles?.find((role: any) => role === auth?.role)
        allowedRoles?.find(role => role === auth?.role)
            ? <Outlet /> // Outlet component represents any child component of RequireAuth component
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
                
    );
}

export default RequireAuth;