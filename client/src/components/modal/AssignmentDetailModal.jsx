import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Grid,
    Box,
    Divider
} from "@mui/material";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";


const AssignmentDetailModal = ({ open, handleClose, assignment }) => {

    const images = assignment?.attachments?.filter(file => file.mimetype?.startsWith("image"));
    const pdfs = assignment?.attachments?.filter(file => file.mimetype === "application/pdf");
    const txtFiles = assignment?.attachments?.filter(file => file.mimetype === "text/plain");

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: "16px",
                    paddingY: 1.5,
                },
            }}
        >
            {/* Title */}
            <DialogTitle
                sx={{
                    fontWeight: "600",
                    fontSize: "20px",
                    pb: 1,
                    color: "var(--text-color)",
                }}
            >
                {assignment?.title}
            </DialogTitle>

            <Divider />

            <DialogContent sx={{ mt: 2 }} dividers>
                {/* Course & Due Date */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        mb: 3,
                    }}
                >
                    <Typography sx={{ fontSize: "15px", color: "gray" }}>
                        <strong style={{ color: "var(--text-color)" }}>Course:</strong>{" "}
                        {assignment?.courseId?.title}
                    </Typography>

                    <Typography sx={{ fontSize: "15px", color: "gray" }}>
                        <strong style={{ color: "var(--text-color)" }}>Due Date:</strong>{" "}
                        {assignment?.dueDate}
                    </Typography>
                </Box>

                {/* Description */}
                <Typography
                    sx={{
                        fontWeight: "600",
                        fontSize: "16px",
                        mb: 0.5,
                        color: "var(--text-color)",
                    }}
                >
                    Description
                </Typography>

                <Typography
                    sx={{
                        mb: 3,
                        mt: 0.5,
                        lineHeight: 1.7,
                        fontSize: "15px",
                        color: "gray",
                    }}
                >
                    {assignment?.description}
                </Typography>

                {/* Images */}
                {images?.length > 0 && (
                    <PhotoProvider>
                        <Grid container spacing={2}>
                            {images.map((img, idx) => (
                                <Grid item xs={12} sm={4} key={idx}>
                                    <PhotoView src={img.url}>
                                        <Box component="img" src={img.url} sx={{ width: "100%", height: 140, objectFit: "cover", borderRadius: "12px", cursor: "pointer" }} />
                                    </PhotoView>
                                </Grid>
                            ))}
                        </Grid>
                    </PhotoProvider>
                )}

                {/* PDFs */}
                {pdfs?.length > 0 && pdfs.map((pdf, idx) => (
                    <Box key={idx} sx={{ mb: 3, height: 600, border: '1px solid #ccc', borderRadius: 2 }}>
                        <iframe
                            src={pdf.url}  // ideally signed URL or proxy route
                            width="100%"
                            height="100%"
                            style={{ border: 'none', borderRadius: '8px' }}
                            title={pdf.name || `PDF ${idx + 1}`}
                        />
                    </Box>
                ))}


                {/* TXT */}
                {txtFiles?.length > 0 && txtFiles.map((txt, idx) => (
                    <Button key={idx} href={txt.url} target="_blank" rel="noopener noreferrer">
                        {txt.name || `View File ${idx + 1}`}
                    </Button>
                ))}

            </DialogContent>

            <DialogActions sx={{ padding: 2 }}>
                <Button
                    onClick={handleClose}
                    variant="outlined"
                    sx={{
                        textTransform: "none",
                        fontSize: "14px",
                        borderRadius: "10px",
                    }}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AssignmentDetailModal;
