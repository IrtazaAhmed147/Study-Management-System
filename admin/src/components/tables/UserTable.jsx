import { useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import BlockIcon from "@mui/icons-material/Block";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Chip,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const options = ["View Courses", "Block/Unblock", "Delete"];
const ITEM_HEIGHT = 48;

export default function UserTable() {
  const users = [
    { id: 1, name: "Ali", email: "ali@example.com", courses: 3, materials:34,status: "Active" },
    { id: 2, name: "Sara", email: "sara@example.com", courses: 5, materials:34,status: "Blocked" },
    { id: 3, name: "Ahmed", email: "ahmed@example.com", courses: 2, materials:34,status: "Active" },
    { id: 4, name: "Hina", email: "hina@example.com", courses: 1, materials:34,status: "Active" },
  ];

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  return (
    <Box sx={{ width: "100%", mt: 1, overflowX: "auto", pb: 1 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          background: "#f0f4fa",
          py: { xs: 0.5, sm: 1, md: 1 },
          px: { xs: 1, sm: 1.5, md: 1.5 },
          borderRadius: "10px",
          fontSize: "13px",
          fontWeight: 600,
          minWidth: "600px",
          color: "#475569",
        }}
      >
        <HeaderCell label="ID" />
        <HeaderCell label="Name" />
        <HeaderCell label="Email" />
        <HeaderCell label="Courses" />
        <HeaderCell label="Materials" />
        <HeaderCell label="Status"  width="15%" />
        <HeaderCell label=" " width="15%" />
      </Box>

      {/* Rows */}
      {users.map((user) => (
        <Box
          key={user.id}
          sx={{
            display: "flex",
            gap: "5px",
            background: "#fff",
            py: { xs: 0.5, sm: 1, md: 1 },
            px: { xs: 1, sm: 1.5, md: 1.5 },
            borderRadius: "10px",
            mt: 1.2,
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
            transition: "0.2s",
            alignItems: "center",
            minWidth: "600px",
            "&:hover": { boxShadow: "0 3px 12px rgba(0,0,0,0.12)" },
          }}
        >
          <RowCell>{user.id}</RowCell>
          <RowCell>{user.name}</RowCell>
          <RowCell>{user.email}</RowCell>
          <RowCell>{user.courses}</RowCell>
          <RowCell>{user.materials}</RowCell>

          {/* Status Chip */}
          <Box sx={{ width: "15%", display: "flex" }}>
            {user.status === "Active" ? (
              <Chip
                icon={<CheckCircleOutlineIcon sx={{ fontSize: "16px" }} />}
                label="Active"
                size="small"
                sx={{
                  background: "#e6f9e6",
                  color: "#2a8f2a",
                  fontWeight: 600,
                }}
              />
            ) : (
              <Chip
                icon={<BlockIcon sx={{ fontSize: "16px" }} />}
                label="Blocked"
                size="small"
                sx={{
                  background: "#ffe6e6",
                  color: "#d32f2f",
                  fontWeight: 600,
                }}
              />
            )}
          </Box>

          {/* Actions */}
          <Box sx={{ width: "15%", textAlign: "right" }}>
            <IconButton
              aria-label="more"
              aria-controls={open ? "menu" : undefined}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, user)}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>

            <Menu
              id="menu"
              anchorEl={anchorEl}
              open={open && selectedUser?.id === user.id}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  borderRadius: "10px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                },
              }}
            >
              {options.map((option) => (
                <MenuItem key={option} onClick={handleClose}>
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

/* Header Cell Component */
const HeaderCell = ({ label, width }) => (
  <Typography
    sx={{
      width: width || "20%",
      fontSize: { xs: "11px", sm: "13px", md: "13px" },
      fontWeight: 700,
    }}
  >
    {label}
  </Typography>
);

/* Row Cell Component */
const RowCell = ({ children }) => (
  <Typography
    sx={{
      width: "20%",
      fontSize: { xs: "11px", sm: "13px", md: "13px" },
      color: "#334155",
      display: "flex",
      alignItems: "center",
    }}
  >
    {children}
  </Typography>
);
