import React, { useRef, useState, useEffect } from "react";
import "./Otp.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { notify } from "../../utils/HelperFunctions";
import { useSelector } from "react-redux";
import { Box, Typography, TextField, Button } from "@mui/material";

function Otp() {
    const otp = useRef(["", "", "", "", "", ""]);
    const token = localStorage.getItem("tempToken");
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [timer, setTimer] = useState(30);

    // Redirect logic
    useEffect(() => {
        if (user) navigate("/");
        else if (!token) navigate("/signup");
    }, [user]);

    // OTP Timer Countdown
    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    // Handle OTP input change
    const handleChange = (value, index) => {
        if (value.length > 1) return;

        otp.current[index] = value;

        // Auto jump to next input
        if (value && index < 5) {
            document.getElementById(`otp-${index + 1}`).focus();
        }
    };

    const handleForm = async (e) => {
        e.preventDefault();

        const filledOtp = otp.current.join("");
        if (filledOtp.length !== 6) {
            notify("error", "OTP must be 6 digits");
            return;
        }

        if (!token) return;

        try {
            const res = await axios.post(
                "http://localhost:3200/api/auth/verifyEmail",
                { otp: filledOtp },
                {
                    withCredentials: true,
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            localStorage.removeItem("tempToken");
            notify("success", res.data.message);
            navigate("/login");
        } catch (error) {
            notify("error", error.response?.data?.message || "Invalid OTP");
        }
    };

    const handleResend = () => {
        setTimer(30);
        notify("success", "OTP Resent Successfully!");
    };

    return (

        <>
            <Box sx={{ width: '100%', minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>


                <Typography mb={1} lineHeight={1} fontWeight={'bold'} sx={{ pl: 2,pt:2, fontSize: { xs: "33px", sm: '40px', md: '50px' } }} >My Idea</Typography>
                <Box
                    sx={{
                        minHeight: "80vh",
                        background: "var(--bg-color)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        p: 2,
                    }}
                >


                    <Box
                        sx={{
                            width: { xs: "95%", sm: "420px" },
                            background: "#fff",
                            boxShadow: "0 8px 20px rgba(0,0,0,0.07)",
                            borderRadius: "15px",
                            p: {xs:1,sm:3,md:4},
                            textAlign: "center",
                        }}
                    >
                        {/* Heading */}
                        <Typography
                            sx={{
                                fontSize: "24px",
                                fontWeight: 700,
                                background: "linear-gradient(to right, #2563eb, #3b82f6)",
                                WebkitBackgroundClip: "text",
                                color: "transparent",
                                mb: 1,
                            }}
                        >
                            Email Verification
                        </Typography>

                        <Typography sx={{ fontSize: "13px", color: "#64748b", mb: 3 }}>
                            Enter the 6-digit OTP sent to your email
                        </Typography>

                        {/* OTP INPUTS */}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mb: 3,
                            }}
                        >
                            {[0, 1, 2, 3, 4, 5].map((i) => (
                                <TextField
                                    key={i}
                                    id={`otp-${i}`}
                                    onChange={(e) => handleChange(e.target.value, i)}
                                    inputProps={{
                                        maxLength: 1,
                                        style: {
                                            textAlign: "center",
                                            fontSize: "18px",
                                            padding: 0,
                                        },
                                    }}
                                    sx={{
                                        width: {xs:"15%",sm:"45px",md:"48px"},
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "10px",
                                            height: "50px",
                                        },
                                    }}
                                />
                            ))}
                        </Box>

                        {/* Verify Button */}
                        <Button
                            fullWidth
                            onClick={handleForm}
                            sx={{
                                background: "var(--primary-color)",
                                color: "#fff",
                                height: "45px",
                                borderRadius: "10px",
                                fontSize: "14px",
                                fontWeight: 600,
                                "&:hover": {
                                    background: "var(--primaryHover-color)",
                                },
                            }}
                        >
                            Verify OTP
                        </Button>

                        {/* Resend OTP */}
                        <Box sx={{ mt: 2 }}>
                            {timer > 0 ? (
                                <Typography sx={{ fontSize: "13px", color: "#94a3b8" }}>
                                    Resend OTP in <b>{timer}s</b>
                                </Typography>
                            ) : (
                                <Typography
                                    onClick={handleResend}
                                    sx={{
                                        fontSize: "13px",
                                        color: "var(--primary-color)",
                                        fontWeight: 600,
                                        cursor: "pointer",
                                    }}
                                >
                                    Resend OTP
                                </Typography>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default Otp;
