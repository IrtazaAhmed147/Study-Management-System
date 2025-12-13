import React, { useEffect, useRef, useState } from "react";
import {
    Box,
    Typography,
    MenuItem,
    Button,
    Paper,
    Select,
    CircularProgress
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { createCourseAction, getSingleCourseAction, updateCourseAction } from "../../redux/actions/courseActions";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "../../utils/HelperFunctions";
import { useSearchParams } from "react-router-dom";

const categories = [
    "Select Category",
    "Data Management",
    "Web Development",
    "Design",
    "AI & ML",
    "Business",
];

export default function AddCoursePage() {

    const form = useRef({ description: "" })
    const [render, setRender] = useState(false);

    const formRef = useRef();

    const dispatch = useDispatch()
    const { isLoading } = useSelector((state) => state.course)

    const [typeParam, setTypeParam] = useSearchParams()
    useEffect(() => {

        if (typeParam.get("type") === 'edit' && typeParam.get("id")) {
            dispatch(getSingleCourseAction(typeParam.get("id"))).then((courseData) => {

                form.current = {
                    title: courseData.title,
                    description: courseData.description,
                };
                setRender((p) => !p);


            })
        }
    }, [])

    const handleForm = async (e) => {
        e.preventDefault()


        if (!form.current.title.trim()) return;
        // if( typeParam.get("type") && typeParam.get("id")) return;
        if (typeParam.get("type") === 'edit' && typeParam.get("id")) {
            dispatch(updateCourseAction(typeParam.get("id") ,form.current))
                .then((msg) => {

                    // formRef.current.reset();
                    // form.current = {};
                    notify('success', msg)
                })
                .catch((err) => notify('error', err))

        } else {
            dispatch(createCourseAction(form.current))
                .then((msg) => {

                    formRef.current.reset();
                    form.current = {
                        
                    title: "",
                    description: ""
                    };
                    notify('success', msg)
                })
                .catch((err) => notify('error', err))

        }




    }

    return (
        <Box sx={{ p: 2, width: "100%", minHeight: "100vh", mx: "auto" }}>

            {/* Heading */}
            <Typography
                sx={{
                    mb: 3,
                    fontWeight: 600,
                    fontSize: "18px",
                    color: "var(--text-color)"
                }}
            >
                {typeParam.get("type") === 'edit' ? "Edit" : 'Create New'} Course
            </Typography>

            <form ref={formRef} onSubmit={handleForm}>
                <Box>

                    <Box>
                        {/* Course Title */}
                        <Typography sx={{ mb: 1, fontSize: "12px", color: "#6b7280" }}>
                            Course Title
                        </Typography>
                        <input
                            defaultValue={form.current.title}
                            type="text"
                            placeholder="Enter course title"
                            name="title"
                            onChange={(e) => form.current = { ...form.current, [e.target.name]: e.target.value }}
                            style={{
                                outline: "none",
                                background: "#fff",
                                border: "1px solid #cfd3d8",
                                borderRadius: "6px",
                                padding: "8px 12px",
                                width: "100%",
                                height: "36px",
                                fontSize: "13px"
                            }}
                        />

                        {/* Category */}
                        {/* <Typography sx={{ mt: 2, mb: 1, fontSize: "12px", color: "#6b7280" }}>
                        Select Category
                        </Typography>
                        <Select
                        fullWidth
                        size="small"
                        defaultValue={"Select Category"}
                        sx={{
                            bgcolor: "#fff",
                            fontSize: "13px",
                            height: "40px",
                            borderRadius: "6px",
                            }}
                            >
                            {categories.map((cat) => (
                                <MenuItem key={cat} value={cat} sx={{ fontSize: "13px" }}>
                                {cat}
                                </MenuItem>
                                ))}
                                </Select> */}

                        {/* Description */}
                        <Typography sx={{ mt: 2, mb: 1, fontSize: "12px", color: "#6b7280" }}>
                            Description
                        </Typography>
                        <textarea
                            defaultValue={form.current.description}
                            name="description"
                            onChange={(e) => form.current = { ...form.current, [e.target.name]: e.target.value }}

                            rows={7}
                            placeholder="Write something about your course..."
                            style={{
                                outline: "none",
                                background: "#fff",
                                border: "1px solid #cfd3d8",
                                borderRadius: "6px",
                                padding: "10px 12px",
                                width: "100%",
                                fontSize: "13px",
                                resize: "vertical",
                            }}
                        ></textarea>
                    </Box>


                </Box>

                {/* ACTION BUTTONS */}
                <Box sx={{ mt: 4, display: "flex", gap: 2 }}>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        sx={{

                            px: 2,
                            width: "150px",
                            height: "35px",
                            borderRadius: "6px",
                            border: "2px solid #1258ad",
                            background: "var(--primary-color)",
                            color: "#fff",
                            textTransform: "capitalize",
                            fontSize: "13px",
                            ":hover": { backgroundColor: "#1258ad" },
                        }}
                    >
                        {isLoading && <CircularProgress color="inherit" size="20px" />}
                        {typeParam.get("type") === 'edit' ? "Edit" : 'Create'} Course
                    </Button>
                </Box>
            </form>
        </Box>
    );
}
