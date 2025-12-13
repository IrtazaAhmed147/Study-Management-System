import { Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
function GradientBtn({icon, text, url}) {
    const navigate = useNavigate()
    return (
        <Box
            onClick={() => navigate(url)}
            sx={{
                width: { xs: "100%", sm: "48%", md: "250px" },
                p: "10px 12px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #E7F1FD, #F3F8FF)",
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
                    {icon}
                            </Box>
            <Typography fontSize="14px" fontWeight="600" color="#1e293b">
                {text}
            </Typography>
        </Box>
    )
}

export default GradientBtn