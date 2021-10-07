import React, {Component} from 'react'
import './App.css'
import NWUserAdd from './NWUserAdd'

class NWUserFetch extends Component {
constructor(props) {
    super(props)
    this.state = {
        users: [],
        recordcount: 0,
            start: 0,
            take: 10,
            show: "table",
            search: ""
    }
    this.handleChildUnmount = this.handleChildUnmount.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.performSearch = this.performSearch.bind(this);
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

     handleSearchChange(event) {
        var syöte = event.target.value
         this.setState({ search: syöte })
         }

    performSearch() {
        this.haeNwRestApista()
    }

    componentDidMount() {
       this.haeNwRestApista()
    }

    haeNwRestApista() {
        let uri = ""

        if (this.state.search !== "") {
            uri = `https://localhost:5001/api/users/lastname/${this.state.search}`
        }

        else{
            uri = `https://localhost:5001/api/users/r?offset= ${this.state.start} &limit= ${this.state.take}`
        }

        fetch(uri)
    .then(res => res.json())
    .then(oliot => this.setState({users: oliot}))
    }

    render() {

        if (this.state.show === 'addForm')
        {
            return(
                <NWUserAdd unmountMe={this.handleChildUnmount} />
            )
        }

            if (this.state.users.length > 9)
            {
                return(
                    <div>
                        <h2>Käyttäjät</h2>

                        <button onClick={this.handleClickPrev}>Edelliset</button>
                        <button onClick={this.handleClickNext}>Seuraavat</button>
                        <button onClick={this.handleClickAddForm}>Lisää uusi</button>

                        <input type="text" onChange={this.handleSearchChange} placeholder="Hae sukunimellä"></input>
                    <button onClick={this.performSearch}>Haku</button>

                       <table>
                            <thead>
                                <tr>
                                    <th>Etunimi</th>
                                    <th>Sukunimi</th>
                                    <th>Sähköposti</th>
                                    <th>Käyttäjätunnus</th>
                                    <th>Käyttäjätaso</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.users.map(c => (
                                    <tr key={c.userId}>
                                         <td>{c.firstname}</td>
                                        <td>{c.lastname}</td>
                                        <td>{c.email}</td>
                                        <td>{c.username}</td>
                                        <td>{c.accesslevelId}</td>
                                    </tr>
                                ))}
                            </tbody>
                       </table>

                    </div>
                )
            }
            else if (this.state.users.length > 0 && this.state.users.length < 10) {
                return(
                    <div>
                        <h2>Käyttäjät</h2>

                        <button onClick={this.handleClickPrev}>Edelliset</button>
                        <button disabled="true">Seuraavat</button>
                        <button onClick={this.handleClickAddForm}>Lisää uusi</button>

                        <input type="text" onChange={this.handleSearchChange} placeholder="Hae sukunimellä"></input>
                        <button onClick={this.performSearch}>Haku</button>
                        
                        
                        <table>
                            <thead>
                                <tr>
                                    <th>Etunimi</th>
                                    <th>Sukunimi</th>
                                    <th>Sähköposti</th>
                                    <th>Käyttäjätunnus</th>
                                    <th>Käyttäjätaso</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.users.map(c => (
                                    <tr key={c.userId}>
                                         <td>{c.firstname}</td>
                                        <td>{c.lastname}</td>
                                        <td>{c.email}</td>
                                        <td>{c.username}</td>
                                        <td>{c.accesslevelId}</td>
                                    </tr>
                                ))}
                            </tbody>
                       </table>


                    </div>
                )
            }
            else {
                return(
                    <h4>Ladataan...</h4>
                )
            }
    }
}

export default NWUserFetch