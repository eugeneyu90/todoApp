import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import getToday from './getToday.js'

class TodoAddBar extends Component {
  constructor() {
    super()
    this.state = {
      task: ''
    }
  }

  handleSubmit = () => {
    let newTask = {
      id: this.props.lastID + 1,
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

    const styles = {
      flex: {
        display: 'flex'
      }
    }
    return (
      // <Form inline onSubmit={() => {return false}}>
      //   <FormGroup >
        <div style={styles.flex}>
            <Input type="text" value={this.state.task} placeholder={placeHolder} onChange={this.updateTask} onKeyDown={(event) => { if(event.keyCode === 13) { this.handleSubmit() }}}/>
            <Button color="primary" type="button" onClick={this.handleSubmit}>Add</Button>
        </div>
      //   </FormGroup>
      // </Form>
    )
  }
}

export default TodoAddBar