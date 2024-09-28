import React from 'react'
import Modal from 'react-bootstrap/Modal';
import './ModalProfile.scss'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Profile from './Profile';
import Password from './Password';
import ViewHistory from './ViewHistory';

const ModalProfileUser = (props) => {

    const {show, setShow} = props

    const handleClose =() =>{
        setShow(false)
    }

  return (
    <>
    <Modal show={show} onHide={handleClose} backdrop='static' size='xl' 
        className='modal-profile'>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete User?</Modal.Title>
        </Modal.Header>
        <Modal.Body>        
             <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3"
                >
                <Tab eventKey="profile" title="Profile">
                   <Profile />
                </Tab>
                <Tab eventKey="pass" title="Change Pass">
                    <Password />
                </Tab>
                <Tab eventKey="contact" title="Contact">
                    <ViewHistory />
                </Tab>
            </Tabs>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ModalProfileUser