import React from 'react'

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
  state = initialState
  render() {
    return(
      <div>
        <h2>Todos:</h2>
        <ul>
          <li>Walk the dog</li>
          <li>Learn React</li>
          <li>Have fun</li>
        </ul>
        <form>
          <input/>
          <button>Submit</button>
          <button>Hide Completed</button>
        </form>
      </div>
    )
  }
}
