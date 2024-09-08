
import React, { useState } from 'react'
import AddUserInfo from './AddUserInfo'
import DisplayInfo from './DisplayInfo';

// class MComponent extends React.Component{

//     state = {
//         listUsers : [
//             {id: 1, name:"triet", age:20},
//             {id: 2, name:"minh", age:30},
//             {id: 3, name:"huynh", age:15}

//         ]
//     }

//     handleAddNewUser = (userObj) =>{
//         this.setState({
//             listUsers: [userObj, ...this.state.listUsers]
//         })
//     }

//     handleRemoveUser = (userId) =>{
//         this.setState({
//             listUsers : this.state.listUsers.filter(item => item.id !== userId)
//         })

//     }
//     render(){
//         // const lala = ['abc',...myArr]
//         // const test = myArr.map((item) => item>200 ? 'true' : 'false' )
//         // const obj = {key:'value'}
        
// }

const MComponent = (props) =>{
    const [listUsers, setListUsers] = useState(
        [
            {
                id: 1,
                name: "triet",
                age: 20
            },
            {
                id: 2,
                name: "a",
                age: 30
            },
            {
                id: 3,
                name: "b",
                age: 15
            }
        ]
    )

    const handleAddNewUser = (userNew) =>{
        setListUsers([userNew,...listUsers])
    }

    const handleRemoveUser = (userId) =>{
        setListUsers(
            listUsers.filter(item => item.id!==userId)
        )
    }

    return(
        <>   
                <AddUserInfo handleAddNewUser = {handleAddNewUser}/>
                < br /> <br />
                <DisplayInfo 
                    listUsers = {listUsers}
                    handleRemoveUser = {handleRemoveUser}
                />
                <hr />        
            {/* <DisplayInfo name= 'admin' age = {20} myArr = {myArr} a = {obj.key} arr = {test} lala = {lala}/> */}
        </>
        
    )
}
export default MComponent;