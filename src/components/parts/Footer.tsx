import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import "../styles/Footer.css";
import { List, ListItem, ListItemText } from "@mui/material";

const Footer = () => {
    return (
        <div>
            <Grid container justifyContent="space-evenly" alignItems="center" className="footer" spacing={2}>
                <Grid xs={4} lg={3}>
                    <List disablePadding>
                        <ListItem disablePadding >
                            <ListItemText primaryTypographyProps={{ fontSize: 14 }} primary="Information des consomateurs" />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemText primaryTypographyProps={{ fontSize: 14 }} primary="Mentions légales" />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemText primaryTypographyProps={{ fontSize: 14 }} primary="Information des consomateurs" />
                        </ListItem>
                    </List>
                </Grid>
                <Grid xs={4} md={3}>
                    <img src="./assets/logo.png" height="80" width="80" alt="logo" />
                </Grid>
                <Grid xs={4} lg={3}>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Suivez-nous
                    </Typography>
                    <Grid container>
                        <Grid xs={4}>
                            <YouTubeIcon sx={{ color: "#DBF227" }} />
                        </Grid>
                        <Grid xs={4}>
                            <FacebookOutlinedIcon sx={{ color: "#DBF227" }} />
                        </Grid>
                        <Grid xs={4}>
                            <InstagramIcon sx={{ color: "#DBF227" }} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div >
    );
};

export default Footer;