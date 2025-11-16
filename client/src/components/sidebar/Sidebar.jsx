import { List, ListItem, Typography, IconButton } from '@mui/material'
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
import { Link } from 'react-router-dom';

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const listItems = [
    { name: "Dashboard", icon: <DashboardOutlinedIcon />, path: "/dashboard" },
    { name: "Courses", icon: <FolderCopyOutlinedIcon />, path: "/courses" },
    { name: "Shared Courses", icon: <ShareOutlinedIcon />, path: "/shared-courses" },
    { name: "Friends", icon: <GroupOutlinedIcon />, path: "/friends" },
    { name: "Assignments", icon: <AssignmentOutlinedIcon />, path: "/assignments" },
    { name: "Settings", icon: <SettingsOutlinedIcon />, path: "/settings" },
  ];

  return (
    <Box
      sx={{
        width: collapsed ? '80px' : '350px',
        minHeight: '91vh',
        position: 'relative',
        zIndex: 2,
        boxShadow: "6px 11px 20px rgba(0,0,0,0.15)",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: "10px 0px",
        transition: 'width 0.3s ease-in-out',
      }}
    >
      {/* -------- Collapse/Expand Button -------- */}
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
          top: '40%',
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
              "&:hover": { backgroundColor: "var(--bg-color)" },
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
          src="https://media.licdn.com/dms/image/v2/D5603AQHzB2MM4hjZyA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1721399984734?e=2147483647&v=beta&t=GexUxYdCQ6dihCZYDE16KmokvHOslYZ7OeeepyR8br0"
          alt=""
        />
        {!collapsed && (
          <Box sx={{ marginLeft: '8px',overflow:'hidden' }}>
            <Typography color='var(--text-color)' fontSize={'15px'} fontWeight={'bold'} >
              Irtaza Ahmed
            </Typography>
            <Typography color='#6d6d6dff' fontSize={'12px'}>
              irtazaahmedk@gmail.com
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Sidebar;
