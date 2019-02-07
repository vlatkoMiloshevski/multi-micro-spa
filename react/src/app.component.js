import React from 'react';
import logo from '../assets/logo.svg'

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <img src={logo} className="App-logo" width="100px" alt="logo" />
        <p>
          This is React application run on "localhost:9009"
          </p>
      </div>
    );
  }
}

export default App;
