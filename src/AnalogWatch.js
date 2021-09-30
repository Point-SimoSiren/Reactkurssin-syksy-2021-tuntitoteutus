import React, { Component } from 'react'
import './App.css'
import Clock from 'react-clock'
import 'react-clock/dist/Clock.css' // Tämä tarvitaan nykyään!
import Helpit from './Helpit'

class AnalogWatch extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
            pvm: new Date(),
            näytäHelppi: false
        }
    }

    näytäHelppiPainettu = (event) => {
        if (this.state.näytäHelppi === false) {
            this.setState({
                näytäHelppi: true
            })
        }
        else {
            this.setState({
                näytäHelppi: false
            })
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
            pvm: new Date()
        })
    }
    componentWillUnmount() {
        clearInterval(this.intervalID);
      
    }
    render() {
        
        return (
            <div className="Kello">
                <Clock value={this.state.pvm} size={300} hourMarksLength={20} />

                {this.state.näytäHelppi === false && <button onClick={this.näytäHelppiPainettu}>Näytä helppi</button>}

                {this.state.näytäHelppi === true && <button onClick={this.näytäHelppiPainettu}>Piilota helppi</button>}

                {this.state.näytäHelppi === true && <Helpit moduli={"kello"} />}

            </div>
        )
    }
}

export default AnalogWatch