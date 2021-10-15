import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import AnalogWatch from './AnalogWatch'
import NWCustomerFetch from './NWCustomerFetch'
import NWUserFetch from './NWUserFetch'
import TypicodeFetch from './TypicodeFetch'
import Viestit from './Viestit'
import NWkuva from './nwkuva.png'
import Login from './Login'

class Navigaatio extends Component {

    
  render() {

    const aid = localStorage.getItem('AccesslevelId')
    
      return (
          <Router>
            <div>
            <marquee direction="down" width="800" height="130" behavior="alternate">
  <marquee>
    <img style={{width: '400px'}} src={NWkuva} />
  </marquee>
</marquee>

<h3 style={{ marginLeft: '60%' }}><Login /> </h3>

                <nav className='navbar navbar-expand-lg'>
                <ul className='navbar-nav mr-auto'>
                    <li><Link to={'/'} className='nav-link'>Kello</Link></li>
                    <li><Link to={'/TypicodeFetch'} className='nav-link'>Typicode</Link></li>
                    <li><Link to={'/NWCustomerFetch'} className='nav-link'>Asiakashallinta</Link></li>
                    <li><Link to={'/NWProductsFetch'} className='nav-link'>Tuotehallinta</Link></li>
                    {aid == 1 && <li><Link to={'/UserFetch'} className='nav-link'>Käyttäjähallinta</Link></li>}
                    <li><Link to={'/Viestit'} className='nav-link'>Viestit</Link></li>
                 </ul>
            </nav>
            <hr />
            <Switch>
                <Route exact path='/' component={AnalogWatch} />
                <Route path='/NWCustomerFetch' component={NWCustomerFetch} />
                <Route path='/NWProductsFetch' component={NWCustomerFetch} />
                <Route path='/UserFetch' component={NWUserFetch} />
                <Route path='/Viestit' component={Viestit} />
                <Route path='/TypicodeFetch' component={TypicodeFetch} />
            </Switch>

            </div>
          </Router>
        )
      
    }
}

export default Navigaatio