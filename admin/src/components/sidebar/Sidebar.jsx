import { List, ListItem, Typography, IconButton, Badge } from '@mui/material'
import Box from '@mui/material/Box'
import React, { useState } from 'react'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { Link, useLocation } from 'react-router-dom';

function Sidebar({ collapsed, setCollapsed, mobileSidebar }) {

  const location = useLocation();

  // console.log(location.pathname);


  const listItems = [
    { name: "Dashboard", icon: <DashboardOutlinedIcon />, path: "/" },
    { name: "Courses", icon: <FolderCopyOutlinedIcon />, path: "/courses" },
    { name: "Users", icon: <GroupOutlinedIcon />, path: "/users" },
    { name: "Tasks", icon: <AssignmentOutlinedIcon />, path: "/task/123" },
    {
      name: "Notifications", icon: <Badge sx={{ "& .MuiBadge-badge": { top: "-5px", right: "-5px" } }} badgeContent={6} color="primary">
        <NotificationsNoneOutlinedIcon />  </Badge>, path: "/notification/irtaza"
    },
    { name: "Settings", icon: <SettingsOutlinedIcon />, path: "/setting" },
  ];

  return (
    <Box
      sx={{

        width: collapsed ? '80px' : '260px',
        height: mobileSidebar ? '100vh' : "100vh",
        mt: 0,
        backgroundColor: "#fff",
        position: 'fixed',
        zIndex: 0,
        boxShadow: "6px 11px 20px rgba(0,0,0,0.15)",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: "10px 0px",
        transition: 'width 0.3s ease-in-out',
      }}
    >
      <Box
        onClick={() => setCollapsed(!collapsed)}
        sx={{
          transition: '0.3s all ease-in-out',
          ":hover": { backgroundColor: '#959595dd' },
          cursor: 'pointer',
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          right: collapsed ? '-20px' : 0,
          top: '50%',
          height: '40px',
          width: '20px',
          backgroundColor: '#bcbcbcdd',
          borderRadius: collapsed ? '0px 10px 10px 0px' : '10px 0px 0px 10px',
        }}
      >
        {collapsed ? <ChevronRightOutlinedIcon sx={{ color: '#fff' }} /> : <ChevronLeftOutlinedIcon sx={{ color: '#fff' }} />}
      </Box>

      {/* -------- List Items -------- */}
      <List>
        {listItems.map((item, index) => (
          <ListItem
            key={index}
            sx={{
              padding: '0px',
              transition: '0.3s all ease-in-out',
              backgroundColor: location.pathname === item.path
                ? "#f2f8ff"
                : "#fff",
              color: location.pathname === item.path ? "#fff" : "var(--text-color)",
              "&:hover": {
                backgroundColor: "var(--bg-color)",
              },
            }}
          >
            <Link
              to={item.path}
              style={{
                color: 'var(--text-color)',
                width: '100%',
                padding: '8px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: collapsed ? 'center' : 'flex-start',
              }}
            >
              <Box sx={{ marginRight: collapsed ? 0 : '10px', display: 'flex', alignItems: 'center' }}>
                {item.icon}
              </Box>
              {!collapsed && <Box
                sx={{
                  overflow: 'hidden',
                }}
              >
                {item.name}
              </Box>}
             
            </Link>
          </ListItem>
        ))}
      </List>

      {/* -------- User Info -------- */}

      <Link to={`/profile/123`}>
        <Box
          sx={{
            border: '1px solid #ddd',
            borderRadius: '25px',
            margin: "0px auto",
            padding: '5px',
            width: collapsed ? '60px' : '90%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            height: collapsed ? '60px' : '70px',
            transition: 'all 0.3s ease-in-out'
          }}
        >
          <img
            style={{ borderRadius: '50%', height: '100%' }}
            src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
            alt=""
          />
          {!collapsed && (
            <Box sx={{ marginLeft: '8px', overflow: 'hidden' }}>
              <Typography color='var(--text-color)' fontSize={'15px'} fontWeight={'bold'} >
                user example
              </Typography>
              <Typography color='#6d6d6dff' fontSize={'12px'}>
                example@gmail.com
              </Typography>
            </Box>
          )}
        </Box>
      </Link>
    </Box>
  );
}

export default Sidebar;
