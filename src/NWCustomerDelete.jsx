import React, { Component } from 'react'
import './App.css'

class NWCustomerDelete extends Component {
    constructor(props) {
        super(props)
        this.handlePerformDelete = this.handlePerformDelete.bind(this)
    }

    handleSubmit(event) {
        alert('Poistettava tuote: ' + this.props.tuoteObj.productId)
        event.preventDefault()
        this.InsertoiKantaan()
    }

    callBackRoutine() {
        console.log('Logins callback ', this.props.tuoteObj.productId);
    }

    handlePerformDelete(event) {
        event.preventDefault()
        this.NWDeleteRestApista()
    }

    ResetDeleteDone() {
        this.handleClickTable()
        this.HaeNWRestApista()
    }

    NWDeleteRestApista() {

        let apiUrl = 'https://localhost:5001/api/customers/' + this.props.asiakasObj.customerId
        console.log(apiUrl)

        fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: null
        }).then((res) => res.json()) // Json responce muutetaan javascriptiksi nimelle vastaus
            .then((vastaus) => {
                console.log('Response from server: ', vastaus);
                if (vastaus) {
                    this.props.unmountMe()
                }
            })
    }
    render() {
        console.log(this.props.asiakasObj)
        return (
            <form className="box4" key={this.props.asiakasObj.CustomerID} onSubmit={this.handlePerformDelete}>
                <table id="deletetbl">
                    <tbody >
                        <label>Poistettava asiakas</label>
                        <tr><td className="otsikko">Asiakastunnus:</td><td>{this.props.asiakasObj.customerId}</td></tr>
                        <tr><td className="otsikko">Firman nimi:</td><td>{this.props.asiakasObj.companyName}</td></tr>
                        <tr><td className="otsikko">Maa:</td><td>{this.props.asiakasObj.country}</td></tr>
                    </tbody>
                </table>
                <br />
                <h5>Seuraavaksi suoritetaan tarkistus tietokannassa.
                Mikäli asiakkaalla on esim. tilauksia, ei poistoa suoriteta.</h5>
                <button type="submit">Suorita</button>
            </form>
        )
    }
}
export default NWCustomerDelete