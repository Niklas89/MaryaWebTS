import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "./context/AuthProvider";
import useAuth from "./hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

import axios from "./api/axios";
const LOGIN_URL = "/user/login"; // login endpoint in backend nodejs api




const Login = () => {
    const  {setAuth}  = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    // navigate to the location where the user wanted to go before they were sent to the login page OR the home page
    // const from = location.state?.from?.pathname || "/";
    const from = "/";

    // set focus on user input and error message
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);

    const [user, setUser] = useState<string>("");
    const [pwd, setPwd] = useState<string>("");
    const [errMsg, setErrMsg] = useState<string>("");

    // when component loads set focus on first input field / user field
    useEffect(() => {
        if(userRef.current !== null)
        userRef.current.focus();
    }, [])

    // make error message disapear when ajusting fields 
    useEffect(() => {
        setErrMsg("");
    }, [user, pwd])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // prevent default behavior of the page which would reload of the page

        try {
            // post login file to backend api
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email: user, password: pwd }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            console.log(accessToken);
            const role = response?.data?.idRole;
            console.log(role);
            // auth state stored in our global context with the usecontext hook :
            setAuth({ user, pwd, role, accessToken }); 

            // clear components after submit complete
            setUser("");
            setPwd(""); 
            // after the form is submited, navigate to the location where the user wanted to go before they were sent to the login page
            navigate(from, { replace: true });
        } catch (err: any) {
            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 400) {
                setErrMsg("Missing Email or Password");
            } else if (err.response?.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Login Failed");
            }
            if(errRef.current !== null)
                errRef.current.focus();
        }
    }

    return (

        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Connexion</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    ref={userRef} // ref to set focus on this input
                    autoComplete="off" // not fill input with past entries
                    onChange={(e) => setUser(e.target.value)} // function to set user state
                    value={user} // user state in value
                    required
                />

                <label htmlFor="password">Mot de passe:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button>Connecter</button>
            </form>
            <p>
                Besoin d"un compte?<br />
                <span className="line">
                    {/*<Link to="/register">Inscription</Link>*/}
                    <a href="#">Inscription</a>
                </span>
            </p>
        </section>

    )
}

export default Login
