import { Box, List, ListItem, Tab, Tabs, Typography } from '@mui/material'
import React, { useState } from 'react'
import TaskTable from '../../components/tables/TaskTable'
import CourseCard from '../../components/cards/CourseCard'

function UserDetailPage() {
    const [tab, setTab] = useState(0);
    return (
        <Box

            sx={{ width: "100%", minHeight: "91vh", backgroundColor: "var(--bg-color)", padding: { xs: "10px", sm: "20px", md: "20px" }, pt: "0px !important", }}
        >
            <Box sx={{ display: "flex", mb: 2, width: "100%", flexDirection: "column", justifyContent: "space-between" }}>

                <Box sx={{ width: "100%", justifyContent: "space-between" }}>

                    <Box sx={{ borderTopLeftRadius: "10px", width: "100%", background: "#fff", padding: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.12)", height: "150px", gap: '10px', alignItems: "center", display: "flex", }}>


                        <Box sx={{ height: '90%', borderRadius: '50%' }} component={'img'} src='https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg' />
                        <Box>

                            <Typography fontWeight={'bold'} fontSize={'30px'} color='var(--text-color)'>Irtaza Ahmed Khatri</Typography>
                            <Typography fontSize={'14px'} color='#9f9f9f'>example@gmail.com</Typography>
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
                                <Typography fontSize="13px" color="var(--text-color)">irtaza123</Typography>
                            </ListItem>

                            <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "start", width: "30%", textAlign: "start" }}>
                                <Typography fontSize="13px" fontWeight='bold' color="#9f9f9f">Full Name</Typography>
                                <Typography fontSize="13px" color="var(--text-color)">Irtaza Ahmed</Typography>
                            </ListItem>

                            <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "start", width: "30%", textAlign: "start" }}>
                                <Typography fontSize="13px" fontWeight='bold' color="#9f9f9f">Email</Typography>
                                <Typography fontSize="13px" color="var(--text-color)">example@gmail.com</Typography>
                            </ListItem>

                            <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "start", width: "30%", textAlign: "start" }}>
                                <Typography fontSize="13px" fontWeight='bold' color="#9f9f9f">University</Typography>
                                <Typography fontSize="13px" color="var(--text-color)">ABC University</Typography>
                            </ListItem>

                            <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "start", width: "30%", textAlign: "start" }}>
                                <Typography fontSize="13px" fontWeight='bold' color="#9f9f9f">Field</Typography>
                                <Typography fontSize="13px" color="var(--text-color)">Computer Science</Typography>
                            </ListItem>

                            <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "start", width: "30%", textAlign: "start" }}>
                                <Typography fontSize="13px" fontWeight='bold' color="#9f9f9f">Phone Number</Typography>
                                <Typography fontSize="13px" color="var(--text-color)">0312-1234567</Typography>
                            </ListItem>
                            <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "start", width: "30%", textAlign: "start" }}>
                                <Typography fontSize="13px" fontWeight='bold' color="#9f9f9f">Gender</Typography>
                                <Typography fontSize="13px" color="var(--text-color)">Male</Typography>
                            </ListItem>


                        </List>
                    </Box>


                </Box>
            </Box>

            <Tabs
                value={tab}
                onChange={(e, val) => setTab(val)}
                sx={{
                    mb: 3,
                    "& .MuiTab-root": { fontSize: { xs: "10px", sm: "12px", md: "12px" }, textTransform: "none", p: { xs: "8px 8px", sm: "8px 16px", md: "8px 16px" }, minWidth: "auto" },
                }}
            >
                <Tab label="Quizzes" />
                <Tab label="Assignments" />
                <Tab label="Courses" />
            </Tabs>

            {tab == 0 && <><Typography variant="h4" fontWeight="bold" color="var(--text-color)" sx={{ mb: 1 }}>
                Tasks
            </Typography>

                <TaskTable /> </>}
            {tab == 1 && <><Typography variant="h4" fontWeight="bold" color="var(--text-color)" sx={{ mb: 1 }}>
                Tasks
            </Typography>

                <TaskTable /> </>}

            {tab == 2 && <> <Typography variant="h4" fontWeight="bold" color="var(--text-color)" sx={{ mb: 1 }}>
                Courses
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: '10px', marginTop: "20px" }}>

                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard /> 

            </Box> </>}
        </Box >
    )
}

export default UserDetailPage