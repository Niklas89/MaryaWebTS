import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const Home = () => {
    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        // the backend api will delete the cookie that has the refreshToken, so that there will be no refreshToken
        navigate('/login');
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
                <button onClick={signOut}>Déconnecter</button>
            </div>
        </section>
    )
}

export default Home
