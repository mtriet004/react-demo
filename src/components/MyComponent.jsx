
import React from 'react'
import UserInfo from './UserInfo'
import DisplayInfo from './DisplayInfo';

class MyComponent extends React.Component{

    state = {
        listUsers : [
            {id: 1, name:"triet", age:20},
            {id: 2, name:"minh", age:30},
            {id: 3, name:"huynh", age:15}

        ]
    }

    render(){
        // const lala = ['abc',...myArr]
        // const test = myArr.map((item) => item>200 ? 'true' : 'false' )
        // const obj = {key:'value'}
        return(
            <div>    
                <UserInfo /> < br /> <br />
                <DisplayInfo listUsers = {this.state.listUsers}/>
                <hr />
                {/* <DisplayInfo name= 'admin' age = {20} myArr = {myArr} a = {obj.key} arr = {test} lala = {lala}/> */}
            </div>
            
        )
    }
}

export default MyComponent;