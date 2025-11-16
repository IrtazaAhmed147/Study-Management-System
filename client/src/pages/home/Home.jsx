import React from 'react'
import Box from '@mui/material/Box'
import Sidebar from '../../components/sidebar/Sidebar'
import Typography from '@mui/material/Typography'

function Home() {

  return (
    <>
      <Box sx={{ display: 'flex' }}>

        <Sidebar />
        <Box sx={{width: "100%", backgroundColor:"var(--bg-color)"}}>


          <Box sx={{ display: 'flex', marginTop: '30px', padding: '20px', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>



          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Home