import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import getToday from './getToday.js'

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
      completeBy: getToday(),
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
    return <Form inline onSubmit={this.handleSubmit}>
        <FormGroup >
            <Input type="text" value={this.state.task} placeholder={placeHolder} onChange={this.updateTask} />
            <Button color="primary" type="button" onClick={this.handleSubmit}>
              Add
            </Button>
        </FormGroup>
      </Form>
  }
}

export default TodoAddBar