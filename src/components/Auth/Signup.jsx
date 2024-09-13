import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Signup.scss'
import { signup } from '../../service/APIService'
import { RxEyeOpen } from "react-icons/rx";
import { toast } from 'react-toastify';
import { PiEyeClosedLight } from "react-icons/pi";
const Signup = () => {
    const [email, setEmail] = useState('')
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    
    const navigator = useNavigate()

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

    const handleSignup = async () =>{
        //validate email
        const isValidEmail = validateEmail(email)
        if(!isValidEmail){
            toast.error('invalid email!')
            return
        } 

        if(!password){
            toast.error('invalid password!')
            return
        }

        //submit
        let data = await signup(email, password, username)
        if(data && data.EC === 0){
            console.log(data)
            toast.success(data.EM)
            navigator('/login')
        }
          
        if (data && data.EC !==0){
            toast.error(data.EM)
        }
    }   
  return (
    <div className='signup-container'>
        <div className='header'>
            <span>Already have an account?</span>
            <button onClick={() => {navigator('/login')}}>Login</button>
        </div>
        <div className='title col-md-4 mx-auto'>
            Cực Căng
        </div>
        <div className='welcome col-md-4 mx-auto'>
            Signup
        </div>
        <div className='content-form col-4 mx-auto'>
            <div className='form-group'>
                <label className='form-label'>Email (*)</label>
                <input
                    type='email'
                    value={email}
                    className='form-control'
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
            </div>
           
            <div className='form-group pass-group'>
                <label className='form-label'>Password (*)</label>
                <input
                    type= {isShowPassword ? 'type' : 'password'}
                    value={password}
                    className='form-control'
                    onChange={(e) => setPassword(e.target.value)} 
                />
                {isShowPassword ?
                    <span className='icons-eye' onClick={() => setIsShowPassword(false)}>
                        <RxEyeOpen />
                    </span>
                    :
                    <span className='icons-eye' onClick={() => setIsShowPassword(true)}>
                        <PiEyeClosedLight />
                    </span>
                }
            </div>
            <div className='form-group'>
                <label className='form-label'>Username</label>
                <input
                    type='text'
                    value={username}
                    className='form-control'
                    onChange={(e) => setUsername(e.target.value)}
                ></input>
            </div>
            <button className='btn-signup' onClick={() => handleSignup()}>Signup</button>
            <span onClick={() => {navigator('/')}} style={{cursor: 'pointer'}}> &#60;&#60; Return to homepage</span>
        </div>
    </div>
  )
}

export default Signup