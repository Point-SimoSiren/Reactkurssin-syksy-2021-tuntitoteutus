import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Viestit from './Viestit'
import DigitalWatch from './DigitalWatch'
import AnalogWatch from './AnalogWatch'
import reportWebVitals from './reportWebVitals'
import TypicodeFetch from './TypicodeFetch'
import NWCustomerFetch from './NWCustomerFetch'
import MD5demo from './MD5demo'

ReactDOM.render(
  <React.StrictMode>

    <MD5demo />
    <TypicodeFetch />
    <NWCustomerFetch />
    <App />
    <AnalogWatch />
    <DigitalWatch />
    <Viestit />

  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
