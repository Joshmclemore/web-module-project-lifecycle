import React from 'react';
import axios from 'axios';

const URL = 'http://localhost:9000/api/todos'

const initialState =      {
  id: "",
  name: "",
  completed: false,
  form: {
    textInput: ""
  },
  successMessage: "",
  errorMessage: "",
}



export default class App extends React.Component {
  state = {
    todos: [],
  }

fetchAllTodos = () => {
  axios.get(URL)
    .then(res => {
      this.setState({
        ...this.state, 
        todos: res.data.data
      })
    })
    .catch(err => {
      debugger
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
      </div>
    )
  }
}
