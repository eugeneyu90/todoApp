import React, { Component } from 'react'
import { Button, ButtonGroup, InputGroup, InputGroupAddon, InputGroupText, Input, Badge } from 'reactstrap'
// import 'font-awesome/css/font-awesome.min.css'


// TodoList + filter capabilities
class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // When no tasks are checked
      disableClear: this.props.todoList.every((item) => { return item.isComplete === false}),
      viewSelected: 'Active',
    }
  }

  clearCompleted = () => {
    // Goes through each item in todoList using map function and if item is checked as completed -> run setCleared function.
    this.props.todoList.map(item => (item.isComplete === true) ? this.props.setCleared(item) : console.log(`Todo ID: ${item.id} was not cleared.`) )
    this.setState({ 
      disableClear: true,
    })
  }

  onRadioBtnClick = (view) => {
    this.setState({
      viewSelected: view
    })
  }

  render() {
    const {todoList} = this.props

    let selectedList
    // Filter list into new array to be mapped
    this.state.viewSelected === 'Active' &&
      (selectedList = todoList.filter((item) => { return item.isCleared === false }))
    
    this.state.viewSelected === 'Completed' &&
      (selectedList = todoList.filter((item) => { return item.isCleared === true }))

    this.state.viewSelected === 'All' && 
      (selectedList = todoList) 
    
    const disableClear = selectedList.every((item) => { return item.isComplete === false || item.isCleared === true })
    const itemsToDisplay = selectedList.map((item) => 
      <Todo key={item.id}
            item={item}
            toggle={this.props.toggleComplete}
            checkCompleted={this.checkCompleted} />
    )
    return (
      <div>
        <ButtonGroup>
          <Button color="primary" onClick={() => this.onRadioBtnClick('Active')} active={this.state.viewSelected === 'Active'}>Active</Button>
          <Button color="primary" onClick={() => this.onRadioBtnClick('Completed')} active={this.state.viewSelected === 'Completed'}>Completed</Button>
          <Button color="primary" onClick={() => this.onRadioBtnClick('All')} active={this.state.viewSelected === 'All'}>All</Button>
        </ButtonGroup>
        <Button color="success" onClick={this.clearCompleted} disabled={disableClear || (this.state.viewSelected === 'Completed')}>Clear Completed</Button>
        {itemsToDisplay}
      </div>
    )
  }
}

// Individual Todo's
class Todo extends Component {

  toggleClick = () => {
    this.props.toggle(this.props.item)
  }

  render() {
    const { task, completeBy, isComplete, isCleared } = this.props.item
    const styles = {
      noGreyOut: {
        backgroundColor: 'white'
      },
      completed: {
        textDecoration: 'line-through',
        color: 'grey'
      }
    }
    // Conditional Rendering 
    const showClearMeMessage = isComplete && !isCleared ? 'Clear Me' : null
    const showLineThrough = isComplete ? styles.completed : null  
    // Include readOnly attribute with no change in styling
    return (
      <div>
        <InputGroup >
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <Input addon type="checkbox" checked={isComplete} onChange={this.toggleClick} />
            </InputGroupText>
          </InputGroupAddon>
          <Input readOnly={true} style={{...styles.noGreyOut, ...showLineThrough}} type="text" value={`${task} by ${completeBy}`} />
          <InputGroupAddon addonType="append">{showClearMeMessage}</InputGroupAddon>
          <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
        </InputGroup>
      </div>
    )
      // <span>
      //   {task} by {completeBy}
      // </span>
      // <input type="checkbox" checked={isComplete} onChange={this.toggleClick} />
  }
}


export default TodoList