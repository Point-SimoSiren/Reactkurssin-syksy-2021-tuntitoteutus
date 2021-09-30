import React, {Component} from 'react'
import './App.css'
import NWCustomerAdd from './NWCustomerAdd'

class NWCustomerFetch extends Component {
constructor(props) {
    super(props)
    this.state = {
        customers: [],
        recordcount: 0,
            start: 0,
            take: 10,
            show: "table"
    }
    this.handleChildUnmount = this.handleChildUnmount.bind(this)
}

handleChildUnmount() {
    this.setState({ show: "table" })
    this.haeNwRestApista()
}

handleClickAddForm = () => {
this.setState({show: 'addForm'})
}

handleClickPrev = () => {
    let startvalue = this.state.start;
    if (startvalue > 0) {
      startvalue = startvalue - 10;
    }
    this.setState({ start: startvalue }, this.haeNwRestApista);
  }

  handleClickNext = () => {
    this.setState({ start: this.state.start + 10 }, this.haeNwRestApista);
  }

    componentDidMount() {
       this.haeNwRestApista()
    }

    haeNwRestApista() {
    //fetch('https://localhost:5001/api/customers?_page='+this.state.start+'&_limit='+this.state.take)
    fetch(`https://localhost:5001/api/customers/r?offset= ${this.state.start}
    &limit= ${this.state.take}`)
    .then(res => res.json())
    .then(oliot => this.setState({customers: oliot}))
    }

    render() {

        if (this.state.show === 'addForm')
        {
            return(
                <NWCustomerAdd unmountMe={this.handleChildUnmount} />
            )
        }

            //console.log("State on: ", this.state.customers)

            if (this.state.customers.length > 0)
            {
                return(
                    <div>
                        <h2>Asiakkaat</h2>

                        <button onClick={this.handleClickPrev}>Edelliset</button>
                        <button onClick={this.handleClickNext}>Seuraavat</button>
                        <button onClick={this.handleClickAddForm}>Lisää uusi</button>

                       <table>
                            <thead>
                                <tr>
                                    <th>Yritys</th>
                                    <th>Yhteyshenkilö</th>
                                    <th>Kaupunki</th>
                                    <th>Maa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.customers.map(c => (
                                    <tr key={c.customerId}>
                                        <td>{c.companyName}</td>
                                        <td>{c.contactName}</td>
                                        <td>{c.city}</td>
                                        <td>{c.country}</td>
                                    </tr>
                                ))}
                            </tbody>
                       </table>

                    </div>
                )
            }
            else {
                return(
                    <p>Ladataan...</p>
                )
            }
    }
}

export default NWCustomerFetch