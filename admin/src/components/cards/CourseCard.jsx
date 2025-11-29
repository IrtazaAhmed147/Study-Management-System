import { Box, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";
import { Link } from "react-router-dom";

const menuOptions = [
  "Edit Course",
  "Share",
  "Delete",
];

const ITEM_HEIGHT = 48;

function CourseCard() {
 const [anchorEl, setAnchorEl] = React.useState(null);
const open = Boolean(anchorEl);

const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleClose = () => {
  setAnchorEl(null);
};


  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "48%", md: "32%" },
        backgroundColor: "#fff",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
        transition: "0.3s",
        "&:hover": {
          boxShadow: "0px 6px 20px rgba(0,0,0,0.18)",
          transform: "translateY(-4px)",
        },
      }}
    >
      <Link to={`/course/123`}>

      {/* Title */}
      <Typography
        fontSize="18px"
        fontWeight="bold"
        color="var(--text-color)"
        sx={{ mb: 1, width: "85%" }}
      >
        Beginner's Guide to Figma
      </Typography>

      {/* Description */}
      <Typography fontSize="13px" color="#555" sx={{ mb: 2 }}>
        Learn how to design a beautiful and engaging mobile app with Figma.
      </Typography>

      {/* META INFO (3 Lines) */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <Typography fontSize="13px" color="var(--text-color)">
          Materials: <b>12</b>
        </Typography>

        <Typography fontSize="13px" color="var(--text-color)">
          Shared With: <b>3 Members</b>
        </Typography>

        <Typography fontSize="13px" color="var(--text-color)">
          Last Updated: <b>03-12-2025</b>
        </Typography>
      </Box>

      </Link>
      {/* Bottom Bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "15px",
          paddingTop: "10px",
          borderTop: "1px solid #e5e5e5",
        }}
        >
        {/* Left Icon */}
        <BookmarkBorderOutlinedIcon sx={{ color: "#666", cursor: "pointer" }} />

        {/* More Options */}
        <IconButton
          aria-label="more"
          id="dashboard-card-menu-btn"
          aria-controls={open ? "dashboard-card-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          >
          <MoreVertIcon />
        </IconButton>

        <Menu
          id="dashboard-card-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            paper: {
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "20ch",
              },
            },
          }}
          >
          {menuOptions.map((option) => (
            <MenuItem key={option} onClick={handleClose}>
              {option}
            </MenuItem>
          ))}
        </Menu>
      </Box>

    </Box>
  );
}

export default CourseCard;
