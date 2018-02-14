import React, { Component } from 'react'

class Todo extends Component {
  constructor() {
    super()
    this.state = {
      task: '',
      isComplete: false,
      completeBy: 'Monday',
      placeHolder: 'Enter your task here...'
    }
    // this.addTask = this.addTask.bind(this)
    // this.updateTask = this.updateTask.bind(this)
    // this.updateCompletion = this.updateCompletion.bind(this)
  }

  addTask = (event) => {
    let newTask = {
      task: this.state.task,
      completeBy: this.state.completeBy,
      isComplete: this.state.isComplete
    }
    this.props.addNewTask(newTask)
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
    return <form>
        <input type="text" value={this.state.task} placeholder={this.state.placeHolder} onChange={this.updateTask}/>
        {/* <input type="checkbox" checked={this.state.isComplete} onChange={this.updateCompletion} /> */}
        <button type="button" onClick={this.addTask}>
          Add
        </button>
      </form>
  }
}

export default Todo