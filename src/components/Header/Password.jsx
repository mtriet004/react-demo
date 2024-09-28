import React, { useState } from 'react'
import { RxEyeOpen } from "react-icons/rx";
import { PiEyeClosedLight } from "react-icons/pi";
import { changePass } from '../../service/APIService';
import { toast } from 'react-toastify';

const Password = () => {

    const [password, setPassword] = useState('')
    const [newPass, setNewPass] = useState('')
    const [repeatPass, setRepeatPass] = useState('')
    const [isShowPass, setIsShowPass] = useState(false)

    const handleChangePass = async () =>{
        let res = await changePass(password, newPass)
        // console.log(res)
        if(res && res.EC ===0){
            if(newPass === repeatPass){
                toast.success(res.EM)
            } else {
                toast.error('New Pass and Confirm pass are different, try again!')
            }
        } else {
            toast.error(res.EM)
        }
       
    }
  return (
    <div className='pass'>
        <form className='row'>
            <div className='col-md-6'>
                <label className='form-label'>Current Password</label>
                <input
                    type='text'
                    className='form-control'
                    name='pass'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
            </div>
            <div className='col-md-6 pass-group'>
                <label className='form-label'>New Password</label>
                <input
                    type={isShowPass ? 'text' : 'password'}
                    name='newPass'
                    className = 'form-control'
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                ></input>
                {isShowPass
                    ? <span className='icon-eyes' onClick={() => setIsShowPass(false)}><RxEyeOpen  /></span>
                    : <span className='icon-eyes' onClick={() => setIsShowPass(true)}><PiEyeClosedLight  /></span>
                }  
            </div>
            <div className='col-md-6 pass-group'>
                <label className='form-label'>Confirm Password</label>
                <input
                    type='password'
                    name='repeatPass'
                    className = 'form-control'
                    value={repeatPass}
                    onChange={(e) => setRepeatPass(e.target.value)}
                ></input>
            </div>
        </form>
        <button className='btn btn-warning' style={{float: 'right'}} onClick={() => handleChangePass()}>Save</button>
    </div>
  )
}

export default Password