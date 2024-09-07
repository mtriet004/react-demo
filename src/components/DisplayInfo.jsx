import React from "react";


class DisplayInfo extends React.Component{

    state = {
        isShowListUser: true
    }
     
    handleShowHide = () =>{
        this.setState({
            isShowListUser: !this.state.isShowListUser
        })
    }
    
    render(){
        const {listUsers} = this.props
        // console.log(this.props?.['name'] ?? 'ko thay')
        return(
            <div>
                <div>
                    <span onClick={() => {this.handleShowHide()}}>Hide List Users:</span>
                </div>
                {this.state.isShowListUser &&
                    <div>
                        {
                            listUsers.map((user) => {
                                return(
                                    <div key={user.id} className={user.age > 18 ? "green" : "red"}>
                                        <div>My name is {user.name}</div>
                                        <div>My age is {user.age}</div>
                                        <hr />
                                    </div>
                                )                      
                            })
                        }
                    
                    </div>
                }
            </div>
        )
    }
}

export default DisplayInfo