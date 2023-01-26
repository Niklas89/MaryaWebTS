import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import "../../styles/Navigation.css";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
import { AccountCircle } from "@mui/icons-material";
import { padding } from "@mui/system";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";

const Navigation = () => {
  const { auth } = useAuth();
  const logout = useLogout();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElProfil, setAnchorElProfil] = useState<null | HTMLElement>(
    null
  );
  const [anchorElService, setAnchorElService] = useState<null | HTMLElement>(
    null
  );
  const pages = [
    { name: "Coiffure", path: "booking/create/1" },
    { name: "Bricolage", path: "booking/create/2" },
    { name: "Jardinage", path: "booking/create/3" },
    { name: "Ménage", path: "booking/create/4" },
    { name: "Beauté", path: "booking/create/5" },
    { name: "Babysitting", path: "booking/create/6" },
  ];

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenMenuProfil = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElProfil(event.currentTarget);
  };

  const handleCloseMenuProfil = () => {
    setAnchorElProfil(null);
  };

  const handleOpenMenuService = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElService(event.currentTarget);
  };

  const handleCloseMenuService = () => {
    setAnchorElService(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#035A5A" }}>
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <Box sx={{ paddingTop: 1 }}>
            <img src="./assets/logo/marya.png" height="60" alt="" />
          </Box>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              mr: 2,
              ml: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              fontSize: 30,
            }}
          >
            Marya
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem
                  key={index}
                  component={Link}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MARYA
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="small"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenMenuService}
              color="inherit"
            >
              <RoomServiceIcon
                sx={{
                  fontSize: 30,
                  marginRight: 1,
                  marginLeft: 5,
                }}
              />
              Nos services
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElService}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElService)}
              onClose={handleCloseMenuService}
            >
              {pages.map((page, index) => (
                <MenuItem
                  key={index}
                  component={Link}
                  to={page.path}
                  onClick={handleCloseMenuService}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
            {auth?.role ? (
              <Button
                component={Link}
                to={"/booking"}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontSize: 17,
                  textTransform: "none",
                }}
              >
                <LocalLibraryIcon
                  sx={{
                    fontSize: 30,
                    marginLeft: 5,
                    marginRight: 1,
                  }}
                />
                Mes reservations
              </Button>
            ) : (
              ""
            )}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {auth?.role ? (
              <>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenMenuProfil}
                  color="inherit"
                >
                  <AccountCircle
                    sx={{
                      fontSize: 35,
                    }}
                  />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElProfil}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElProfil)}
                  onClose={handleCloseMenuProfil}
                >
                  <MenuItem component={Link} to={"/profile"}>
                    Profil
                  </MenuItem>
                  <MenuItem onClick={logout}>Se déconnecter</MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                component={Link}
                to="login"
                sx={{
                  color: "white",
                  display: "block",
                  fontSize: 17,
                  textTransform: "none",
                }}
              >
                Connexion
                <VpnKeyIcon
                  sx={{
                    fontSize: 30,
                    marginLeft: 1,
                  }}
                />
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation;
