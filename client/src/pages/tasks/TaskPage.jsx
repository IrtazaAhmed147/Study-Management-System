import React, { useEffect, useState } from 'react'
import TaskTable from '../../components/tables/TaskTable'
import { Box, MenuItem, Select, Typography, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleAssignmentAction, getUserAssignmentsAction } from '../../redux/actions/assignmentActions'
import AssignmentDetailModal from '../../components/modal/AssignmentDetailModal'

function TaskPage() {

  const dispatch = useDispatch()
  const { isLoading, assignments } = useSelector((state) => state.assignments)
  const [isModal, setIsModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);


  const [selectedCourseId, setSelectedCourseId] = useState(null);
  useEffect(() => {
    dispatch(getUserAssignmentsAction()).then((data) => console.log(data)
    );

  }, [])

  useEffect(() => {
  if (selectedCourseId) {
    dispatch(getSingleAssignmentAction(selectedCourseId))
      .then((res) => {
        setSelectedAssignment(res); // store data
      });
  }
}, [selectedCourseId]);



  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: 'var(--bg-color)',
        padding: { xs: "10px", sm: "20px", md: "20px" }, pt: "5px !important",
      }}
    >
      {/* Page Title */}
      <Typography
        variant="h4"
        fontWeight="bold"
        color="var(--text-color)"
        sx={{ mb: 3 }}
      >
        Tasks
      </Typography>

      {/* Filters */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          mb: 3,
        }}
      >
        {/* Task Type */}
        <Select
          sx={{
            background: 'var(--primary-color)',
            color: '#fff',
            height: 40,
            fontSize: 14,
            borderRadius: 1,
            flex: '1 1 150px', // responsive width
            minWidth: 120,
          }}
          defaultValue="Type"
        >
          <MenuItem value="Type">Type</MenuItem>
          <MenuItem value="Assignment">Assignment</MenuItem>
          <MenuItem value="Quiz">Quiz</MenuItem>
        </Select>

        {/* Status */}
        <Select
          sx={{
            background: 'var(--primary-color)',
            color: '#fff',
            height: 40,
            fontSize: 14,
            borderRadius: 1,
            flex: '1 1 150px',
            minWidth: 120,
          }}
          defaultValue="Status"
        >
          <MenuItem value="Status">Status</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
        </Select>

        {/* Course */}
        <Select
          sx={{
            background: 'var(--primary-color)',
            color: '#fff',
            height: 40,
            fontSize: 14,
            borderRadius: 1,
            flex: '1 1 150px',
            minWidth: 120,
          }}
          defaultValue="Course"
        >
          <MenuItem value="Course">Course</MenuItem>
          <MenuItem value="DB">DB</MenuItem>
          <MenuItem value="OOP">OOP</MenuItem>
        </Select>

        {/* Due Date */}
        <TextField
          type="date"
          variant="outlined"
          size="small"
          sx={{
            bgcolor: '#fff',
            borderRadius: 1,
            '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
            '& .MuiInputBase-input': { height: 40, padding: '0 14px' },
            flex: '1 1 150px',
            minWidth: 120,
          }}
        />
      </Box>

      {/* Task Table */}

      <TaskTable assignments={assignments} viewModal={(id) => {
        setSelectedCourseId(id);
        setIsModal(true);
      }} />

      {isModal && <AssignmentDetailModal open={isModal}
        handleClose={() => setIsModal(false)} assignment={selectedAssignment}/>}
    </Box>
  )
}

export default TaskPage
