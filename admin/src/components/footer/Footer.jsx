import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: {xs:'column',sm:'row',md:'row'},
        width: "100%",
        background: "var(--primary-color)",
        color: "#fff",
        padding: { xs: "10px", sm: "10px 20px", md: "10px 20px" },
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "13px",
      }}
    >
      {/* Left Text */}
      <Typography sx={{ fontSize: "12px" }}>
        © {new Date().getFullYear()} MyIdea - All rights reserved.
      </Typography>

      {/* Right Links */}
      <Box sx={{ display: "flex", gap: "5px" }}>
        <Link to={'/privacypolicy'}  style={{ color: "#fff", fontSize: "12px" }}>
          Privacy
        </Link>
        <Link to={'/termsandcondition'} style={{ color: "#fff", fontSize: "12px" }}>
          Terms
        </Link>

      </Box>
    </Box>
  );
}

export default Footer;
