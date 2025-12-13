import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  CircularProgress,
  Button,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import TaskTable from "../../components/tables/TaskTable";
import { useNavigate, useParams } from "react-router-dom";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { getSingleCourseAction } from "../../redux/actions/courseActions";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllResourceAction, getCourseResourcesAction } from "../../redux/actions/resourceActions";
import GradientBtn from "../../components/common/GradientBtn";
import { notify } from "../../utils/HelperFunctions";
import RemoveModal from "../../components/modal/RemoveModal";

const SingleCourse = () => {
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { resources, isLoading } = useSelector((state) => state.resource)
  const { singleCourse, courseIsLoading } = useSelector((state) => state.course)
  const [isModal, setIsModal] = useState(false)

  const { courseId } = useParams()
  useEffect(() => {

    dispatch(getSingleCourseAction(courseId)).then((msg) => {

      dispatch(getCourseResourcesAction(courseId)).then((data) => console.log(data))
      console.log(msg)
    }).catch((msg) => console.log(msg))
  }, []);

  const handleDelete = () => {
    console.log(courseId);

    dispatch(deleteAllResourceAction(courseId)).then((msg) => {
      console.log(courseId);

      dispatch(getCourseResourcesAction(courseId)).then((data) => console.log(data))
      notify('success', msg)
    }).catch((msg) => console.log(msg))
  }



  return (
    <>

      {courseIsLoading && <> <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>  <CircularProgress color="inherit" size="30px" /> </Box></>}


      {!courseIsLoading && <Box sx={{ p: 1, minHeight: "100vh" }}>
        {/* Header */}
        <Typography fontSize="20px" fontWeight={700} sx={{ mb: 1 }}>
          {singleCourse?.title || 'Course Title'}
        </Typography>
        <Typography fontSize="13px" sx={{ mb: 3, color: "#64748b" }}>
          {singleCourse?.description || ''}
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
            <StatCard label="Assignments" value={singleCourse?.assignments?.length} />
            <StatCard label="Quizzes" value={singleCourse?.quizzes?.length} />
            <StatCard label="Materials" value={singleCourse?.resources?.length} />
            {/* <StatCard label="Shared Friends" value={friends?.length} /> */}
          </Box>
        )}

        {/* Assignments */}
        {tab === 1 && (
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", flexWrap: "wrap", gap: 1 }}>
              <Typography fontSize="24px" fontWeight="bold" sx={{ color: "#334155" }}>
                Assignments
              </Typography>


              <GradientBtn
                icon={<AssignmentOutlinedIcon sx={{ fontSize: 18, color: "#4158D0" }} />}
                text="Add Assignment"
                url={"/create/assignment"}
              />
            </Box>
            <TaskTable assignments={singleCourse?.assignments} />
          </Box>
        )}

        {/* Quizzes */}
        {tab === 2 && (
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", flexWrap: "wrap", gap: 1 }}>
              <Typography fontSize="24px" fontWeight="bold" sx={{ color: "#334155" }}>
                Quizzes
              </Typography>
              <GradientBtn
                icon={<AssignmentOutlinedIcon sx={{ fontSize: 18, color: "#4158D0" }} />}
                text="Add Quiz"
                url={"/create/quiz"}
              />
            </Box>
            <TaskTable />
          </Box>
        )}

        {/* Images */}
        {tab === 3 && (
          <Box>



            <Box sx={{ position: "sticky", top: 0, backgroundColor: "var(--bg-color)", display: "flex", mb: 2, justifyContent: "space-between", width: "100%", flexWrap: "wrap", gap: 1 }}>
              <Typography fontSize="24px" fontWeight="bold" sx={{ color: "#334155" }}>
                Images
              </Typography>

              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                {resources?.length > 0 && <>  <Button sx={{ minWidth: "auto", bgcolor: "red", borderRadius: "50%", color: "#fff" }} onClick={() => setIsModal(true)}><DeleteIcon /></Button>
                  <Button sx={{ minWidth: "auto", bgcolor: "var(--primary-color)", borderRadius: "50%", color: "#fff" }}><ArrowDownwardIcon /></Button> </>}
                <GradientBtn
                  icon={<AssignmentOutlinedIcon sx={{ fontSize: 18, color: "#4158D0" }} />}
                  text="Add Images"
                  url={`/add/resources/${singleCourse._id}`}
                />
              </Box>
            </Box>

            {isLoading && <> <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "250px" }}>  <CircularProgress color="inherit" size="30px" /> </Box></>}
            {!isLoading && <PhotoProvider>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {resources?.map((resource, index) => (

                  <PhotoView src={resource.fileUrl} key={index}>
                    <Box
                      component="img"
                      src={resource.fileUrl}
                      sx={{
                        width: { xs: "30%", sm: "23%", md: "23%" },
                        maxHeight: 200,
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
            </PhotoProvider>}
          </Box>
        )}
      </Box>}

      {isModal && <RemoveModal open={isModal} onClose={() => setIsModal(false)} title={'All Photos Delete'} description={''} onConfirm={() => {handleDelete()
        setIsModal(false)}
      } />}
    </>
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
