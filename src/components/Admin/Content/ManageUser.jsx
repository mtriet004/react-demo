import ModalCreateUser from "./ModalCreateUser"
import './ManageUser.scss'
import { FaUserPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import TableUser from "./TableUser";
import { getAllUser } from '../../../service/APIService'
import ModalUpdateUser from "./ModalUpdateUser";

const ManageUser = (props) => {

    const [showModalCreateUser, setShowModalCreateUser] = useState(false)
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)
    const [listUsers, setListUsers] = useState([])
    const [dataUpdate, setDataUpdate] = useState({})

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

    const handleClickBtnUpdate = (user) =>{
        setShowModalUpdateUser(true)
        setDataUpdate(user)
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
                <TableUser listUsers={listUsers} handleClickBtnUpdate = {handleClickBtnUpdate}/>              
            </div>
            <ModalCreateUser show={showModalCreateUser} setShow = {setShowModalCreateUser} fetchListUser = {fetchListUser}/>
            <ModalUpdateUser show={showModalUpdateUser} setShow={setShowModalUpdateUser} dataUpdate={dataUpdate}/>
        </div>       
    </div>
  )
}

export default ManageUser