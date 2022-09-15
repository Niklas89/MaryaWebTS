import axios from 'axios';


export const AxiosFunction = () => {

    const accessToken = "getToken";
    const apiPath = "http://localhost:8080/api";


    async function postQuery(path: string, data: any): Promise<any> {

        return await axios.post<any[]>(`${apiPath}/${path}`, data, {
            headers: {
                Authorization: `Bearer ${await accessToken}`,
            },
        });
    }

    async function postMultipart(path: string, data: any): Promise<any> {
        return await axios.post<any[]>(`${path}`, data, {
            headers: {
                Authorization: `Bearer ${await accessToken}`,
                "Content-Type": "multipart/form-data",
            },
        });
    }

    async function patchQuery(path: string, data: any): Promise<any> {
        return await axios.patch<any[]>(`${path}`, data, {
            headers: {
                Authorization: `Bearer ${await accessToken}`,
                'Content-Type': 'application/merge-patch+json',
            },
        });
    }

    async function getQuery(path: string): Promise<any> {
        return await axios.get<any[]>(`${path}`, {
            headers: {
                Authorization: `Bearer ${await accessToken}`,
            },
        });
    }

    async function deleteQuery(path: string): Promise<any> {
        return await axios.delete<any[]>(`${path}`, {
            headers: {
                Authorization: `Bearer ${await accessToken}`,
            },
        });
    }

    return { getQuery, postQuery, deleteQuery, patchQuery, postMultipart }
}
