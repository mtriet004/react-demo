import React from 'react'
import { useSelector } from 'react-redux';
import { updateProfile } from '../../service/APIService';
import { useState, useEffect } from 'react';
import { LuImagePlus } from "react-icons/lu";
import { toast } from 'react-toastify';

const Profile = () => {

    const account = useSelector(state => state.user.account)
    const [username,setUsername] = useState({})
    const [email, setEmail] = useState({})
    const [role, setRole] = useState({})
    const [image, setImage] = useState('')
    const [previewImage, setPreviewImage] = useState('')

    useEffect(() =>{
        setUsername(account.username)
        setEmail(account.email)
        setRole(account.role)
        setImage(account.image)
        if(account.image){
            setPreviewImage(`data:image/jpeg;base64,${account.image}`)
        }
    },[account])

    const handleUploadImage = (e) =>{
        if(e.target && e.target.files && e.target.files[0]){
            setPreviewImage(URL.createObjectURL(e.target.files[0])) //hàm cực căng
            setImage(e.target.files[0])
    } 
    }

    const handleUpdateProfile = async () =>{
        let res = await updateProfile(account.username, account.image)
        if(res && res.EC===0){
            toast.success(res.EM)
            
        } else {
            toast.error(res.EM)
        }
    }

  return (
    <div className='profile'>
        <form className='row'>
        <div className='col-md-4'>
            <label className='form-label'>Username</label>
            <input 
                type='text'
                name='username'
                value={username}
                className='form-control'
                onChange={(e) => setUsername(e.target.value)}
            ></input>
        </div>
        <div className='col-md-4'>
            <label className='form-label'>Email</label>
            <input disabled
                type='email'
                name='email'
                value={email}
                className='form-control'
                onChange={(e) => setEmail(e.target.value)}
            ></input>
        </div>
        <div className="col-md-4">
            <label  className="form-label">Role</label>
            <select className="form-select" onChange={(e) => setRole(e.target.value)} disabled value={role}>
                <option value='USER'>USER</option>
                <option value='ADMIN'>ADMIN</option>
            </select>
        </div>
        <div className='col-md-12'>
            <label className='form-label label-upload' htmlFor='labelUpload'>
                Upload File Image <LuImagePlus />
            </label>
            <input type='file' id='labelUpload' hidden
            onChange={(e) => handleUploadImage(e)}
            ></input>
         </div>
         <div className='col-md-12 img-preview'>
            {previewImage ? 
                <img alt='' src={previewImage}></img>
                :
                <span>Preview Image</span>
            }
        </div>
        </form>
        <button className='btn btn-success' onClick={() => handleUpdateProfile()}>aa</button>
    </div>
  )
}

export default Profile