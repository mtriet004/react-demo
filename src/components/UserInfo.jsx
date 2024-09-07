import React from "react";

class UserInfo extends React.Component{
    state = {
        name:"abc",
        address:"HCM"
    }

    handleOnMouseOver(e){
        // console.log(e.pageX)
    } 

    handleOnChange(e){
        this.setState({
            name:e.target.value
        })
    }

    handleOnSubmit(e){
        e.preventDefault()
        console.log(this.state)
    }

    render(){
        return(
            <div>
                 My name is: {this.state.name} , my location is: {this.state.address}
                <button onClick={(e) => this.handleClick(e)} >Click me</button>
                <form onSubmit={(e) => this.handleOnSubmit(e)}>
                    <input
                     type='text'
                     value={this.state.name}
                     onChange={(e) => this.handleOnChange(e)}></input>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default UserInfo