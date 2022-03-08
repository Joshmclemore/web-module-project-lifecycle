import React from 'react';
import axios from 'axios';

const URL = 'http://localhost:9000/api/todos'

const initialState = {
  todos: [],
  error: "",
  todoNameInput: "",
}



export default class App extends React.Component {
  state = initialState

// form reset
resetForm = () => {this.setState({...this.state, todoNameInput: ""})}
// axios response error
setErrorMessage = err => { this.setState({...this.state, error: err.response.data.message})}

fetchAllTodos = () => {
  axios.get(URL)
    .then(res => {
      this.setState({
        ...this.state, 
        todos: res.data.data
      })
    })
    .catch(this.setErrorMessage)
}

addNewTodo = () => {
  const newTodo = {name: this.state.todoNameInput}
  axios.post(URL, newTodo)
    .then(res => {
      this.fetchAllTodos()
      this.resetForm()
    })
    .catch(this.setErrorMessage)
}

onTodoFormSubmit = e => {
  e.preventDefault()
  this.addNewTodo()
}

inputChange = evt => {
  const { value } = evt.target
  this.setState({
    ...this.state,
    todoNameInput: value
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
        <form onSubmit={this.onTodoFormSubmit}>
          <input value={this.state.todoNameInput} onChange={this.inputChange} type="text" placeholder="Type Todo"></input>
          <button type='submit'>Submit</button>
          <button>Hide Completed</button>
        </form>
        <div id='error'>{this.state.error}</div>
      </div>
    )
  }
}
