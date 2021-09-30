import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import AnalogWatch from './AnalogWatch'
import NWCustomerFetch from './NWCustomerFetch'
import Viestit from './Viestit'

class Navigaatio extends Component {
    render() {
      return (
          <Router>
            <div>
                <h2 style={{ marginLeft: '5%' }}>Northwind React Sovellus</h2>

                <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                <ul className='navbar-nav mr-auto'>
                    <li style={{ marginLeft: '10%' }}><Link to={'/'} className='nav-link'>Etusivu</Link></li>
                    <li><Link to={'/NWCustomerFetch'} className='nav-link'>Asiakashallinta</Link></li>
                    <li><Link to={'/NWProductsFetch'} className='nav-link'>Tuotehallinta</Link></li>
                    <li><Link to={'/UserFetch'} className='nav-link'>Käyttäjähallinta</Link></li>
                    <li><Link to={'/Viestit'} className='nav-link'>Viestit</Link></li>
                 </ul>
            </nav>
            <hr />
            <Switch>
                <Route exact path='/' component={AnalogWatch} />
                <Route path='/NWCustomerFetch' component={NWCustomerFetch} />
                <Route path='/NWProductsFetch' component={NWCustomerFetch} />
                <Route path='/UserFetch' component={NWCustomerFetch} />
                <Route path='/Viestit' component={Viestit} />
            </Switch>

            </div>
          </Router>
        )
      
    }
}

export default Navigaatio