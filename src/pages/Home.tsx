import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import CardCategory from "../components/service/CardCategory";
import SliderHome from "../components/SliderHome";

const Home = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        setAuth?.({});
        navigate('/linkpage');
    }

    return (
        <>
            <SliderHome />
            <CardCategory />
        </>
    )
}

export default Home
