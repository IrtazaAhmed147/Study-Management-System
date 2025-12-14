import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import LandingNavbar from '../../components/navbar/LandingNavbar'
import FeatureCard from '../../components/cards/FeatureCard'
import BookIcon from '@mui/icons-material/Book';
import AssignmentIcon from '@mui/icons-material/Assignment';
import QuizIcon from '@mui/icons-material/Quiz';
import NoteIcon from '@mui/icons-material/Note';
import LandingPageFooter from '../../components/footer/LandingPageFooter';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function LandingPage() {

  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user])

  return (
    <>

      <Box sx={{ minHeight: "100vh", width: "100%", backgroundColor: "var(--bg-color)", }}>
        <LandingNavbar />
        <Box sx={{ px: { xs: '10px', sm: '20px', md: '20px' } }} >



          <Box id='top' sx={{ mt: 2, width: "100%", height: { xs: "auto", sm: "auto", md: "400px" }, display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
            <Box sx={{ paddingRight: "20px", display: "flex", justifyContent: "center", flexDirection: "column", width: { xs: "100%", sm: "100%", md: "49%" }, height: "100%" }}>
              <Typography mb={1} lineHeight={1} fontWeight={'bold'} sx={{ fontSize: { xs: "33px", sm: '40px', md: '50px' } }} >Keep Your Work Flowing Smoothly</Typography>
              <Typography mb={4} sx={{ fontSize: { xs: "13px", sm: '16px', md: '16px' } }}>Organize, collaborate, and manage your courses
                all in one flow</Typography>
              <Link to={'/signup'} style={{ width: "200px" }}>
                <Button
                  sx={{
                    px: 2,
                    width: "200px",
                    mb: 1,
                    height: "40px",
                    borderRadius: "6px",
                    background: "var(--primary-color)",
                    color: "#fff",
                    transition: "0.3s all ease-in-out",
                    textTransform: "capitalize",
                    fontSize: "16px",
                    display: { xs: "none", sm: "block", md: "block" },
                    ":hover": { background: "var(--primaryHover-color)" },
                  }}
                >
                  Get Started
                </Button>
              </Link>
            </Box>

            {/* image box */}
            <Box sx={{ width: { xs: "100%", sm: "100%", md: "49%" }, height: "100%" }}>

              <Box component={'img'} sx={{ width: "100%", maxHeight: "100%" }} src='/heroImage.png ' />

              <Link to={'/signup'}>
                <Button
                  sx={{
                    px: 2,
                    width: "200px",
                    m: "auto",
                    mb: 1,
                    mt: 2,
                    height: "40px",
                    borderRadius: "6px",
                    background: "var(--primary-color)",
                    color: "#fff",
                    textTransform: "capitalize",
                    fontSize: "16px",
                    display: { xs: "block", sm: "none", md: "none" },
                    ":hover": { backgroundColor: "#1258ad" },
                  }}
                >
                  Get Started
                </Button>
              </Link>

            </Box>
          </Box>


          <Box mb={3} mt={5} id='features'>
            <Typography mb={5} lineHeight={1} textAlign={'center'} fontWeight={'bold'} sx={{ fontSize: { xs: "30px", sm: '33px', md: '50px' } }} >Features</Typography>

            <Box sx={{ display: 'flex', gap: 1, flexWrap: "wrap" }}>

              <FeatureCard
                title="Manage Courses Easily"
                description="Create, organize, and access all your university courses in one dashboard"
              />

              <FeatureCard
                title="Secure Data"
                description="All user information is handled with strong security measures."
              />

              <FeatureCard
                title="Upload & Access Resources"
                description="Keep notes, PDFs, and images safely stored and shared."
              />
              <FeatureCard
                title="Stay Updated"
                description="Get notified about tasks and updates instantly."
              />
            </Box>

          </Box>


          <Box id='about' sx={{ py: 6, }}>
            <Typography mb={3} sx={{ fontWeight: 'bold', textAlign: 'center', fontSize: { xs: "30px", sm: '33px', md: '50px' } }}>
              About Our Platform
            </Typography>

            <Typography variant="body1" mb={5} sx={{ fontSize: { xs: "14px", sm: '16px', md: '16px' }, textAlign: { sm: "center", md: 'center' }, maxWidth: 800, mx: 'auto', color: '#555' }}>
              Our platform makes it easier for you to manage your studies. It brings all your learning materials into one organized and easy-to-use space. Everything is kept in order and easy to access whenever you need it. Focus on what matters most: <strong>learning well</strong> and <strong>keeping up with your studies</strong>.
            </Typography>

            <Grid container spacing={2} justifyContent="center">
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Paper elevation={3} sx={{ p: { xs: 2, sm: 2, md: 3 }, textAlign: 'center', borderRadius: 3, transition: '0.3s', "&:hover": { transform: 'translateY(-5px)', boxShadow: 6 } }}>
                  <BookIcon sx={{ fontSize: { xs: 30, sm: 35, md: 40 }, color: '#2A7DE1', }} />
                  <Typography variant="h6" mb={1}>Courses</Typography>
                  <Typography variant="body2" color="textSecondary">All your courses in one place.</Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Paper elevation={3} sx={{ p: { xs: 2, sm: 2, md: 3 }, textAlign: 'center', borderRadius: 3, transition: '0.3s', "&:hover": { transform: 'translateY(-5px)', boxShadow: 6 } }}>
                  <AssignmentIcon sx={{ fontSize: { xs: 30, sm: 35, md: 40 }, color: '#2A7DE1', }} />
                  <Typography variant="h6" mb={1}>Assignments</Typography>
                  <Typography variant="body2" color="textSecondary">Track and manage all your tasks easily.</Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Paper elevation={3} sx={{ p: { xs: 2, sm: 2, md: 3 }, textAlign: 'center', borderRadius: 3, transition: '0.3s', "&:hover": { transform: 'translateY(-5px)', boxShadow: 6 } }}>
                  <QuizIcon sx={{ fontSize: { xs: 30, sm: 35, md: 40 }, color: '#2A7DE1', }} />
                  <Typography variant="h6" mb={1}>Quizzes</Typography>
                  <Typography variant="body2" color="textSecondary">Prepare and test your knowledge anytime.</Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Paper elevation={3} sx={{ p: { xs: 2, sm: 2, md: 3 }, textAlign: 'center', borderRadius: 3, transition: '0.3s', "&:hover": { transform: 'translateY(-5px)', boxShadow: 6 } }}>
                  <NoteIcon sx={{ fontSize: { xs: 30, sm: 35, md: 40 }, color: '#2A7DE1', }} />
                  <Typography variant="h6" mb={1}>Notes</Typography>
                  <Typography variant="body2" color="textSecondary">Keep your study notes organized and accessible.</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>




        </Box>
        <LandingPageFooter />
      </Box>
    </>
  )
}

export default LandingPage