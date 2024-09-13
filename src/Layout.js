import React from 'react'
import {Route, Routes} from 'react-router-dom'
import App from './App';
import Admin from './components/Admin/Admin';
import User from './components/User/User';
import HomePage from './components/Home/HomePage';
import ManageUser from './components/Admin/Content/ManageUser';
import DashBoard from './components/Admin/Content/DashBoard';
import Login from './components/Auth/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = (props) => {
  return (
    <>
        <Routes>
            <Route path='/' element={<App />}>
                <Route index element={<HomePage />}></Route>  
                <Route path='users' element={<User />}></Route>
            </Route>
            <Route path='/admins' element={<Admin />}>
                <Route index element={<DashBoard />}></Route>  
                <Route path='manage-users' element={<ManageUser />}></Route>
            </Route>

            <Route path='/login' element={<Login />}></Route>
        </Routes>   

        <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />  
    </>
  )
}

export default Layout