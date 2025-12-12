import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Box
} from "@mui/material";

const AssignmentDetailModal = ({ open, handleClose, assignment }) => {
//   if (!assignment) return null;
console.log(assignment);


  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      {/* Title */}
      <DialogTitle sx={{ fontWeight: "bold", fontSize: "22px" }}>
        {assignment?.title}
      </DialogTitle>

      <DialogContent dividers>
        {/* Course + Due Date */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1">
            <strong>Course:</strong> {assignment?.courseId?.title}
          </Typography>

          <Typography variant="subtitle1">
            <strong>Due Date:</strong> {assignment?.dueDate}
          </Typography>
        </Box>

        {/* Description */}
        <Typography sx={{ mb: 3, lineHeight: 1.6 }}>
          {assignment?.description}
        </Typography>

        {/* Images Section */}
        {assignment?.images?.length > 0 && (
          <>
            <Typography sx={{ mb: 1 }}><strong>Images:</strong></Typography>

            <Grid container spacing={2}>
              {assignment?.images.map((img, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Box
                    component="img"
                    src={img}
                    alt={`assignment-img-${index}`}
                    sx={{
                      width: "100%",
                      height: 140,
                      objectFit: "cover",
                      borderRadius: "8px",
                      border: "1px solid #ddd"
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        )}

        {/* PDF Button */}
        {assignment?.pdfUrl && (
          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              href={assignment?.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View PDF
            </Button>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} variant="outlined">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignmentDetailModal;
