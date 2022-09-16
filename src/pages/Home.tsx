import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import CardCategory from "../components/service/CardCategory";
import SliderHome from "../components/SliderHome";
import axios from "../api/axios";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";

const LOGOUT_URL = "/logout"; // login endpoint in backend nodejs api

const Home = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        setAuth?.({});
        axios({
            method: "get",
            url: LOGOUT_URL
        })
        .then((res: AxiosResponse) => {
            Cookies.remove("email");
            Cookies.remove("jwt"); // cannot remove because the cookie is secure and httponly
            navigate("/login");
        })
    }

    return (
        <section>
            <h1>Accueil</h1>
            <br />
            <p>Vous êtes connecté</p>
            <br />
            <Link to="/editor">Aller à la page Editeur</Link>
            <br />
            <Link to="/admin">Aller à la page Admin</Link>
            <br />
            <Link to="/profile">Aller à la page Profile</Link>
            <br />
            <Link to="/linkpage">Aller à la page des liens</Link>
            <div className="flexGrow">
                <button onClick={logout}>Déconnecter</button>
            </div>
        </section>
    )
}

export default Home
