import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Avatar, createTheme, ThemeProvider } from '@mui/material';

const Navbar = () => {

    const maryaTheme = createTheme({
        palette: {
            primary: {
                main: '#ffffff',

            },
        },
    });

    return (
        <ThemeProvider theme={maryaTheme}>
            <AppBar position="static" >
                <Toolbar disableGutters>
                    <Toolbar>
                        <Avatar alt="Remy Sharp" src="../assets/img/logo.png" sx={{ width: 100, height: 70 }} />
                    </Toolbar>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
};

export default Navbar;