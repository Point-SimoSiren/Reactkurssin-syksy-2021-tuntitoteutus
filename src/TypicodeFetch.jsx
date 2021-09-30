import React, {Component} from 'react'
import './App.css'

class TypicodeFetch extends Component {
constructor(props) {
    super(props)
    this.state = {
        todos: [],
        recordcount: 0,
            start: 0,
            end: 10,
            page: 1,
            limit: 10,
            userId: ""
    }
}

handleClickPrev = () => {
    let pagenumber = this.state.page;
    if (pagenumber > 0) {
        pagenumber = pagenumber-1;
    }
    this.setState({
        page: pagenumber,
    },this.haeTypicodesta);
}

handleClickNext = () => {
    this.setState({
        page: this.state.page+1,
    },this.haeTypicodesta);
}

    componentDidMount() {
       this.haeTypicodesta()
    }

    haeTypicodesta() {
    fetch('https://jsonplaceholder.typicode.com/todos?_page='+this.state.page+'&_limit='+this.state.limit)
    .then(res => res.json())
    .then(oliot => this.setState({todos: oliot}))
    }



    render() {
            const {todos} = this.state

            //console.log("State on: ", this.state.todos)

            if (todos.length > 0)
            {
                return(
                    <div>
                        <h2>Todos from Typicode</h2>

                        <button onClick={this.handleClickPrev}>Edelliset</button>
                        <button onClick={this.handleClickNext}>Seuraavat</button>

                       <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>User ID</th>
                                    <th>Title</th>
                                </tr>
                            </thead>
                            <tbody>
                                {todos.map(t => (
                                    <tr key={t.id}>
                                        <td>{t.id}</td>
                                        <td>{t.userId}</td>
                                        <td>{t.title}</td>
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

export default TypicodeFetch