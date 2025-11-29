import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Chip,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";

// Menu Options
const options = ["Change Status", "Delete", "Update"];

const ITEM_HEIGHT = 48;

export default function TaskTable() {
  const tasks = [
    {
      task: "Draw ERD",
      course: "Database",
      type: "Assignment",
      due: "3-12-25",
      file: "image",
      status: "Completed",
    },
    {
      task: "Normalization",
      course: "Database",
      type: "Quiz",
      due: "5-12-25",
      file: "image",
      status: "Pending",
    },
    {
      task: "SQL Joins",
      course: "Database",
      type: "Assignment",
      due: "7-12-25",
      file: "image",
      status: "Completed",
    },
    {
      task: "10 questions solve karne hain jismein se 2 complete hain sdvdsfds sf sfewf",
      course: "Linear Algebra",
      type: "Assignment",
      due: "7-12-25",
      file: "image",
      status: "Completed",
    },
  ];

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Box sx={{ width: "100%", mt: 1,overflowX:"auto" ,pb:1}}>
      
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          background: "#f0f4fa",
         py: {xs:0.5,sm:1.5,md:1.5},
         px: {xs:1,sm:1.5,md:1.5},
          borderRadius: "10px",
          fontSize: "13px",
          fontWeight: 600,
            minWidth:"550px",
          color: "#475569",
          // overflowX: "auto",
        }}
      >
        <HeaderCell label="Task" />
        <HeaderCell label="Course" />
        <HeaderCell label="Type" />
        <HeaderCell label="Due Date" />
        <HeaderCell label="File" />
        <HeaderCell label="Status" width={'15%'} />
        <HeaderCell label="" width='5%'/>
      </Box>

      {/* Rows */}
      {tasks.map((item, i) => (
        <Box
          key={i}
          sx={{
            display: "flex",
            gap:"5px",
            background: "#fff",
            py: {xs:0.5,sm:1.5,md:1.5},
            px: {xs:1,sm:1.5,md:1.5},
            borderRadius: "10px",
            mt: 1.2,
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
            transition: "0.2s",
            alignItems: "center",
            minWidth:"550px",
            // overflowX: "auto",
            "&:hover": { boxShadow: "0 3px 12px rgba(0,0,0,0.12)" },
          }}
        >
          <RowCell>{item.task.slice(0, 35)}</RowCell>
          <RowCell>{item.course}</RowCell>
          <RowCell>{item.type}</RowCell>
          <RowCell>{item.due}</RowCell>
          <RowCell>{item.file}</RowCell>

          {/* Status Chip */}
          <Box
            sx={{
              width: "15%",
              display: "flex",
            }}
          >
            {item.status === "Completed" ? (
              <Chip
                icon={<CheckCircleOutlineIcon sx={{ fontSize: "16px" }} />}
                label={"Completed"}
                size="small"
                sx={{
                  background: "#e6f9e6",
                  color: "#2a8f2a",

                  fontWeight: 600,
                }}
              />
            ) : (
              <Chip
                icon={<PendingActionsIcon sx={{ fontSize: "16px" }} />}
                label="Pending"
                size="small"
                sx={{
                  background: "#fff4e5",
                  color: "#c77700",

                  fontWeight: 600,
                }}
              />
            )}
          </Box>

          {/* Actions */}
          <Box sx={{ width: "5%", textAlign: "right" }}>
            <IconButton
              aria-label="more"
              aria-controls={open ? "menu" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>

            <Menu
              id="menu"
              anchorEl={anchorEl}
              open={open}
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
      // minWidth: width ? "0px":"120px",
     fontSize: {xs:'11px',sm:"13px",md:"13px"},
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
      // minWidth: "120px",
      fontSize: {xs:'11px',sm:"13px",md:"13px"},
      color: "#334155",
      display: "flex",
      alignItems: "center",
    }}
  >
    {children}
  </Typography>
);
