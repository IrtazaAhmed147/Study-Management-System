import React, { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Dialog,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import TaskTable from "../../components/tables/TaskTable";
import { useNavigate } from "react-router-dom";

const SingleCourse = () => {
  const [tab, setTab] = useState(0);

  // Sample Data
  const images = ["https://www.researchgate.net/publication/324485726/figure/fig1/AS:732731210207236@1551708142406/Entity-Relationship-Diagram-ERD-of-the-database.png", "https://www.researchgate.net/publication/324485726/figure/fig1/AS:732731210207236@1551708142406/Entity-Relationship-Diagram-ERD-of-the-database.png", "https://www.researchgate.net/publication/324485726/figure/fig1/AS:732731210207236@1551708142406/Entity-Relationship-Diagram-ERD-of-the-database.png", "https://www.researchgate.net/publication/324485726/figure/fig1/AS:732731210207236@1551708142406/Entity-Relationship-Diagram-ERD-of-the-database.png", "https://www.researchgate.net/publication/324485726/figure/fig1/AS:732731210207236@1551708142406/Entity-Relationship-Diagram-ERD-of-the-database.png", "https://www.researchgate.net/publication/324485726/figure/fig1/AS:732731210207236@1551708142406/Entity-Relationship-Diagram-ERD-of-the-database.png", "https://www.researchgate.net/publication/324485726/figure/fig1/AS:732731210207236@1551708142406/Entity-Relationship-Diagram-ERD-of-the-database.png", "https://www.researchgate.net/publication/324485726/figure/fig1/AS:732731210207236@1551708142406/Entity-Relationship-Diagram-ERD-of-the-database.png", "https://www.researchgate.net/publication/324485726/figure/fig1/AS:732731210207236@1551708142406/Entity-Relationship-Diagram-ERD-of-the-database.png", "https://www.researchgate.net/publication/324485726/figure/fig1/AS:732731210207236@1551708142406/Entity-Relationship-Diagram-ERD-of-the-database.png", "https://www.shutterstock.com/image-vector/hand-written-scribble-illustration-mathematical-260nw-76768936.jpg", "https://www.shutterstock.com/image-vector/hand-written-scribble-illustration-mathematical-260nw-76768936.jpg", "https://www.shutterstock.com/image-vector/hand-written-scribble-illustration-mathematical-260nw-76768936.jpg", "https://www.shutterstock.com/image-vector/hand-written-scribble-illustration-mathematical-260nw-76768936.jpg", "https://www.shutterstock.com/image-vector/hand-written-scribble-illustration-mathematical-260nw-76768936.jpg", "https://www.shutterstock.com/image-vector/hand-written-scribble-illustration-mathematical-260nw-76768936.jpg", "https://www.shutterstock.com/image-vector/hand-written-scribble-illustration-mathematical-260nw-76768936.jpg", "https://www.shutterstock.com/image-vector/hand-written-scribble-illustration-mathematical-260nw-76768936.jpg",
    

  ];
  const pdfs = [{ name: "Lecture 1 - Introduction.pdf" }, { name: "HTML Notes.pdf" },];

  const assignments = [{ title: "Assignment 1", due: "5 Dec", status: "Completed" }, { title: "Assignment 2", due: "10 Dec", status: "Pending" },]; const quizzes = [{ title: "Quiz 1", marks: 10, status: "Completed" }, { title: "Quiz 2", marks: 15, status: "Pending" },]; const friends = [{ name: "Ali", img: "/avatar1.png" }, { name: "Sara", img: "/avatar2.png" }, { name: "Hamza", img: "/avatar3.png" },];

  const [openImage, setOpenImage] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate()

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Box sx={{ p: 1, minHeight: "100vh" }}>
      {/* ================= HEADER ================= */}
      <Typography fontSize="20px" fontWeight={700} sx={{ mb: 1 }}>
        Course Title
      </Typography>
      <Typography fontSize="13px" sx={{ mb: 3, color: "#64748b" }}>
        Short description of your course goes here. Very clean and minimal.
      </Typography>

      {/* ================= TABS ================= */}
      <Tabs
        value={tab}
        onChange={(e, val) => setTab(val)}
        sx={{
          mb: 3,
          "& .MuiTab-root": { fontSize: { xs: "10px", sm: "12px", md: "12px" }, textTransform: "none", p: { xs: "8px 8px", sm: "8px 16px", md: "8px 16px" }, minWidth: "auto" },
        }}
      >
        <Tab label="Overview" />
        <Tab label="Assignments" />
        <Tab label="Quizzes" />
        <Tab label="Images" />
        <Tab label="Pdfs" />
      </Tabs>

      {/* ===========================================================
            TAB 0 – OVERVIEW
      =========================================================== */}
      {tab === 0 && (
        <Box sx={{ display: "flex", gap: {xs:1,sm:1,md:2}, flexWrap: "wrap", mb: 4 }}>
          <StatCard label="Assignments" value={assignments.length} />
          <StatCard label="Quizzes" value={quizzes.length} />
          <StatCard label="Materials" value={images.length + pdfs.length} />
          <StatCard label="Shared Friends" value={friends.length} /> </Box>
      )}


      {tab === 1 && (
        <Box >
          <Box sx={{display:"flex",justifyContent:"space-between",width:"100%",flexWrap:"wrap",gap:1}}>

          <Typography fontSize="24px" fontWeight={'bold'} sx={{ color: "#334155" }}>
            Assigments
          </Typography>
           <Box
              onClick={() => navigate('/create/assignment')}
              sx={{
                width: { xs: "100%", sm: "48%", md: "250px" },
                p: "10px 12px",
                borderRadius: "14px",
                background:"linear-gradient(135deg, #E7F1FD, #F3F8FF)",
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
              {/* Icon Bubble */}
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

              {/* Title */}
              <Typography fontSize="14px" fontWeight="600" color="#1e293b">
              Add  Assigments
              </Typography>
                </Box>
            </Box>
          <TaskTable />
        </Box>
      )}
       {tab === 2 && (
        <Box >
          <Box sx={{display:"flex",justifyContent:"space-between",width:"100%",flexWrap:"wrap",gap:1}}>

          <Typography fontSize="24px" fontWeight={'bold'} sx={{ color: "#334155" }}>
            Quizzes
          </Typography>
           <Box
              onClick={() => navigate('/create/quiz')}
              sx={{
                width: { xs: "100%", sm: "48%", md: "250px" },
                p: "10px 12px",
                borderRadius: "14px",
                background:"linear-gradient(135deg, #E7F1FD, #F3F8FF)",
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
              {/* Icon Bubble */}
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

              {/* Title */}
              <Typography fontSize="14px" fontWeight="600" color="#1e293b">
              Add  Quiz
              </Typography>
                </Box>
            </Box>
          <TaskTable />
        </Box>
      )}


      {tab === 3 && (
        <Box>
          <Typography fontSize="24px" fontWeight={'bold'} sx={{ color: "#334155" }}>
            Images
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            {images.map((img, index) => (
              <Box
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setOpenImage(true);
                }}
                sx={{
                  width: { xs: "30%", sm: "23%", md: "23%" },
                  maxHeight: "300px",
                  borderRadius: "10px",
                  overflow: "hidden",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  transition: "0.2s",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <Box
                  component="img"
                  src={img}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      )}

      <Dialog
        open={openImage}
        fullWidth
        maxWidth="md"
        disableEscapeKeyDown
        onClose={() => { }}
        PaperProps={{
          sx: {
            maxWidth: "80vw !important",
            background: "#000",
            borderRadius: "10px",
            p: 0,
            position: "static",
          },
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={() => setOpenImage(false)}
          sx={{
            position: "absolute",
            right: 10,
            top: 10,
            color: "#fff",
            zIndex: 10,
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Image */}
        <Box sx={{ width: "100%", }}>
          <Box
            component="img"
            src={images[currentIndex]}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />

          {/* Prev */}
          <IconButton
            onClick={handlePrev}
            sx={{
              position: "absolute",
              left: 10,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#fff",
            }}
          >
            <KeyboardArrowLeftIcon fontSize="large" />
          </IconButton>

          <Box sx={{ borderRadius: 3, position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)", color: "#fff", width: "200px", height: "60px", backgroundColor: "#00000030", textAlign: "center", p: 2 }}>
            <Typography fontWeight={"bold"} fontSize={"20px"} >{currentIndex + 1}/{images.length}</Typography>
          </Box>

          {/* Next */}
          <IconButton
            onClick={handleNext}
            sx={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#fff",
            }}
          >
            <ChevronRightIcon fontSize="large" />
          </IconButton>
        </Box>
      </Dialog>
    </Box>
  );
};



function StatCard({ label, value }) {
  return (
    <Card sx={{ width: { xs: "47%",sm:"30%", md: "20%" }, backgroundColor: "#fff", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", }} >
      <CardContent>
        <Typography sx={{fontSize: { xs: "11px", sm:"12px",md: "13px" }}} color="#6b6b6b">{label}</Typography>
        <Typography sx={{fontSize: { xs: "18px", sm:"20px",md: "22px" }}}  fontWeight="bold" color="var(--text-color)"> {value} </Typography>
      </CardContent>
    </Card>
  );
}


export default SingleCourse;
