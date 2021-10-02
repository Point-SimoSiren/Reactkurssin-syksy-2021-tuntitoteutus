import React, { Component } from "react"
import './App.css'

class Helpit extends Component {
    render() {
        if (this.props.moduli === "viestit") {
            return (<div className="helppi">
                <h4>Helppi</h4>
                <p>Viestit toiminto välittää käyttäjälle viestejä.</p>
            </div>
            )
        }
        if (this.props.moduli === "kello") {
            return (<div className="helppi">
                <h4>Helppi</h4>
                <p>Kello näyttää käyttäjälle ajan.</p>
            </div>
            )
        }

        if (this.props.moduli === "customerFetch") {
            return (<div className="helppi">
                <h4>Helppi</h4>
                <p>Tällä toiminnolla voidaan selata asiakkaita 10 kerrallaan.</p>
            </div>
            )
        }

        if (this.props.moduli === "customerAdd") {
            return (<div className="helppi">
                <h4>Helppi</h4>
                <p>Tällä toiminnolla voidaan lisätä uusi asiakas.</p>
                <p>Huomaa, että ID on annettava, ja sen tulee olla 5 isoa kirjainta.</p>
            </div>
            )
        }

        if (this.props.moduli === "customerDelete") {
            return (<div className="helppi">
                <h4>Helppi</h4>
                <p>Tällä toiminnolla voidaan poistaa asiakas.</p>
                <p>Huomaa, että asiakkaita, joilla on tilauksia ei voi poistaa.</p>
            </div>
            )
        }

        if (this.props.moduli === "customerEdit") {
            return (<div className="helppi">
                <h4>Helppi</h4>
                <p>Tällä toiminnolla voidaan muokata asiakkaan tietoja.</p>
                <p>ID tietoa ei kuitenkaan voi muokata.</p>
            </div>
            )
        }
    }
}

export default Helpit