// import { useNavigate } from "react-router-dom";
import { Height } from "@mui/icons-material";
import { Grid } from "@mui/material";
import CardCategory from "../components/service/CardCategory";
import SliderHome from "../components/SliderHome";
// import useLogout from "../hooks/useLogout";

//const LOGOUT_URL = "/logout"; // login endpoint in backend nodejs api

const Home = () => {
  // const navigate = useNavigate();
  // const logout = useLogout();

  // const signOut = async () => {
  //     await logout();
  //     // the backend api will delete the cookie that has the refreshToken, so that there will be no refreshToken
  //     navigate('/login');
  // }

  return (
    <Grid container>
      <Grid
        item
        marginTop={5}
        xs={12}
        sx={{
          alignItems: "center",
          width: "100%",
        }}
      >
        <SliderHome />
      </Grid>
      <Grid item marginTop={5} marginBottom={5} textAlign="center">
        <CardCategory />
      </Grid>
    </Grid>
  );
};

export default Home;
