import ModalCreateUser from "./ModalCreateUser"
import './ManageUser.scss'
import { FaUserPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import TableUser from "./TableUser";
import { getAllUser } from '../../../service/APIService'

const ManageUser = (props) => {

    const [showModalCreateUser, setShowModalCreateUser] = useState(false)
    const [listUsers, setListUsers] = useState([])

    useEffect(() => {
        fetchListUser()
    }, [])


    const fetchListUser = async () =>{
        let res = await getAllUser();
        console.log(res)
        if(res.EC === 0){
            setListUsers(res.DT)
        }
    }

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
                <TableUser listUsers={listUsers}/>              
            </div>
            <ModalCreateUser show={showModalCreateUser} setShow = {setShowModalCreateUser} fetchListUser = {fetchListUser}/>
        </div>       
    </div>
  )
}

export default ManageUser