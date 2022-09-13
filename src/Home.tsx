import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./context/AuthProvider";
import * as React from 'react';
import Button from '@mui/material/Button';

const Home = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        setAuth({});
        navigate('/linkpage');
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
            <Link to="/linkpage">Aller à la page des liens</Link>
            <div className="flexGrow">
                <button onClick={logout}>Déconnecter</button>
            </div>
        </section>
    )
}

export default Home
