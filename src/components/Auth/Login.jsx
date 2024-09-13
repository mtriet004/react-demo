import React, { useState } from 'react'
import './Login.scss'
import {useNavigate} from 'react-router-dom'
import { login } from '../../service/APIService'
import { toast } from 'react-toastify'

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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

        //submit API
        let data = await login(email, password)
        console.log('check data', data)
        if(data && data.EC === 0){
            toast.success(data.EM)
            navigator('/')
        }
          
        if (data && data.EC !==0){
            toast.error(data.EM)
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
                <button className='btn-submit'
                onClick={() => handleLogin()}>Login</button>
            </div>
            <div>
                <span className='back' onClick={() => {navigator('/')}}> &#60;&#60; Go to homepage</span>
            </div>
        </div>
    </div>
  )
}

export default Login