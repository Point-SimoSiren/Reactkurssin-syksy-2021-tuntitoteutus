import React, { Component } from 'react'
import './App.css'

//----------------------------------------------------------

class Kello extends Component {
    render() {
        return (
            <h4>Kello on nyt: {this.props.kellonaika}</h4>
        )
    }
}

//------------------------------------------------------------


class DigitalWatch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            time: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString(),
            pvm: new Date()
        }
    }

    componentDidMount() {
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        )
    }

    tick() {
        this.setState({
            time: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString(),
            pvm: new Date()
        })
    }

    componentWillUnmount() {
        clearInterval(this.intervalID)
    }

    render() {
        return (
            <div className="Kello">
                {/* <p>Kellonaika: {this.state.time} </p> */}
                {/* <p>Päivämäärä: {this.state.date} </p> */}
                <Kello kellonaika={this.state.time} />
            </div>
        )
    }
}

export default DigitalWatch