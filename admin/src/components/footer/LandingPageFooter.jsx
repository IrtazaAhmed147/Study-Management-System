import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { Link } from 'react-router-dom';

const LandingPageFooter = () => {
    return (
        <Box
            sx={{
                background: "var(--primary-color)",
                color: "white",
                py: 5,
                px: { xs: 3, md: 8 },
                mt: 10
            }}
        >
            <Stack
                direction={{ xs: "column", md: "row" }}
                justifyContent="space-between"
                alignItems={{ xs: "flex-start", md: "center" }}
                spacing={3}
            >

                {/* Left Section */}
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        My Idea
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, maxWidth: 350, opacity: 0.9 }}>
                        Organize your courses, assignments, notes, and study materials in one smart space.
                    </Typography>
                </Box>

                {/* Middle Quick Links */}


                {/* Contact Section */}
                <Box>
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
                        Contact Us
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <EmailIcon />
                        <a style={{ color: "#fff" }} href="mailto:example@gmail.com">example@gmail.com</a>
                    </Stack>
                </Box>

            </Stack>

            <Box display={'flex'} justifyContent={'center'} mt={4} gap={2}>

                <Link to={`/privacypolicy`}>
                    <Typography
                        // variant="body2"
                        color="#fff"
                        sx={{ textAlign: "center", opacity: 0.8 }}
                    >
                        Privacy Policy
                    </Typography>
                </Link>

                <Link to={`/termsandcondition`}>
                    <Typography
                        color="#fff"
                        // variant="body2"
                        sx={{ textAlign: "center", opacity: 0.8 }}
                    >
                        Terms & Conditions
                    </Typography>
                </Link>
            </Box>
            <Typography
                variant="body2"
                sx={{ textAlign: "center", opacity: 0.8 }}
            >
                © {new Date().getFullYear()} My Idea. All rights reserved.
            </Typography>
            {/* Bottom Text */}
        </Box>
    );
};

export default LandingPageFooter;
