import { Grid } from "@mui/material";
import CardCategory from "../components/service/CardCategory";
import SliderHome from "../components/SliderHome";


const Home = () => {
  return (
    <Grid container>
      <Grid
        item
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
