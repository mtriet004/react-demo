import React, { useEffect } from 'react'
import { useState } from 'react'
import { getAllUser } from '../../../service/APIService'
const TableUser = (prop) => {

    const [listUsers, setListUsers] = useState([])

    useEffect(() => {
        fetchListUser()
    }, [])


    const fetchListUser = async () =>{
        // getAllUser().then(response =>{
        //     setListUsers(response.DT)
        //     console.log(response.DT)
        // }).catch(err =>{
        //     console.error(err)
        // })
        let res = await getAllUser();
        console.log(res)
        if(res.EC === 0){
            setListUsers(res.DT)
        }
    }
  return (
    <>
    <table className="table table-hover table-bordered">
        <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th>Action</th>
        </tr>
        </thead>
        <tbody>
        {listUsers && listUsers.length > 0 &&
            listUsers.map((user,index) => {
                return (
                    <tr key={user.id}>
                        <td>{index + 1}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                            <button className='btn btn-primary'>View</button>
                            <button className='btn btn-warning mx-3'>Update</button>
                            <button className='btn btn-danger'>Delete</button>
                        </td>
                    </tr>
                )       
            })
        }
        {listUsers && listUsers.length === 0 && 
            <tr>
                <td colSpan={'4'}>Not found data</td>
            </tr>
        }
        </tbody>
    </table>
  </>
  )
}

export default TableUser