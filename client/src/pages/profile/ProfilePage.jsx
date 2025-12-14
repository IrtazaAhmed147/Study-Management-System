import { Box, CircularProgress, List, ListItem, Typography } from '@mui/material'
import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { getSingleUserAction } from '../../redux/actions/userActions';
import { useNavigate, useParams } from "react-router-dom";
function ProfilePage() {


  const { user } = useSelector((state) => state.auth)
  console.log(user);
  
  const { isLoading } = useSelector((state) => state.user)
 
  return (
    <>

      {isLoading && <> <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>  <CircularProgress color="inherit" size="30px" /> </Box></>}
    {!isLoading&&  <Box

        sx={{ width: "100%", height: "91vh", display: "flex", justifyContent: "space-between", backgroundColor: "var(--bg-color)", padding: { xs: "10px", sm: "20px", md: "20px" }, pt: "0px !important", }}
      >
        <Box sx={{ display: "flex", width: "100%", flexDirection: "column", justifyContent: "space-between" }}>

          <Box sx={{ width: "100%", justifyContent: "space-between" }}>
            <Box sx={{ borderTopLeftRadius: "10px", width: "100%", background: "#fff", padding: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.12)", height: "150px", gap: '10px', alignItems: "center", display: "flex", }}>


              <Box sx={{ height: '90%', borderRadius: '50%' }} component={'img'} src={user?.profilePic || 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'} />
              <Box>

                <Typography fontWeight={'bold'} fontSize={'30px'} color='var(--text-color)'>{user?.fullname}</Typography>
                <Typography fontSize={'14px'} color='#9f9f9f'>{user?.email || 'example@gmail.com'}</Typography>
              </Box>

            </Box>
            <Box
              sx={{
                borderTopRightRadius: "10px",
                width: "100%",
                background: "#fff",
                mt: 3,
                padding: "10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
              }}
            >
              <List sx={{ display: "flex", flexWrap: "wrap" }}>

                <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "start", width: "30%", textAlign: "start" }}>
                  <Typography fontSize="13px" fontWeight='bold' color="#9f9f9f">Username</Typography>
                  <Typography fontSize="13px" color="var(--text-color)">{user?.username}</Typography>
                </ListItem>

                <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "start", width: "30%", textAlign: "start" }}>
                  <Typography fontSize="13px" fontWeight='bold' color="#9f9f9f">Full Name</Typography>
                  <Typography fontSize="13px" color="var(--text-color)">{user?.fullname}</Typography>
                </ListItem>

                <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "start", width: "30%", textAlign: "start" }}>
                  <Typography fontSize="13px" fontWeight='bold' color="#9f9f9f">Email</Typography>
                  <Typography fontSize="13px" color="var(--text-color)">{user?.email}</Typography>
                </ListItem>

                <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "start", width: "30%", textAlign: "start" }}>
                  <Typography fontSize="13px" fontWeight='bold' color="#9f9f9f">University</Typography>
                  <Typography fontSize="13px" color="var(--text-color)">{user?.university}</Typography>
                </ListItem>

                <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "start", width: "30%", textAlign: "start" }}>
                  <Typography fontSize="13px" fontWeight='bold' color="#9f9f9f">Field</Typography>
                  <Typography fontSize="13px" color="var(--text-color)">{user?.field}</Typography>
                </ListItem>

                <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "start", width: "30%", textAlign: "start" }}>
                  <Typography fontSize="13px" fontWeight='bold' color="#9f9f9f">Phone Number</Typography>
                  <Typography fontSize="13px" color="var(--text-color)">{user?.phone}</Typography>
                </ListItem>
                <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "start", width: "30%", textAlign: "start" }}>
                  <Typography fontSize="13px" fontWeight='bold' color="#9f9f9f">Gender</Typography>
                  <Typography fontSize="13px" color="var(--text-color)">{user?.gender}</Typography>
                </ListItem>


              </List>
            </Box>


            <Box
              onClick={() => navigate("/update-profile")}
              sx={{
                mt: 2,
                p: 3,
                mb: 3,
                borderRadius: 2,
                bgcolor: "#fff",
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                cursor: "pointer",
                transition: "0.2s all",
                "&:hover": { boxShadow: "0 4px 20px rgba(0,0,0,0.12)" },
              }}
            >
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{ fontSize: { xs: 13, sm: 14, md: 15 } }}
              >
                Update Profile
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: { xs: 11, sm: 12, md: 13 }, color: "#555", mt: 0.5 }}
              >
                Click to update your profile information.
              </Typography>
            </Box>
          </Box>


        </Box>



      </Box> }
    </>
  )
}

export default ProfilePage