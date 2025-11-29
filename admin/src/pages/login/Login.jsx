import { Link, useNavigate } from 'react-router-dom'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './login.css'
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/actions/authActions';
import { Box, CircularProgress, Typography } from '@mui/material';
import { notify } from '../../utils/HelperFunctions';
import { useState } from 'react';
import LandingNavbar from '../../components/navbar/LandingNavbar';
function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [showPass, setShowPass] = useState(false)
    const { isLoading, error, user } = useSelector((state) => state.auth)
    const form = useRef({})


    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user])

    const handleForm = async (e) => {
        e.preventDefault()

        if (!form.current.username.trim() || !form.current.password.trim()) return;

        dispatch(loginUser(form.current))
            .then((msg) => notify('success', msg))
            .catch((err) => notify('error', err))


    }
    const handleShowPassword = () => {
        setShowPass((prev) => !prev)
    }


    return (
        <>

            <Box sx={{ width: '100%', minHeight: '100vh', backgroundColor: 'var(--bg-color)'}}>

                 <LandingNavbar  authBtn={false}/>
                <Box sx={{ width: '100%', height: '85vh', backgroundColor: 'var(--bg-color)', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>

                    <Box sx={{ width: { xs: '90%', md: '450px', sm: '450px' }, backgroundColor: 'var(--bg-color)' }}>
                      
                        <form className="form" onSubmit={handleForm}  >
                            <Box className="flex-column">
                                <label>Username </label></Box>
                            <Box className="inputForm">
                                <input placeholder="Enter your username" name='username' className="input" type="text" onChange={(e) => form.current = { ...form.current, [e.target.name]: e.target.value }} required />
                            </Box>

                            <Box className="flex-column">
                                <label>Password </label></Box>
                            <Box className="inputForm">
                                <input placeholder="Enter your Password" name='password' onChange={(e) => form.current = { ...form.current, [e.target.name]: e.target.value }} className="input" type={showPass ? "text" : "password"} required />
                                <Box onClick={handleShowPassword} sx={{ cursor: 'pointer' }}>
                                    {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </Box>
                            </Box>

                            <Box className="flex-row">
                                <span className="span">Forgot password?</span>
                            </Box>
                            {/* {error && <p>{error}</p>} */}
                            <button disabled={isLoading} className="btn">
                                {isLoading && <CircularProgress color="inherit" size="20px" />}

                                Sign In</button>
                          
                        </form>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Login