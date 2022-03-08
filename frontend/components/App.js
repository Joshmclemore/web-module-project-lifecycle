import React from 'react';
import axios from 'axios';

const URL = 'http://localhost:9000/api/todos'

const initialState = {
  todos: [],
  error: "",
}



export default class App extends React.Component {
  state = initialState

fetchAllTodos = () => {
  axios.get(URL)
    .then(res => {
      this.setState({
        ...this.state, 
        todos: res.data.data
      })
    })
    .catch(err => {
      this.setState({
        ...this.state, 
        error: err.message
      })
    })
}

componentDidMount() {
  this.fetchAllTodos()
}


  render() {
    return(
      <div>
        <h2>Todos:</h2>
        <ul>
          {
            this.state.todos.map(todo => {
              return <li key={todo.id}>{todo.name}</li>
            })
          }
        </ul>
        <form>
          <input/>
          <button type='submit'>Submit</button>
          <button>Hide Completed</button>
        </form>
        <div id='error'>{this.state.error}</div>
      </div>
    )
  }
}
