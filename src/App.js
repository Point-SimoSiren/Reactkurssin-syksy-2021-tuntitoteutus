import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

class App extends Component {


  render() {
    return (
      <div className="App">

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Tämä on minun ensimmäinen React-sovellus!
          </p>
          <p>
            Laskutoimituksen tulos on {4 + 2}
          </p>
        </header>
      </div>
    )
  }
}

export default App
