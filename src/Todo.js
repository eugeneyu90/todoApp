import React, { Component } from 'react'

class Todo extends Component {
  constructor() {
    super()
    this.state = {
      task: ''
    }
  }

  addToList = (event) => {
    let newTask = {
      id: this.props.totalTodos + 1,
      task: this.state.task,
      isComplete: false,
      completeBy: new Date()
    }

    this.props.addToList(newTask)
    this.setState({
      task: ''
    })
  }

  updateTask = (event) => {
    this.setState({
      task: event.target.value
    })
  }

  

  render() {
    const placeHolder = "Enter a new task here..."
    return <form>
        <input type="text" value={this.state.task} placeholder={placeHolder} onChange={this.updateTask} />
        {/* <input type="checkbox" checked={this.state.isComplete} onChange={this.updateCompletion} /> */}
        <button type="button" onClick={this.addToList}>
          Add
        </button>
      </form>
  }
}

export default Todo