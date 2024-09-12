import ModalCreateUser from "./ModalCreateUser"
import './ManageUser.scss'
import { FaUserPlus } from "react-icons/fa";
import { useState } from "react";

const ManageUser = (props) => {

    const [showModalCreateUser, setShowModalCreateUser] = useState(false)


  return (
    <div className='manage-user-container'>
        <div className='title'>
            Manage User
        </div>
        <div className='users-content'>
            <div className="btn-add-new">
                <button className="btn btn-primary mb-2" onClick={() =>setShowModalCreateUser(true)}>Add New User <FaUserPlus /></button>
            </div>
            <div className="table-users">
                Table Users                
            </div>
            <ModalCreateUser show={showModalCreateUser} setShow = {setShowModalCreateUser}/>
        </div>       
    </div>
  )
}

export default ManageUser