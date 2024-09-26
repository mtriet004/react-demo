import React, { useState } from 'react'
import './Login.scss'
import {useNavigate} from 'react-router-dom'
import { login } from '../../service/APIService'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { doLogin } from '../../redux/action/userAction'
import { ImSpinner10 } from "react-icons/im";
import { RxEyeOpen } from "react-icons/rx";
import { PiEyeClosedLight } from "react-icons/pi";
import { FaHome } from "react-icons/fa";
import Language from '../Header/Language'

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const [isLoading,setIsLoading] = useState(false)
    const [isShowPassword, setIsShowPassword] = useState(false)

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
    };

    const handleLogin = async() =>{
        //validate
        const isValidEmail = validateEmail(email)
        if(!isValidEmail){
            toast.error('invalid email!')
            return
        } 

        if(!password){
            toast.error('invalid password!')
            return
        }
        setIsLoading(true)
        //submit API
        let data = await login(email, password)
        // console.log('check data', data)
        if(data && data.EC === 0){
            dispatch(doLogin(data))
            toast.success(data.EM)
            setIsLoading(false)
            navigator('/')
        }
          
        if (data && data.EC !==0){
            toast.error(data.EM)
            setIsLoading(false)
        }
    }

    const navigator = useNavigate()

    const handleKeyDown = (e) =>{
        if(e && e.key === 'Enter'){
            handleLogin()
        }
    }
  return (
    <div className='login-container'>
        <div className='header'>
            <span>Don't have an account yet?</span>
            <button onClick={() => {navigator('/signup')}}>Sign up</button>
            <Language />
        </div>
        <div className='title col-4 mx-auto'>
            Cực Căng
        </div>
        <div className='welcome col-4 mx-auto'>
            Login 
        </div>  
        <div className='content-form col-4 mx-auto'>
            <div className='form-group'>
                <label>Email</label>
                <input type='email'
                 className='form-control'
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            <div className='form-group pass-group'>
                <label>Password</label>
                <input
                 type= {isShowPassword ? 'text' : 'password'}
                 className='form-control'
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 onKeyDown={e => handleKeyDown(e)}
                 ></input>
                 {isShowPassword
                 ?
                   <span className='icon-eyes' onClick={() => setIsShowPassword(false)}><RxEyeOpen/></span> 
                 :
                   <span className='icon-eyes' onClick={() => setIsShowPassword(true)}><PiEyeClosedLight /></span>
                 }
            </div>
            <span className='forgot-password'>Forgot password?</span>
            <div>
                <button className='btn-submit '
                    onClick={() => handleLogin()}
                    disabled={isLoading}
                >
                    {isLoading === true && <ImSpinner10 className='loader-icon'/> }
                    <span> Login </span>
                </button>
            </div>
            <div>
                <span className='back' onClick={() => {navigator('/')}} > <FaHome /> Go to homepage</span>
            </div>
        </div>
    </div>
  )
}

export default Login