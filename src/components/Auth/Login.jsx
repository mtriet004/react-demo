import React, { useState } from 'react'
import './Login.scss'
import {useNavigate} from 'react-router-dom'
import { login } from '../../service/APIService'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { doLogin } from '../../redux/action/userAction'
import { ImSpinner10 } from "react-icons/im";

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const [isLoading,setIsLoading] = useState(false)
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
  return (
    <div className='login-container'>
        <div className='header'>
            <span>Don't have an account yet?</span>
            <button onClick={() => {navigator('/signup')}}>Sign up</button>
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
            <div className='form-group'>
                <label>Password</label>
                <input type='password'
                 className='form-control'
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 ></input>
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
                <span className='back' onClick={() => {navigator('/')}}> &#60;&#60; Go to homepage</span>
            </div>
        </div>
    </div>
  )
}

export default Login