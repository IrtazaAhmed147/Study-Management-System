import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from './layout/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/login/Login.jsx';
import CoursePage from './pages/courses/CoursePage.jsx';
import UserPage from './pages/user/UserPage.jsx';
import UserDetailPage from './pages/user/UserDetailPage.jsx';
import SingleCourse from './pages/courses/SingleCourse.jsx';

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        <Route element={<Layout />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/users' element={<UserPage />} />
          <Route path='/user/:id' element={<UserDetailPage />} />
          <Route path='/courses' element={<CoursePage />} />
          <Route path='/course/:courseId' element={<SingleCourse />} />
        </Route>

      </Routes>
    </>
  );
}

export default App;
