import React, { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
} from "@mui/material";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import TaskTable from "../../components/tables/TaskTable";
import { useNavigate } from "react-router-dom";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const SingleCourse = () => {
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();

  // Sample Data
  const images = [
    "https://www.researchgate.net/publication/324485726/figure/fig1/AS:732731210207236@1551708142406/Entity-Relationship-Diagram-ERD-of-the-database.png",
    "https://www.shutterstock.com/image-vector/hand-written-scribble-illustration-mathematical-260nw-76768936.jpg",
    // add more images
  ];

  const pdfs = [
    { name: "Lecture 1 - Introduction.pdf" },
    { name: "HTML Notes.pdf" },
  ];

  const assignments = [
    { title: "Assignment 1", due: "5 Dec", status: "Completed" },
    { title: "Assignment 2", due: "10 Dec", status: "Pending" },
  ];

  const quizzes = [
    { title: "Quiz 1", marks: 10, status: "Completed" },
    { title: "Quiz 2", marks: 15, status: "Pending" },
  ];

  const friends = [
    { name: "Ali", img: "/avatar1.png" },
    { name: "Sara", img: "/avatar2.png" },
    { name: "Hamza", img: "/avatar3.png" },
  ];

  return (
    <Box sx={{ p: 1, minHeight: "100vh" }}>
      {/* Header */}
      <Typography fontSize="20px" fontWeight={700} sx={{ mb: 1 }}>
        Course Title
      </Typography>
      <Typography fontSize="13px" sx={{ mb: 3, color: "#64748b" }}>
        Short description of your course goes here. Very clean and minimal.
      </Typography>

      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={(e, val) => setTab(val)}
        sx={{
          mb: 3,
          "& .MuiTab-root": {
            fontSize: { xs: "10px", sm: "12px", md: "12px" },
            textTransform: "none",
            p: { xs: "8px 8px", sm: "8px 16px", md: "8px 16px" },
            minWidth: "auto",
          },
        }}
      >
        <Tab label="Overview" />
        <Tab label="Assignments" />
        <Tab label="Quizzes" />
        <Tab label="Images" />
        <Tab label="Pdfs" />
      </Tabs>

      {/* Overview */}
      {tab === 0 && (
        <Box sx={{ display: "flex", gap: { xs: 1, sm: 1, md: 2 }, flexWrap: "wrap", mb: 4 }}>
          <StatCard label="Assignments" value={assignments.length} />
          <StatCard label="Quizzes" value={quizzes.length} />
          <StatCard label="Materials" value={images.length + pdfs.length} />
          <StatCard label="Shared Friends" value={friends.length} />
        </Box>
      )}

      {/* Assignments */}
      {tab === 1 && (
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", flexWrap: "wrap", gap: 1 }}>
            <Typography fontSize="24px" fontWeight="bold" sx={{ color: "#334155" }}>
              Assignments
            </Typography>
            <Box
              onClick={() => navigate("/create/assignment")}
              sx={{
                width: { xs: "100%", sm: "48%", md: "250px" },
                p: "10px 12px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #E7F1FD, #F3F8FF)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                transition: "0.25s ease",
                border: "1px solid rgba(0,0,0,0.05)",
                "&:hover": {
                  background: "linear-gradient(135deg, #ffffff, #f2f8ff)",
                  transform: "translateY(-3px)",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                },
              }}
            >
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: "10px",
                  backgroundColor: "rgba(42, 125, 225, 0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AssignmentOutlinedIcon sx={{ fontSize: 18, color: "#4158D0" }} />
              </Box>
              <Typography fontSize="14px" fontWeight="600" color="#1e293b">
                Add Assignment
              </Typography>
            </Box>
          </Box>
          <TaskTable />
        </Box>
      )}

      {/* Quizzes */}
      {tab === 2 && (
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", flexWrap: "wrap", gap: 1 }}>
            <Typography fontSize="24px" fontWeight="bold" sx={{ color: "#334155" }}>
              Quizzes
            </Typography>
            <Box
              onClick={() => navigate("/create/quiz")}
              sx={{
                width: { xs: "100%", sm: "48%", md: "250px" },
                p: "10px 12px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #E7F1FD, #F3F8FF)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                transition: "0.25s ease",
                border: "1px solid rgba(0,0,0,0.05)",
                "&:hover": {
                  background: "linear-gradient(135deg, #ffffff, #f2f8ff)",
                  transform: "translateY(-3px)",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                },
              }}
            >
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: "10px",
                  backgroundColor: "rgba(42, 125, 225, 0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AssignmentOutlinedIcon sx={{ fontSize: 18, color: "#4158D0" }} />
              </Box>
              <Typography fontSize="14px" fontWeight="600" color="#1e293b">
                Add Quiz
              </Typography>
            </Box>
          </Box>
          <TaskTable />
        </Box>
      )}

      {/* Images */}
      {tab === 3 && (
        <Box>
          <Typography fontSize="24px" fontWeight="bold" sx={{ color: "#334155", mb: 2 }}>
            Images
          </Typography>

          <PhotoProvider>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {images.map((img, index) => (
                <PhotoView src={img} key={index}>
                  <Box
                    component="img"
                    src={img}
                    sx={{
                      width: { xs: "30%", sm: "23%", md: "23%" },
                      height: 140,
                      objectFit: "cover",
                      borderRadius: "12px",
                      cursor: "pointer",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      transition: "0.2s",
                      "&:hover": { transform: "scale(1.03)", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" },
                    }}
                  />
                </PhotoView>
              ))}
            </Box>
          </PhotoProvider>
        </Box>
      )}
    </Box>
  );
};

function StatCard({ label, value }) {
  return (
    <Card
      sx={{
        width: { xs: "47%", sm: "30%", md: "20%" },
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: { xs: "11px", sm: "12px", md: "13px" } }} color="#6b6b6b">
          {label}
        </Typography>
        <Typography sx={{ fontSize: { xs: "18px", sm: "20px", md: "22px" } }} fontWeight="bold" color="var(--text-color)">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default SingleCourse;
