import ModalCreateUser from "./ModalCreateUser"
import './ManageUser.scss'
import { FaUserPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
// import TableUser from "./TableUser";
import { getAllUser, getUserWithPaginate } from '../../../service/APIService'
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";

const ManageUser = (props) => {

    const LIMIT_USER = 5
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)


    const [showModalCreateUser, setShowModalCreateUser] = useState(false)
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)
    const [showModalViewUser, setShowModalViewUser] = useState(false)
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)
    const [listUsers, setListUsers] = useState([])
    const [dataUpdate, setDataUpdate] = useState({})
    const [dataDelete, setDataDelete] = useState({})

    useEffect(() => {
        // fetchListUser()
        fetchListUserWithPaginate(1)
    }, [])


    const fetchListUser = async () =>{
        let res = await getAllUser();
        console.log(res)
        if(res.EC === 0){
            setListUsers(res.DT)
        }
    }

    // const fetchListUserWithPaginate = async (page) =>{
    //     let res = await getUserWithPaginate(page, LIMIT_USER);
    //     // console.log(res)
    //     if(res.EC === 0){
    //         console.log('res.dt = ', res.DT)
    //         setListUsers(res.DT.users)
    //         setPageCount(res.DT.totalPages)
    //     }
    // }


    const fetchListUserWithPaginate = async (page) =>{
        let res = await getUserWithPaginate(page, LIMIT_USER);
        if(res.EC === 0){
            // console.log('check res.DT', res.DT)
            setListUsers(res.DT.users)
            setPageCount(res.DT.totalPages)
        }
    }

    const handleClickBtnUpdate = (user) =>{
        setShowModalUpdateUser(true)
        setDataUpdate(user)
    }

    const handleClickBtnView = (user) =>{
        setShowModalViewUser(true)
        setDataUpdate(user)
    }

    const handleClickBtnDelete = (user) =>{
        setShowModalDeleteUser(true)
        setDataDelete(user)
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
                <TableUserPaginate listUsers={listUsers}
                 handleClickBtnUpdate = {handleClickBtnUpdate}
                 handleClickBtnView = {handleClickBtnView}
                 handleClickBtnDelete = {handleClickBtnDelete}
                 fetchListUserWithPaginate={fetchListUserWithPaginate}
                 pageCount = {pageCount}
                 currentPage = {currentPage} setCurrentPage = {setCurrentPage}
                 /> 
                {/* <TableUser listUsers={listUsers}
                 handleClickBtnUpdate = {handleClickBtnUpdate}
                 handleClickBtnView = {handleClickBtnView}
                 handleClickBtnDelete = {handleClickBtnDelete}/>  */}
            </div>
            <ModalCreateUser show={showModalCreateUser}
             setShow = {setShowModalCreateUser} 
             fetchListUser = {fetchListUser}
             fetchListUserWithPaginate = {fetchListUserWithPaginate}
             currentPage = {currentPage} setCurrentPage = {setCurrentPage}/>
            <ModalUpdateUser show={showModalUpdateUser} setShow={setShowModalUpdateUser}
              dataUpdate={dataUpdate}
              fetchListUser = {fetchListUser}
              fetchListUserWithPaginate = {fetchListUserWithPaginate}
              setDataUpdate = {setDataUpdate}
              currentPage = {currentPage} setCurrentPage = {setCurrentPage}/>
            <ModalViewUser show={showModalViewUser} setShow={setShowModalViewUser}
             dataUpdate={dataUpdate} setDataUpdate={setDataUpdate}/>
            <ModalDeleteUser show={showModalDeleteUser}
              setShow={setShowModalDeleteUser}
              dataDelete={dataDelete}
              setDataDelete={setDataDelete} fetchListUser = {fetchListUser} fetchListUserWithPaginate = {fetchListUserWithPaginate}
              currentPage = {currentPage} setCurrentPage = {setCurrentPage}/>
        </div>       
    </div>
  )
}

export default ManageUser