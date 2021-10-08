import React, {Component} from 'react'
import './App.css'
import NWCustomerAdd from './NWCustomerAdd'
import NWCustomerEdit from './NWCustomerEdit'
import NWCustomerDelete from './NWCustomerDelete'
import Helpit from './Helpit'

class NWCustomerFetch extends Component {
constructor(props) {
    super(props)
    this.state = {
        customers: [],
        recordcount: 0,
            start: 0,
            take: 10,
            show: "table", // Oletuksena näytetään asiakas listaus, eli "table"
            showHelp: false, // Näytetäänkö ylipäänsä joku customer aiheinen helppi vai ei
            muokattavaAsiakas: {}, // Tähän asetetaan yksi kokonainen asiakas olio
            poistettavaAsiakas: {} // sama tässä
    }
    this.handleChildUnmount = this.handleChildUnmount.bind(this)
    this.handleClickEdit = this.handleClickEdit.bind(this)
    this.handleClickDelete = this.handleClickDelete.bind(this)
}

// Voidaan välittää tätä samaa unMount metodia kaikille customer crud komponenteille, koska
// riittää että kaikissa tapauksissa palataan vain table näytölle takaisin.
handleChildUnmount() {
    this.setState({ show: "table" })
    this.haeNwRestApista()
}

handleClickAdd = () => {
this.setState({...this.state, show: 'addForm'})
}

handleClickEdit = (dataObj) => {
    this.setState({
        show: "editForm",
        muokattavaAsiakas: dataObj
    })
    console.log(this.state.muokattavaAsiakas)
}

handleClickDelete = (dataObj) => {
      this.setState({
        show: "deleteForm",
        poistettavaAsiakas: dataObj
        
      })  
      console.log(this.state.poistettavaAsiakas)
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

  /* Tämä määrittelee ainoastaan näytetäänkö mikä tahansa asiakasaiheinen helppi.
     Helpit -komponentille kulloinkin annettava propsi "moduli" määrää minkä yksilöllisen -toiminnon helppi
     helppi kompontin sisällä näytetään. Kaikki vaihtoehdot on oltava siellä kovakoodattuna. */
  näytäHelppiPainettu = () => {
    this.setState({showHelp: !this.state.showHelp}) // ! -operaattori vaihtaa boolean tilan aina toisinpäin true <--> false
    } 


    componentDidMount() {
       this.haeNwRestApista()
    }

    haeNwRestApista() {
    fetch(`https://localhost:5001/api/customers/r?offset= ${this.state.start}
    &limit= ${this.state.take}`)
    .then(res => res.json())
    .then(oliot => this.setState({customers: oliot}))
    }


    render() {
        // ___________________ADD_________________________________________________

        if (this.state.show === 'addForm')
        {
            return(
                <div className="box1">
                    <h2>Asiakkaan lisääminen</h2>
                    <div>

                    {this.state.showHelp === false ? <button onClick={this.näytäHelppiPainettu}>Näytä opaste</button>
                    : <button onClick={this.näytäHelppiPainettu}>Piilota opaste</button>}

                    <button onClick={this.handleChildUnmount}>Selaa asiakkaita</button>
                    </div>

                    {this.state.showHelp === true ? <Helpit moduli={"customerAdd"} /> : null}
                   
                   <NWCustomerAdd unmountMe={this.handleChildUnmount} />

                </div>
            )
        }

        // ___________________EDIT____________________________________________

        if (this.state.show === "editForm") {
            
            return (<div className="box3">
                <h2>Asiakkaan muokkaus</h2>
                <div>
                     {this.state.showHelp === false ? <button onClick={this.näytäHelppiPainettu}>Näytä opaste</button>
                    : <button onClick={this.näytäHelppiPainettu}>Piilota opaste</button>}

                    <button onClick={this.handleChildUnmount}>Selaa asiakkaita</button>
                </div>

                {this.state.showHelp === true ? <Helpit moduli={"customerEdit"} /> : null}

                <NWCustomerEdit asiakasObj={this.state.muokattavaAsiakas} unmountMe={this.handleChildUnmount} />

            </div>
            )
        } 
        
        // _________________DELETE___________________________________________

        if (this.state.show === "deleteForm") {
            return (<div className="box1">
                <h2>Tuotetietojen poiston vahvistus</h2>
                <div>
                {this.state.showHelp === false ? <button onClick={this.näytäHelppiPainettu}>Näytä opaste</button>
                    : <button onClick={this.näytäHelppiPainettu}>Piilota opaste</button>}
                    <button onClick={this.handleChildUnmount}>Selaa asiakkaita</button>
                </div>

                {this.state.showHelp === true ? <Helpit moduli={"customerDelete"} /> : null}

                <NWCustomerDelete asiakasObj={this.state.poistettavaAsiakas} unmountMe={this.handleChildUnmount} />

            </div>
            )

            }

        // _________________JOS SHOW = TABLE TULEE AINA JOKU ALLAOLEVISTA_______________________

            if (this.state.customers.length > 9)
            {
                return(
                    <div>
                        <h2>Asiakkaat</h2>

                        {this.state.showHelp === false ? <button onClick={this.näytäHelppiPainettu}>Näytä opaste</button>
                    : <button onClick={this.näytäHelppiPainettu}>Piilota opaste</button>}

                        <button onClick={this.handleClickPrev}>Edelliset</button>
                        <button onClick={this.handleClickNext}>Seuraavat</button>
                        <button onClick={this.handleClickAdd}>Lisää uusi</button>

                        {this.state.showHelp === true && <Helpit moduli={"customerFetch"} />}

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
                                        <td><button onClick={() => this.handleClickEdit(c)}>Muokkaa</button></td>
                                        <td><button onClick={() => this.handleClickDelete(c)}>Poista</button></td>
                                    </tr>
                                ))}
                            </tbody>
                       </table>

                    </div>
                )
            }
            else if (this.state.customers.length > 0 && this.state.customers.length < 10) {
                return(
                    <div>
                        <h2>Asiakkaat</h2>

                        {this.state.showHelp === false ? <button onClick={this.näytäHelppiPainettu}>Näytä opaste</button>
                    : <button onClick={this.näytäHelppiPainettu}>Piilota opaste</button>}

                        <button onClick={this.handleClickPrev}>Edelliset</button>
                        <button disabled="true">Seuraavat</button>
                        <button onClick={this.handleClickAddForm}>Lisää uusi</button>

                        {this.state.showHelp === true ? <Helpit moduli={"customerFetch"} /> : null}

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
                                        <td><button onClick={() => this.handleClickEdit(c)}>Muokkaa</button></td>
                                        <td><button onClick={() => this.handleClickDelete(c)}>Poista</button></td>
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

export default NWCustomerFetch
