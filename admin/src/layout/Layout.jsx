import Navbar from '../components/navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import { Box } from '@mui/material';
import { useState } from 'react';
import Footer from '../components/footer/Footer';

const Layout = () => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        </Box>
        <Box sx={{ width: "100%", backgroundColor: "var(--bg-color)", transition: 'margin 0.3s ease-in-out', marginLeft: { xs: '0px', sm: '0px', md: collapsed ? '80px' : '260px' } }}>
          <Navbar />

          <Outlet />

          <Footer />
        </Box>
      </Box>
    </>
  );
};

export default Layout;
