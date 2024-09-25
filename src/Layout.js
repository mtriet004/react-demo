import React from 'react'
import {Route, Routes} from 'react-router-dom'
import App from './App';
import Admin from './components/Admin/Admin';
// import User from './components/User/User';
import HomePage from './components/Home/HomePage';
import ManageUser from './components/Admin/Content/ManageUser';
import DashBoard from './components/Admin/Content/DashBoard';
import Login from './components/Auth/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './components/Auth/Signup';
import ListQuiz from './components/User/ListQuiz';
import DetailQuiz from './components/User/DetailQuiz';
import ManageQuiz from './components/Admin/Content/Quiz/ManageQuiz';
import Questions from './components/Admin/Content/Question/Questions';
import PrivateRoute from './routes/PrivateRoute';

const NotFound = () =>{
  <div className='alert alert-danger'>404. Link not exists, please try again!</div>
}
const Layout = (props) => {
  return (
    <>
        <Routes>
            <Route path='/' element={<App />}>
                <Route index element={<HomePage />}></Route>  
                <Route path='users' element={
                  <PrivateRoute>
                      <ListQuiz />
                  </PrivateRoute>
                }></Route>
            </Route>
            <Route path='/admins' element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
              }>
                <Route index element={<DashBoard />}></Route>  
                <Route path='manage-users' element={<ManageUser />}></Route>
                <Route path='manage-quizzes' element={<ManageQuiz />}></Route>
                <Route path='manage-questions' element={<Questions />}></Route>
            </Route>
            <Route path='/quiz/:id' element={<DetailQuiz />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='*' element={<NotFound />}></Route>
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