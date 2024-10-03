import React, { useState } from 'react'
import SideBar from './SideBar'
import './Admin.scss'
import {FaBars} from 'react-icons/fa'
import { Outlet, useNavigate} from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar'
import Language from '../Header/Language';
import NavDropdown from 'react-bootstrap/NavDropdown'
import { useTranslation } from 'react-i18next';
import { logout } from '../../service/APIService';
import { useDispatch, useSelector } from 'react-redux';
import { doLogout } from '../../redux/action/userAction';
import { toast } from 'react-toastify';

const Admin = (props) => {

  const account = useSelector(state => state.user.account)
  const disPatch = useDispatch()
  const {t} = useTranslation()
  const [collapsed, setCollapsed] = useState(false)
  const navigator = useNavigate()

  const handleLogout = async () =>{
    let res = await logout(account.email, account.refresh_token)
    if(res && res.EC===0){
      disPatch(doLogout)
      navigator('/')
    } else {
      toast.error(res.EM)
    }
  }

  return (
    <div className='admin-container'>
      <div className='admin-sidebar'>
        <SideBar collapsed={collapsed}/>
      </div>
      <div className='admin-content'>
        <div className='admin-header'>
          <span onClick={() => setCollapsed(!collapsed)}> <FaBars className='leftside'/></span>
          <div className='rightside'> 
            <Language style={{marginLeft: '10px'}}/>
            <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item >{t('admin.button.tt')}</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleLogout()}>{t('admin.button.Logout')}</NavDropdown.Item>
          </NavDropdown>          
          </div>      
        </div>      
          <div className='admin-main'>
            <PerfectScrollbar>
              <Outlet />
            </PerfectScrollbar>
          </div>   
      </div>     
    </div>
  )
}

export default Admin