import React, { useEffect, useState } from "react";
import  './DisplayInfo.scss'
// import logo from './../logo.svg'

// class DisplayInfo extends React.Component{

//     render(){
//         console.log('call me render')
//         const {listUsers} = this.props
//         // console.log(this.props?.['name'] ?? 'ko thay')
//         return(  
//             <div className="display-infor-container">
//                 {/* <img src={logo} alt="Logo"></img> */}
//                 {true &&
//                     <>
//                         {
//                             listUsers.map((user) => {
//                                 // console.log(user)
//                                 return(
//                                     <div key={user.id} className={user.age > 18 ? "green" : "red"}>
//                                         <div>
//                                             <div>My name is {user.name}</div>
//                                             <div>My age is {user.age}</div>
//                                         </div>                                        
//                                         <div>
//                                             <button onClick={() => this.props.handleRemoveUser(user.id)}>Delete</button>
//                                         </div>
//                                         <hr />                                     
//                                     </div>                                   
//                                 )                      
//                             })
//                         }
                    
//                     </>
//                 }
//             </div>
//         )
//     }
// }


const DisplayInfo = (props) =>{
    const { listUsers } = props

    const [isShowHideListUsers, setShowHideListUserws] = useState(true) 

    // this.state = {
    //     isShowHideListUserws: true
    // }  = cái trên

    const handleShowHideListUser = () =>{
        // this.setState({
        //     isShowHideListUsers : !isShowHideListUsers
        // })
        setShowHideListUserws(!isShowHideListUsers)
    }

    console.log("call me render")

    useEffect(() =>{
        setTimeout(() => {
            document.title='aaa'
        }, 3000)
        console.log("call me UseEffect")
    },[]);
    // = componentDidMount nếu ko truyền tham số phụ thuộc, []: chỉ render lần đầu

    return(  
        <div className="display-infor-container">
            <div>
                <span onClick={() => handleShowHideListUser()}>
                    {isShowHideListUsers=== true ? 'Hide List User' : 'Show List User'}
                </span>
            </div>
            {isShowHideListUsers &&
                <>
                    {
                        listUsers.map((user) => {
                            return(
                                <div key={user.id} className={user.age > 18 ? "green" : "red"}>
                                    <div>
                                        <div>My name is {user.name}</div>
                                        <div>My age is {user.age}</div>
                                    </div>                                        
                                    <div>
                                        <button onClick={() => props.handleRemoveUser(user.id)}>Delete</button>
                                    </div>
                                    <hr />                                     
                                </div>                                   
                            )                      
                        })
                    }
                            
                </>
            }
        </div>
    )
}
export default DisplayInfo