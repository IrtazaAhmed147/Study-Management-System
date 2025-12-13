import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
  Checkbox,
  Card,
  CardContent,
  Avatar,
  FormControlLabel,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";

// Sample users - replace with API data
const sampleUsers = [
  { id: 1, name: "Alice Johnson", username: "alice123", university: "MIT" },
  { id: 2, name: "Bob Smith", username: "bob_smith", university: "Stanford" },
  { id: 3, name: "Charlie Brown", username: "charlie_b", university: "Harvard" },
  { id: 4, name: "David Lee", username: "davidlee", university: "SMIU" },
];

export default function ShareCourseModal({ open, onClose, onShare }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    setUsers(sampleUsers);
  }, []);

  const handleToggle = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.university.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShareClick = () => {
    onShare(selectedUsers);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { borderRadius: 3, width: 400 } }}
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <ShareIcon sx={{ color: "#2a7de1" }} />
        <Typography fontWeight={600} fontSize={16}>
          Share Course Access
        </Typography>
      </DialogTitle>

      <DialogContent sx={{p:2}}>
        <Typography fontSize={13} color="text.secondary" sx={{ mb: 2 }}>
          Select users to give access to this course. You can modify access anytime.
        </Typography>

        <TextField
          size="small"
          fullWidth
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearch}
          sx={{
            background: "#fff",
            borderRadius: "8px",
            mb: 2,
            "& fieldset": { border: "none" },
          }}
          inputProps={{ style: { fontSize: "12px" } }}
        />

        <Box sx={{ maxHeight: 250, overflowY: "auto" }}>
          {filteredUsers.map((user) => (
            <Card
              key={user.id}
              sx={{
                mb: 1,
                borderRadius: "10px",
                boxShadow:"0 2px 6px rgba(0,0,0,0.05)",
                transition: "0.3s",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  p: "10px !important",
                }}
              >
                <Avatar sx={{ width: 40, height: 40 }}>{user.name[0]}</Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                    {user.name}
                  </Typography>
                  <Typography sx={{ fontSize: "11px", color: "#64748B" }}>
                    @{user.username}
                  </Typography>
                  <Typography sx={{ fontSize: "11px", color: "#64748B" }}>
                    {user.university}
                  </Typography>
                </Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleToggle(user.id)}
                      sx={{
                        color: "#04a40e",
                        "&.Mui-checked": { color: "#04a40e" },
                      }}
                    />
                  }
                  label=""
                />
              </CardContent>
            </Card>
          ))}
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "flex-end", p: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          size="small"
          sx={{ textTransform: "none", borderRadius: "8px" }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          size="small"
          sx={{ textTransform: "none", borderRadius: "8px", background: "#04a40e" }}
          onClick={handleShareClick}
          disabled={selectedUsers.length === 0}
        >
          Share
        </Button>
      </DialogActions>
    </Dialog>
  );
}
