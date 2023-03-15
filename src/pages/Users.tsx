import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
// import useRefreshToken from "../hooks/useRefreshToken";

const Users = () => {
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    // const refresh = useRefreshToken();

    // useEffect when component loads
    useEffect(() => {
        let isMounted = true;
        // cancel our request if the component unmounts
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/user', {
                    signal: controller.signal
                });
                isMounted && setUsers(response.data);
            } catch (err) {
                console.error(err);
                // if refresh token has expired, logout to login. Redirect to current page after login
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getUsers();

        // cleanup function runs as the component unmounts
        return () => {
            isMounted = false;
            controller.abort(); // cancel any request that we have pending when the component unmounts
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <article>
            <h2>Users List</h2>

            {/* <button onClick={() => refresh()}>Refresh</button> */}
        </article>
    );
};

export default Users;
