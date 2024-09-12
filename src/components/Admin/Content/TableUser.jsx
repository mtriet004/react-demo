import React from 'react'


const TableUser = (props) => {

    const {listUsers} = props
    
  return (
    <>
    <table className="table table-hover table-bordered">
        <thead>
        <tr>
            <th scope="col">Id</th>
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
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                            <button className='btn btn-primary'>View</button>
                            <button className='btn btn-warning mx-3' onClick={() => props.handleClickBtnUpdate(user)}>Update</button>
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