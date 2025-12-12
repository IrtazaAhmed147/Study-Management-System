import { Box, Button, CircularProgress, MenuItem, Select, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CourseCard from '../../components/cards/CourseCard'
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCourseAction, getUserCoursesAction } from '../../redux/actions/courseActions';
import { notify } from '../../utils/HelperFunctions';
import SuccessModal from '../../components/modal/SuccessModal';
import RemoveModal from '../../components/modal/RemoveModal';
import ShareCourseModal from '../../components/modal/ShareCourseModal';


function CoursePage() {
    const { isLoading, courses, error } = useSelector((state) => state.course)
    const [searchName, setSearchName] = useState("");
    const [courseType, setCourseType] = useState("all");
    const [removeModalState, setRemoveModalState] = useState(false);
    const [shareModalOpen, setShareModalOpen] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState(null);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const name = searchParams.get("courseName") || "";
        const type = searchParams.get("courseType") || "all";

        setSearchName(name);
        setCourseType(type);

        dispatch(getUserCoursesAction({ courseName: name, courseType: type }));
    }, [searchParams]);

    const deleteCourse = (id) => {

        dispatch(deleteCourseAction(id))
            .then((msg) => {
                notify('success', msg);
                dispatch(getUserCoursesAction({
                    courseName: searchName,
                    courseType: courseType
                }));
            })
            .catch((err) => {

                notify('error', err)

                dispatch(getUserCoursesAction({
                    courseName: searchName,
                    courseType: courseType
                }));
            });


    }

    const handleSearch = (type, searchName) => {

        const params = {};
        if (searchName?.trim()) params.courseName = searchName;

        params.courseType = type || 'all';


        setSearchParams(params);

        // API call
        dispatch(getUserCoursesAction(params));
    };
    const handleShare = (userIds) => {
        console.log("Shared with user IDs:", userIds);
        // Call your API to share course with selected users
    };

    return (
        <>

            <Box sx={{ width: "100%", minHeight: "100vh", backgroundColor: "var(--bg-color)", padding: { xs: "10px", sm: "20px", md: "20px" }, pt: "5px !important", }}>

                <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", flexWrap: 'wrap' }}>

                    <Typography variant="h4" fontWeight="bold" color="var(--text-color)" sx={{ mb: 1 }}>
                        Courses
                    </Typography>

                    <Box
                        onClick={() => navigate('/add/course')}
                        sx={{
                            width: { xs: "100%", sm: "48%", md: "250px" },
                            p: "10px 12px",
                            borderRadius: "14px",
                            background: "linear-gradient(135deg, #E7F1FD, #F3F8FF)",
                            display: "flex",
                            mb: 1,
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
                            <FolderCopyOutlinedIcon sx={{ fontSize: 18, color: "#2A7DE1" }} />
                        </Box>

                        <Typography fontSize="14px" fontWeight="600" color="#1e293b">
                            Create Course
                        </Typography>
                    </Box>
                </Box>


                <Box sx={{ display: "flex", width: "100%", gap: 1, justifyContent: "space-between", flexWrap: "wrap", alignItems: "center" }}>

                    <Box sx={{ display: "flex", width: { xs: "100%", sm: "40%", md: "40%" }, }}>


                        <input type="text" placeholder='Search your course' value={searchName} onChange={(e) => setSearchName(e.target.value)} style={{
                            outline: "none",
                            background: "#fff",
                            border: "2px solid #2A7DE1",
                            borderRadius: "5px 0px 0px 5px",
                            padding: "5px 10px",
                            width: "100%",
                            height: "34px"
                        }} />
                        <button onClick={() => handleSearch(courseType, searchName)} style={{ height: "34px", padding: "5px 10px", color: "#fff", background: "var(--primary-color)", borderRadius: "0px 5px 5px 0px", border: "none", }}> <SearchIcon /> </button>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>

                        <Select value={courseType} onChange={(e) => {
                            setCourseType(e.target.value)
                            handleSearch(e.target.value, searchName)
                        }
                        } sx={{ background: "var(--primary-color)", px: "20px", border: "none", color: "#fff", height: "40px", fontSize: "14px" }} defaultValue='all'>
                            <MenuItem value="all">All Courses</MenuItem>
                            <MenuItem value="mycourses">My Courses</MenuItem>
                            <MenuItem value="sharedcourses">Shared Courses</MenuItem>
                        </Select>
                        <Select sx={{ background: "var(--primary-color)", px: "20px", border: "none", color: "#fff", height: "40px", fontSize: "14px" }} defaultValue={"Sort by Latest"}>
                            <MenuItem value="Sort by Latest">Sort by Latest</MenuItem>
                            <MenuItem value="Sort by Ascending">Sort by Ascending</MenuItem>
                            <MenuItem value="Sort by Descending">Sort by Descending</MenuItem>
                        </Select>
                    </Box>


                </Box>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: '10px', marginTop: "20px" }}>
                    {error && (<Typography fontSize={"14px"} margin={'auto'} mt={2}>{error}</Typography>)}
                    {isLoading && !error && <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh", width: "100%" }} >

                        <CircularProgress color="inherit" size="30px" />
                    </Box>}
                    {!isLoading && !error && (
                        courses?.length === 0 ?
                            (<Typography fontSize={"14px"} margin={'auto'} mt={2}>You haven't created any courses yet. Start by creating your first course to get started!</Typography>)
                            : (courses?.map((course) => (

                                <CourseCard key={course._id} {...course} setShareModalOpen={setShareModalOpen} askDelete={(id) => {
                                    setSelectedCourseId(id);
                                    setRemoveModalState(true);
                                }} />
                            ))
                            )
                    )}


                    {/* <SuccessModal msg={"course deleted successfully"} /> */}
                    {removeModalState && <RemoveModal
                        open={removeModalState}
                        onClose={() => setRemoveModalState(false)}
                        onConfirm={() => {
                            deleteCourse(selectedCourseId);
                            setRemoveModalState(false);
                        }}
                        title='Delete Course Confirmation'
                        description='By deleting this course, all associated materials including assignments, quizzes, and other related content will also be permanently removed. This action cannot be undone'
                    />}
                    <ShareCourseModal
                        open={shareModalOpen}
                        onClose={() => setShareModalOpen(false)}
                        onShare={handleShare}
                    />
                </Box>

            </Box>
        </>
    )
}

export default CoursePage