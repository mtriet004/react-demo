import React, { useState } from "react";

// class AddUserInfo extends React.Component{
//     state = {
//         name:"",
//         age: ''
//     }

//     handleOnMouseOver(e){
//         // console.log(e.pageX)
//     } 

//     handleOnChange(e){
//         this.setState({
//             name:e.target.value,
//         })
//     }

//     handleOnChangeAge(e){
//         this.setState({
//             age:e.target.value
//         })
//     }

//     handleOnSubmit(e){
//         e.preventDefault()
//         this.props.handleAddNewUser({
//             id: Math.floor((Math.random()*100) +1) + '-random',
//             name: this.state.name,
//             age : this.state.age
//         });
//     }

//     render(){
//         return(
//             <div>
//                  My name is: {this.state.name} , my age is: {this.state.age}
//                 <form onSubmit={(e) => this.handleOnSubmit(e)}>
//                     <label style={{marginRight : '20px'}}>Your name:</label>
//                     <input
//                      name="name"
//                      type='text'
//                      value={this.state.name}
//                      onChange={(e) => this.handleOnChange(e)}></input>
//                      <label style={{marginRight : '20px'}}>Your age:</label>
//                     <input
//                      name="age"
//                      type='text'
//                      value={this.state.age}
//                      onChange={(e) => this.handleOnChangeAge(e)}></input>
//                     <button>Submit</button>

//                 </form>
//             </div>
//         )
//     }
// }

const AddUserInfo = (props) => { 
    const [userName, setUserName] = useState('')
    const [userAge, setUserAge] = useState('')

    const handleOnSubmit = (e) =>{
        e.preventDefault()
        props.handleAddNewUser({
            id : Math.floor((Math.random()*100) + 1) + '-random',
            name : userName,
            age : userAge
        })
    }

    return(
        <div>
            My name is: {userName} , my age is: {userAge}
            <form onSubmit={(e) => handleOnSubmit(e)}>
                <label style={{marginRight : '20px'}}>Your name:</label>
                <input
                    name="name"
                    type='text'
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}></input>
                <label style={{marginRight : '20px', marginLeft:'20px'}}>Your age:</label>
                <input
                    name="age"
                    type='text'
                    value={userAge}
                    onChange={(e) => setUserAge(e.target.value)}></input>
                    <button>Submit</button>
        
            </form>
        </div>
    )

}
export default AddUserInfo