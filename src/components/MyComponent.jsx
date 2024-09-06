
import React from 'react'

class MyComponent extends React.Component{

    state = {
        name:"abc",
        address:"HCM"
    }

    render(){
        return(
            <div>
                My name is: {this.state.name} , my location is: {this.state.address}
            </div>
            
        )
    }
}

export default MyComponent;