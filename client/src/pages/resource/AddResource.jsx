import { Box, Button, IconButton, Paper, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from 'react-redux';
import { uploadResourceAction } from '../../redux/actions/resourceActions';
import { useNavigate, useParams } from 'react-router-dom';
import { notify } from '../../utils/HelperFunctions';
function AddResource() {

    const form = useRef({})

    const [coverFiles, setCoverFiles] = useState([]);
    const [coverPreviews, setCoverPreviews] = useState([]);
    const {courseId} = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isLoading} = useSelector((state)=> state.resource)

     const uploadFiles = async () => {
    
            const formData = new FormData();
            // formData.append("title", form.current.title);
            
    
            coverFiles.forEach((file, index) => {
                formData.append("materials", file);
            });
    
    
                dispatch(uploadResourceAction(courseId, formData)).then((msg) => {
                    notify("success", msg)
                    navigate(`/course/${courseId}`)
                })
    
        }
    const handleCoverUpload = (e) => {
        const files = Array.from(e.target.files);

        const previews = files.map(file => ({
            url: URL.createObjectURL(file),
            isOld: false
        }));

        setCoverFiles(prev => [...prev, ...files]);
        setCoverPreviews(prev => [...prev, ...previews]);

    };

    const removeImage = (index) => {

        const removed = coverPreviews[index];
        setCoverPreviews(prev => prev.filter((_, i) => i !== index));
        if (!removed.isOld) {
            setCoverFiles(prev => prev.slice(0, prev.length - 1));
        }
    };
    return (
        <>
            <Box sx={{ p: 2, width: "100%", mx: "auto", minHeight: "100vh" }}>
                <Typography
                    sx={{
                        mb: 3,
                        fontWeight: 600,
                        fontSize: "18px",
                        color: "var(--text-color)"
                    }}
                >
                    Add Images
                </Typography>
                <Typography sx={{ mb: 1, fontSize: "12px", color: "#6b7280" }}>
                    Title
                </Typography>
                <input
                    type="text"
                    name="title"
                    defaultValue={form.current.title}
                    onChange={(e) => form.current = { ...form.current, [e.target.name]: e.target.value }}
                    placeholder="Enter title"
                    style={{
                        outline: "none",
                        background: "#fff",
                        border: "1px solid #cfd3d8",
                        borderRadius: "6px",
                        padding: "6px 10px",
                        width: "100%",
                        height: "34px",
                        fontSize: "13px"
                    }}
                />


                <Box sx={{ width: "100%" }}>
                    <Typography sx={{ mb: 1 }}>Upload Files</Typography>

                    <Paper
                        variant="outlined"
                        sx={{
                            border: "2px dashed #bfc6d1",
                            minHeight: "250px",
                            borderRadius: "10px",
                            padding: 1,
                            cursor: "pointer",
                            background: "#f8fafc",
                        }}
                        onClick={() => document.getElementById("coverUpload").click()}
                    >
                        {coverPreviews.length === 0 ? (
                            <Box
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#6b7280"
                                }}
                            >
                                <CloudUploadIcon sx={{ fontSize: 40 }} />
                                <Typography>Upload Images</Typography>
                                <Typography sx={{ fontSize: "12px" }}>
                                    (You can upload multiple images)
                                </Typography>
                            </Box>
                        ) : (
                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 1,
                                }}
                            >
                                {coverPreviews.map((img, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            width: { xs: "48%", sm: "48%", md: "32%" },
                                            maxHeight: "250px",
                                            position: "relative",
                                        }}
                                    >
                                        {/* Remove Button */}
                                        <IconButton
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeImage(index);
                                            }}
                                            sx={{
                                                position: "absolute",
                                                top: 4,
                                                right: 4,
                                                background: "#fff",
                                                borderRadius: "50%",
                                                boxShadow: "0 0 4px rgba(0,0,0,0.2)",
                                            }}
                                        >
                                            <CloseIcon sx={{ fontSize: "16px" }} />
                                        </IconButton>

                                        {/* Image */}
                                        <img
                                            src={img?.url}
                                            alt="preview"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                borderRadius: "6px",
                                            }}
                                        />
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </Paper>

                    {/* Hidden Input */}
                    <input
                        type="file"
                        accept="image/*,application/pdf,text/plain"
                        multiple
                        id="coverUpload"
                        style={{ display: "none" }}
                        onChange={handleCoverUpload}
                    />
                </Box>
                <Box sx={{ mt: 4 }}>
                    <Button
                    disabled={isLoading}
                        onClick={() => uploadFiles()}
                        sx={{
                            padding: " 5px 10px",
                            width: "160px",
                            height: "35px",
                            borderRadius: "5px",
                            background: "var(--primary-color)",
                            color: "#fff",
                            textTransform: "capitalize",
                            fontSize: "13px",
                            ":hover": {
                                backgroundColor: "#1258ad",
                            }
                        }}
                    >
                        Upload
                    </Button>
                </Box>
            </Box>
        </>
    )
}

export default AddResource