import React, { Component } from 'react'

const d = new Date()
var month = {
1: 'January',
2: 'February',
3 : 'March',
4 : 'April',
5 : 'May',
6 : 'June',
7 : 'July',
8 : 'August',
9 : 'September',
10 : 'October',
11 : 'November',
12 : 'December' }

const today = `${month[d.getMonth()]} ${d.getDay()}, ${d.getFullYear()}`
class TodoAddBar extends Component {
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
      completeBy: today
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

export default TodoAddBar