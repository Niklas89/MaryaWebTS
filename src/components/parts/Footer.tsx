import Grid from "@mui/material/Grid";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import "../../styles/Footer.css";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

const Footer = () => {
  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        className="footer"
      >
        <Grid item xs={4} lg={3}>
          <Typography sx={{textAlign: "left", fontSize: 15, fontWeight: "bold"}}>Informations utiles</Typography>
          <List disablePadding>
            <ListItem disablePadding>
              <ListItemText
                primaryTypographyProps={{ fontSize: 13 }}
                sx={{
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
                primary="Demander un service"
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primaryTypographyProps={{ fontSize: 13 }}
                sx={{
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
                primary="Qui-sommes-nous ?"
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primaryTypographyProps={{ fontSize: 13 }}
                sx={{
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
                primary="Mentions légales"
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primaryTypographyProps={{ fontSize: 13 }}
                sx={{
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
                primary="Information des consomateurs"
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primaryTypographyProps={{ fontSize: 13 }}
                sx={{
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
                primary="Application mobile pour les partenaires"
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primaryTypographyProps={{ fontSize: 13 }}
                sx={{
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
                primary="Conditions généralpes clients"
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primaryTypographyProps={{ fontSize: 13 }}
                sx={{
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
                primary="Sécurité"
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primaryTypographyProps={{ fontSize: 13 }}
                sx={{
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
                primary="Information des consomateurs"
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primaryTypographyProps={{ fontSize: 13 }}
                sx={{
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
                primary="Avis client"
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={4} md={3}>
          <img
            src="./assets/logo/logoM.png"
            height="80"
            width="80"
            alt="logo"
          />
        </Grid>
        <Grid item xs={4} lg={3}>
          <Typography variant="body1" mb={2} sx={{ fontWeight: "bold" }}>
            Suivez-nous sur nos réseaux sociaux :
          </Typography>
          <Grid container>
            <Grid item xs={4}>
              <YouTubeIcon
                sx={{
                  color: "#DBF227",
                  cursor: "pointer",
                  "&:hover": {
                    opacity: 0.9,
                  },
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <FacebookOutlinedIcon
                sx={{
                  color: "#DBF227",
                  cursor: "pointer",
                  "&:hover": {
                    opacity: 0.9,
                  },
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <InstagramIcon
                sx={{
                  color: "#DBF227",
                  cursor: "pointer",
                  "&:hover": {
                    opacity: 0.9,
                  },
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Footer;
