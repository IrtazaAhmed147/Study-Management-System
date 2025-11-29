import { Box, Typography } from '@mui/material'
import React from 'react'

function NotificationCard({name, msg, course , time}) {
    return (
        <Box sx={{mt:1,  boxShadow: "0 4px 12px rgba(0,0,0,0.12)", height: "60px", padding: "10px", backgroundColor: "#fff", display: "flex",gap:'10px',alignItems:"center" ,borderRadius:"5px"}}>

            <Box sx={{height:"100%"}}>
                <Box sx={{ height: '100%', borderRadius: '50%' }} component={'img'} src='https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg' />
            </Box>
            <Box>

                 <Typography  sx={{fontSize:{xs:"13px",sm:"14px",md:"14px",color:"#2e2e2eff"}}} fontWeight={"bold"} color='var(--text-color)'>{name} <span style={{color:"#000"}}>{msg} </span> in {course}</Typography>
       
                <Typography  sx={{fontSize:{xs:"10px",sm:"12px",md:"13px"}}} color='#9f9f9f'>{time} ago</Typography>

            </Box>

        </Box>
    )
}

export default NotificationCard