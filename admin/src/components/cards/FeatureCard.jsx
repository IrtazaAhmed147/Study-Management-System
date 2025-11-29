import { Box, Typography } from "@mui/material";
import React from "react";

const FeatureCard = ({ title, description }) => {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #ffffff, #f3f6f9)",
        borderRadius: "16px",
        padding: "18px",
        width: {xs:"100%",sm:"48%",md:"24%"},
        minHeight: "120px",
        boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
        border: "1px solid #e6e8ec",
        cursor: "pointer",

        "&:hover": {
          boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
          transform: "translateY(-3px)",
        },
      }}
    >
      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: 600,
          mb: 1,
          color: "#1a1d23",
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          fontSize: "14px",
          color: "#555",
          lineHeight: 1.4,
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default FeatureCard;
