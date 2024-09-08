import './index.js'
import './App.css';
import MComponent from './components/MComponent.jsx';
import React from 'react';

class App extends React.Component{
  render(){
    return(
      <div>
        <MComponent />
      </div>
    )
  }
}

    
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
export default App;
