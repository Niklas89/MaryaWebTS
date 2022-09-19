import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import CardCategory from "../components/service/CardCategory";
import SliderHome from "../components/SliderHome";
import axios from "../api/axios";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import useLogout from "../hooks/useLogout";

const LOGOUT_URL = "/logout"; // login endpoint in backend nodejs api

const Home = () => {
    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        // the backend api will delete the cookie that has the refreshToken, so that there will be no refreshToken
        navigate('/login');
    }

    return (
        <>
            <SliderHome />
            <CardCategory />
        </>
    )
}

export default Home
