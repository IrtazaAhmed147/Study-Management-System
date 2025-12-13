import { Box, Typography } from '@mui/material'
import React from 'react'
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

function SuccessModal({ msg }) {
    return (

        <Box sx={{width:"100%", minHeight:"100vh", position:"absolute",zIndex:8,top:0,left:0}}>

            <Box sx={{ boxShadow: "0 4px 14px rgba(0,0,0,0.08)", zIndex:9,position: "absolute", top: "45%", minWidth: "200px", p: 2, height: "70px", display:"flex", alignItems:"center",left: "45%", bgcolor: "white" }}>

                <Typography sx={{ display:"flex",alignItems:"center",gap:1,fontSize: "14px",color:"var(--text-color)" }}>{msg} <CheckCircleOutlineIcon sx={{ color:"green",fontSize: "14px",fontWeight:"bold" }} /></Typography>

            </Box>
        </Box>
    )
}

export default SuccessModal