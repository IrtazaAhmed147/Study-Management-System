import React, { useEffect } from 'react'
import UpdateProfileForm from '../../components/forms/UpdateProfileForm'
import { Box, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getSingleUserAction, updateUserAction } from '../../redux/actions/userActions'
import { notify } from '../../utils/HelperFunctions'

function UpdateProfilePage() {

    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const { singleUser } = useSelector((state) => state.user)
    const { username } = useParams()

    useEffect(() => {
        dispatch(getSingleUserAction(user._id)).then((msg) => console.log(msg))
    }, [])

    const handleUpdate = (data) => {
        const formData = new FormData()
        if(!data?.fullname?.trim()) {
            notify('error', "Fullname required")
            return
        }
        formData.append("fullname", data?.fullname )
        formData.append("university", data?.university)
        formData.append("field", data?.field)
        formData.append("gender", data?.gender)
        formData.append("phone", data?.phone)
        formData.append("profilePic", data?.profilePic)

        console.log(data);
        

        dispatch(updateUserAction(user._id, formData)).then((msg)=> notify('success', msg))
    }

    return (

        <>
            <Box sx={{ width: "100%", minHeight: "100vh", backgroundColor: "var(--bg-color)", padding: { xs: "10px", sm: "20px", md: "20px" }, pt: "5px !important", }}>
                <Typography variant="h4" fontWeight="bold" color="var(--text-color)" sx={{ mb: 2 }}>
                    Update Profile
                </Typography>
                <UpdateProfileForm {...singleUser} handleUpdate={handleUpdate} />
            </Box>

        </>

    )
}

export default UpdateProfilePage