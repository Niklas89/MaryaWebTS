import Grid from "@mui/material/Grid";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import "../../styles/Footer.css";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

const Footer = () => {
  const footerLink = [
    "Demander un service",
    "Qui-sommes-nous ?",
    "Mentions légales",
    "Information des consomateurs",
    "Application mobile pour les partenaires",
    "Conditions généralpes clients",
    "Sécurité",
    "Information des consomateurs",
  ];

  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        className="footer"
      >
        <Grid item xs={4} lg={3}>
          <Typography
            sx={{
              textAlign: "left",
              fontSize: { xs: 13, sm: 15 },
              fontWeight: "bold",
            }}
          >
            Informations utiles
          </Typography>
          <List disablePadding>
            {footerLink.map((link) => {
              return (
                <ListItem disablePadding>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: { xs: 11, sm: 13 } }}
                    sx={{
                      cursor: "pointer",
                      "&:hover": { textDecoration: "underline" },
                    }}
                    primary={link}
                  />
                </ListItem>
              );
            })}
          </List>
        </Grid>
        <Grid item xs={4} md={3}>
          <img src="/assets/logo/logoM.png" height="80" width="80" alt="logo" />
        </Grid>
        <Grid item xs={4} lg={3}>
          <Typography
            variant="body1"
            mb={2}
            sx={{ fontWeight: "bold", fontSize: { xs: 13, sm: 15 } }}
          >
            Suivez-nous sur nos réseaux sociaux :
          </Typography>
          <Grid container>
            <Grid item xs={4}>
              <YouTubeIcon
                sx={{
                  color: "#DBF227",
                  cursor: "pointer",
                  fontSize: { xs: 28, sm: 35 },
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
                  fontSize: { xs: 28, sm: 35 },
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
                  fontSize: { xs: 28, sm: 35 },
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
