import { Link } from "react-router-dom";
import Users from './Users';

const Admin = () => {
    return (
        <section>
            <h1>Page Admin</h1>
            <br />
            <Users />
            <br />
            <div className="flexGrow">
                <Link to="/">Accueil</Link>
            </div>
        </section>
    )
}

export default Admin
