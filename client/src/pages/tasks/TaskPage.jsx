import React, { useEffect, useState } from 'react'
import TaskTable from '../../components/tables/TaskTable'
import { Box, MenuItem, Select, Typography, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAssignmentAction, getSingleAssignmentAction, getUserAssignmentsAction, updateAssignmentAction } from '../../redux/actions/assignmentActions'
import AssignmentDetailModal from '../../components/modal/AssignmentDetailModal'
import RemoveModal from '../../components/modal/RemoveModal'
import { notify } from '../../utils/HelperFunctions'

function TaskPage() {

  const dispatch = useDispatch()
  const { isLoading, assignments } = useSelector((state) => state.assignments)
  const [isModal, setIsModal] = useState(false);
  const [updateData, setUpdateData] = useState({})
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const [removeModalState, setRemoveModalState] = useState(false);
  useEffect(() => {
    dispatch(getUserAssignmentsAction()).then((data) => console.log(data)
    );

  }, [])


  const handleUpdate = (id, data) => {
    // console.log(ids);

    dispatch(updateAssignmentAction(id, data))
      .then((msg) => {
        notify('success', msg);
        dispatch(getUserAssignmentsAction());
      })
      .catch((err) => {

        notify('error', err)

        dispatch(getUserAssignmentsAction());
      });


  }
  const deleteCourse = (ids) => {
    console.log(ids);

    dispatch(deleteAssignmentAction(ids._id, ids.courseId))
      .then((msg) => {
        notify('success', msg);
        dispatch(getUserAssignmentsAction());
      })
      .catch((err) => {

        notify('error', err)

        dispatch(getUserAssignmentsAction());
      });


  }


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

      <TaskTable assignments={assignments}
        // setUpdateData={setUpdateData}
        // setSelectedCourseId={setSelectedCourseId}
        handleUpdate={handleUpdate}
        setSelectedItem={setSelectedItem}
        selectedItem={selectedItem}
        askDelete={(ids) => {
          setSelectedCourseId(ids);
          setRemoveModalState(true);
        }} viewModal={(item) => {
          setSelectedAssignment(item);
          setIsModal(true);
        }} />

      {isModal && <AssignmentDetailModal open={isModal}
        handleClose={() => setIsModal(false)} assignment={selectedAssignment} />}

      {removeModalState && <RemoveModal
        open={removeModalState}
        onClose={() => setRemoveModalState(false)}
        onConfirm={() => {
          deleteCourse(selectedCourseId);
          setRemoveModalState(false);
        }}
        title='Delete Assignment Confirmation'
        description='By deleting this course, all associated materials including assignments, quizzes, and other related content will also be permanently removed. This action cannot be undone'
      />}


    </Box>
  )
}

export default TaskPage
