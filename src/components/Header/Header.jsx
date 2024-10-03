import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../service/APIService';
import {toast} from 'react-toastify'
import { doLogout } from '../../redux/action/userAction';
import Language from './Language';
import { FaReact } from "react-icons/fa";
import { useTranslation} from 'react-i18next';
import { useState } from 'react';
import ModalProfileUser from './ModalProfileUser';

const Header = () => {

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
  const account = useSelector(state => state.user.account)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isShowModalProfile, setIsShowModalProfile] = useState(false)

  const { t } = useTranslation();

  const handleLogin = () =>{
    navigate('/login')
  }

  const handleLogout = async () =>{
    let res = await logout(account.email, account.refresh_token)
    if(res && res.EC === 0){
      //clear data redux
      dispatch(doLogout)
      navigate('/login')
    } else {
      toast.error(res.EM)
    }
  }

  const handleBtnProfile = () =>{
    setIsShowModalProfile(true)
  }

  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NavLink to='/' className='navbar-brand'> <FaReact className='loader-icon'/>Cực Căng</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to='/' className='nav-link' >{t('header.title1')}</NavLink>
            <NavLink to='/users' className='nav-link'>{t('header.title2')}</NavLink>
            <NavLink to='/admins' className='nav-link'>{t('header.title3')}</NavLink>
            {/* <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="users">User</Nav.Link>
            <Nav.Link href="admins">Admin</Nav.Link> */}
          </Nav>
          <Nav>
            {isAuthenticated === false ?
              <>
                <button className='btn-login' onClick={() =>handleLogin()}>{t('header.button.Login')}</button>
                <button className='btn-signup' onClick={() => navigate('/signup')}>{t('header.button.Signup')}</button>
              </>
            :
              <NavDropdown title={t('header.button.tt')} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() =>  handleBtnProfile()}>{t('header.button.Profile')}</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleLogout()}>{t('header.button.Logout')}</NavDropdown.Item>
              </NavDropdown>
            }
            <Language />
          </Nav>
        </Navbar.Collapse>
      </Container>
      
    </Navbar>
      <ModalProfileUser show = {isShowModalProfile} setShow={setIsShowModalProfile}/>
    </>
  );
}

export default Header;