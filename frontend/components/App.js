import React from 'react';
import axios from 'axios';

const URL = 'http://localhost:9000/api/todos'

const initialState = {
  todos: [],
  error: "",
  todoNameInput: "",
  displayCompleteds: true,
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
      this.setState({
        ...this.state, todos: this.state.todos.concat(res.data.data)
      })
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

toggleCompleted = id => () => {
  axios.patch(`${URL}/${id}`)
    .then(res => {
      this.setState({
        ...this.state, todos: this.state.todos.map(todo => {
          if (todo.id !== id) return todo
          return res.data.data
        })
      })
    })
    .catch(this.setErrorMessage)
}

toggleDisplayCompleteds = () => {
  this.setState({
    ...this.state, displayCompleteds: !this.state.displayCompleteds
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
            this.state.todos.reduce((acc, td) => {
              if(this.state.displayCompleteds || !td.completed) return acc.concat(
              <li onClick={this.toggleCompleted(td.id)} key={td.id}>{td.name} {td.completed ? ' ✔️' : ''}</li>
              )
              return acc
            }, [])
              
          }
        </ul>
        <form onSubmit={this.onTodoFormSubmit}>
          <input value={this.state.todoNameInput} onChange={this.inputChange} type="text" placeholder="Type Todo"></input>
          <button type='submit'>Submit</button> 
        </form>
          <button onClick={this.toggleDisplayCompleteds}>{this.state.displayCompleteds ? 'Hide' : 'Show'} Completed</button>
        <div id='error'>{this.state.error}</div>
      </div>
    )
  }
}
