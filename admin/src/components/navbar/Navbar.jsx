import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userReset } from '../../redux/slices/authSlice';
import { notify } from '../../utils/HelperFunctions';
import Sidebar from '../sidebar/Sidebar.jsx';
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [mobileSidebar, setMobileSidebar] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    dispatch(userReset());
    navigate('/login');
    notify('success', 'User logged out successfully');
  };

  return (
    <>
      {/* NAVBAR */}
      <AppBar sx={{ background: 'var(--primary-color)', mb: 1, height: "40px", position: "static" }}>
        <Container maxWidth="xl" >
          <Toolbar disableGutters sx={{ justifyContent: "space-between", maxHeight: "40px !important", minHeight: "40px !important" }}>

            {/* Mobile menu */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                onClick={() => setMobileSidebar(true)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>

            {/* Logo Mobile */}
            <Typography
              variant="h5"
              noWrap
              sx={{
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontWeight: 700,
                color: '#fff',
              }}
            >
              <Link to="/" style={{ color: '#fff' }}>My Idea</Link>
            </Typography>

            {/* Logo Desktop */}
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                color: '#fff',
              }}
            >
              <Link to="/" style={{ color: '#fff' }}>My Idea</Link>
            </Typography>

          

            <Tooltip title="Logout">
              <IconButton sx={{
                height: "100%", backgroundColor: "#2A7DE1", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", padding: "5px", cursor: "pointer", transition: "0.3s all ease-in-out",
                ":hover": {
                  backgroundColor: "#19aae9",

                },
              }}

                onClick={handleLogout}
              >
                <LogoutIcon sx={{color:"#fff"}} fontSize='small' />
              </IconButton>
            </Tooltip>


          </Toolbar>
        </Container>
      </AppBar>

      {/* MOBILE SIDEBAR DRAWER */}
      <Drawer
        anchor="left"
        open={mobileSidebar}
        onClose={() => setMobileSidebar(false)}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <Box sx={{ width: 260, height: "100vh", bgcolor: "var(--bg-color)" }}>
          <Sidebar collapsed={false} mobileSidebar={mobileSidebar} />
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;
