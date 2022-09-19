import axios from "axios";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { axiosPrivate } from "./axios";

export const AxiosFunction = () => {

    const { auth } = useAuth();
    const accessToken = auth?.accessToken;
    const apiPath = "http://localhost:8080/api";


    function postQuery(path: string, data: object): Promise<any> {

        return axios.post(`${apiPath}/${path}`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true
        });
    }


    function patchQuery(path: string, data: object): Promise<any> {
        return axios.patch(`${path}`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/merge-patch+json",
            },
            withCredentials: true
        });
    }
    console.log(accessToken)
    function getQuery(path: string): Promise<any> {
        return axios.get(`${path}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true
        });
    }

    function deleteQuery(path: string): Promise<any> {
        return axios.delete(`${path}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true
        });
    }

    return { getQuery, postQuery, deleteQuery, patchQuery }
}