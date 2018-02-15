import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

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

const today = `${month[d.getMonth()+1]} ${d.getDate()}, ${d.getFullYear()}`
class TodoAddBar extends Component {
  constructor() {
    super()
    this.state = {
      task: ''
    }
  }

  handleSubmit = (event) => {
    let newTask = {
      id: this.props.totalTodos + 1,
      task: this.state.task,
      completeBy: today,
      isComplete: false,
      isCleared: false
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
    return <Form onSubmit={this.handleSubmit}>
        <Input type="text" value={this.state.task} placeholder={placeHolder} onChange={this.updateTask} />
        <Button color="primary" type="button" onClick={this.handleSubmit}>
          Add
        </Button>
      </Form>
  }
}

export default TodoAddBar