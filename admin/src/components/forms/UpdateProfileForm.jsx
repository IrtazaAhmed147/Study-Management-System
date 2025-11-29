import { Box, CircularProgress, MenuItem, Select, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import CameraAltIcon from '@mui/icons-material/CameraAlt';

function UpdateProfileForm() {
    return (
        <>

        
            <form className="form  profile-form" style={{ paddingTop: '10px', width: "100%", marginTop: '10px', flexDirection: "row" }}  >


                <Box sx={{m:"auto",mb:2, width: "270px", borderRadius: "20px", bgcolor: "#fff", boxShadow: "0 4px 5px rgba(0,0,0,0.12)", display: "flex", justifyContent: "center", alignItems: "center", height: "300px", flexDirection: "column", }}>

                    <Box sx={{ height: '50%', width: "50%", bgcolor: "#fff", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: '50%', position: "relative" }}>


                        <Box sx={{ height: '95%', borderRadius: '50%' }} component={'img'} src='https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg' />



                        <label
                            htmlFor="fileUpload"
                            style={{
                                bottom: '5%',
                                right: '2%',
                                position: "absolute",
                                background: "var(--primary-color)",
                                color: "#fff",
                                borderRadius: "50%",
                                cursor: "pointer",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                border: "3px solid #fff",
                                height: "40px",
                                width: "40px"
                            }}
                        >
                            <CameraAltIcon />
                        </label>

                        <input
                            id="fileUpload"
                            type="file"
                            style={{ display: "none" }}
                        />

                    </Box>

                    <Typography color='var(--text-color)' fontWeight={'bold'}>Username</Typography>
                    <Typography color='#575757dd' fontSize={"13px"}>example123@gmail.com</Typography>

                </Box>
                <Box sx={{ width: {xs:"100%",sm:"90%",md:"70%"}, display: "flex", flexWrap: "wrap", gap: '5px' }}>


                            <Box sx={{width:{xs:"100%",sm:"45%",md:"45%"}}}>

                    <Box sx={{ width: '100%',height:"70px" }}>

                        <Box className="flex-column">
                            <label>FullName </label></Box>
                        <Box className="inputForm" sx={{ height: "40px", width: "100%", boxShadow: "0 4px 5px rgba(0,0,0,0.12)" }} >
                            <input placeholder="Enter your fullname" name='fullname' className="input" type="text" required />
                        </Box>
                    </Box>


                    <Box sx={{ width: '100%',height:"70px" }}> <Box className="flex-column">
                        <label>University</label></Box>
                        <Box className="inputForm" sx={{ height: "40px", width: "100%", boxShadow: "0 4px 5px rgba(0,0,0,0.12)" }}>
                            <input placeholder="Enter your university" name='university' className="input" type="text" required />
                        </Box>
                    </Box>


                    <Box sx={{ width: '100%',height:"70px" }}> <Box className="flex-column">
                        <label>Field</label></Box>
                        <Box className="inputForm" sx={{ height: "40px", width: "100%", boxShadow: "0 4px 5px rgba(0,0,0,0.12)" }}>
                            <input placeholder="Enter your Field" name='university' className="input" type="text" required />
                        </Box>
                    </Box>

                            </Box>
                            <Box sx={{width:{xs:"100%",sm:"45%",md:"45%"}}}>

                    <Box sx={{ width: '100%',height:"70px" }}> <Box className="flex-column">
                        <label>Phone No</label></Box>
                        <Box className="inputForm" sx={{ height: "40px", width: "100%", boxShadow: "0 4px 5px rgba(0,0,0,0.12)" }}>
                            <input placeholder="Enter your Phone no" name='university' className="input" type="text" required />
                        </Box>
                    </Box>


                    <Box sx={{ width: '100%',height:"70px" }}>  <div className="flex-column">
                        <label>Gender </label></div>
                        <Select sx={{ height: '40px', width: "100%", boxShadow: "0 4px 5px rgba(0,0,0,0.12)", backgroundColor: '#fff' }} defaultValue={'select gender'}>


                            <MenuItem value='select gender'>Select Gender</MenuItem>
                            <MenuItem value='male'>Male</MenuItem>
                            <MenuItem value='female'>Female</MenuItem>
                        </Select>

                    </Box>





                            </Box>
                    {/* {error && <p>{error}</p>} */}


                </Box>

            </form>
            <button className="btn" style={{width:"270px"}}>
                {/* {isLoading && <CircularProgress color="inherit" size="20px" />} */}

                Update Profile</button>
        </>
    )
}

export default UpdateProfileForm