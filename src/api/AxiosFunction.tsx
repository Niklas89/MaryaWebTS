import axios from "axios";

export const AxiosFunction = () => {

    const accessToken = "getToken";
    const apiPath = "http://localhost:8080/api";


    function postQuery(path: string, data: object): Promise<any> {

        return axios.post(`${apiPath}/${path}`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    }


    function patchQuery(path: string, data: object): Promise<any> {
        return axios.patch(`${path}`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/merge-patch+json",
            },
        });
    }

    function getQuery(path: string): Promise<any> {
        return axios.get(`${path}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    }

    function deleteQuery(path: string): Promise<any> {
        return axios.delete(`${path}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    }

    return { getQuery, postQuery, deleteQuery, patchQuery }
}