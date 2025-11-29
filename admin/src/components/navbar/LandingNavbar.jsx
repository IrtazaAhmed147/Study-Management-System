import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Menu, MenuItem } from '@mui/material';


function LandingNavbar({authBtn = true}) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
                    <Link to={'/'}>
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontWeight: 700,
                                color: '#000',
                                textDecoration: 'none',
                            }}
                        >
                            My Idea
                        </Typography>

                    </Link>
                  {authBtn &&  <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="#000"
                        >
                            <MenuIcon />
                        </IconButton>

                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' }, p: "0px !important" }}
                        >

                            <MenuItem onClick={handleCloseNavMenu} sx={{p:0}}>
                                <Link to={`/login`} style={{width:'100%'}}>
                                    <Button
                                        sx={{
                                            px: 2,
                                            // width: "150px",
                                            height: "35px",
                                            // borderRadius: "6px",
                                            // background: "var(--primary-color)",
                                            color: "#000",
                                            // mr: 1,
                                            textTransform: "capitalize",
                                            fontSize: "13px",
                                            // ":hover": { backgroundColor: "#1258ad" },
                                        }}
                                    >
                                        <LoginIcon sx={{ mr: 1 }} />   Sign In
                                    </Button>
                                </Link>

                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu} sx={{ p:0 }}>
                                <Link to={`/signup`} style={{width:'100%'}}>
                                    <Button
                                        sx={{
                                            px: 2,
                                            width: "100%",
                                            height: "35px",
                                            // borderRadius: "6px",
                                            // background: "var(--primary-color)",
                                            color: "#000",
                                            // mr: 1,
                                            textTransform: "capitalize",
                                            fontSize: "13px",
                                            // ":hover": { backgroundColor: "#1258ad" },
                                        }}
                                    >
                                        <PersonAddIcon sx={{ mr: 1 }} />  Sign Up
                                    </Button>
                                </Link>

                            </MenuItem>

                        </Menu>


                    </Box>}

                    <Link to={'/'}  style={{width:'100%'}}>
                        <Typography
                            variant="h5"
                            noWrap  
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontWeight: 700,
                                color: '#000',
                                textDecoration: 'none',
                            }}
                        >
                            My Idea
                        </Typography>
                    </Link>

                    <Box sx={{ flexGrow: 0, display: { xs: "none", sm: "none", md: "flex" } }}>

                      { authBtn && <><Link to={`/login`}>
                            <Button
                                sx={{
                                    px: 2,
                                    width: "120px",
                                    height: "35px",
                                    borderRadius: "6px",
                                    background: "var(--primary-color)",
                                    transition:"0.3s all ease-in-out",
                                    color: "#fff",
                                    mr: 1,
                                    textTransform: "capitalize",
                                    fontSize: "13px",
                                    ":hover": { background: "var(--primaryHover-color)" },
                                }}
                            >
                                <LoginIcon sx={{ mr: 1 }} />   Sign In
                            </Button>
                        </Link>
                        <Link to={`/signup`}>
                            <Button
                                sx={{
                                    px: 2,
                                    width: "120px",
                                    height: "35px",
                                    borderRadius: "6px",
                                    background: "var(--primary-color)",
                                    color: "#fff",
                                    transition:"all 0.3s ease-in-out",
                                    textTransform: "capitalize",
                                    fontSize: "13px",
                                    ":hover": { background: "var(--primaryHover-color)" },
                                }}
                            >
                                <PersonAddIcon sx={{ mr: 1 }} />  Sign Up
                            </Button>
                        </Link> </>}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default LandingNavbar;
