import React from 'react';
import axios from 'axios';
import Form from './Form';
import TodoList from './TodoList';

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
        <TodoList 
          todos={this.state.todos}
          displayCompleteds={this.state.displayCompleteds}
          toggleCompleted={this.toggleCompleted}
        />
        <Form 
          onTodoFormSubmit={this.onTodoFormSubmit}
          inputChange={this.inputChange}
          todoNameInput={this.state.todoNameInput}
          toggleDisplayCompleteds={this.toggleDisplayCompleteds}
          displayCompleteds={this.state.displayCompleteds}
        />
        <div id='error'>{this.state.error}</div>
      </div>
    )
  }
}
