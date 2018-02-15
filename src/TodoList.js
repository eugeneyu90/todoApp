import React, { Component } from 'react'
import { Button, ButtonGroup } from 'reactstrap'

// TodoList + filter capabilities
class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // When no tasks are checked
      disableClear: this.props.todoList.every((item) => { return item.isComplete === false }),
      viewSelected: 'Active',
    }
  }

  clearCompleted = () => {
    this.props.todoList.map(item => (item.isComplete === true) ? this.props.setCleared(item) : console.log(`Todo ID: ${item.id} was not clear.`) )
    this.setState({ 
      disableClear: true,
    })
  }

  checkCompleted = () => {
    this.setState({
      disableClear: this.props.todoList.every((item) => { return item.isComplete === false })
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
    //Enable Filter
    {this.state.viewSelected === 'Active' &&
      (selectedList = todoList.filter((item) => { return item.isCleared === false }))}
    
    {this.state.viewSelected === 'Completed' && 
      (selectedList = todoList.filter((item) => { return item.isCleared === true }))}

    {this.state.viewSelected === 'All' && 
      (selectedList = todoList)}
    
    const itemsToDisplay = selectedList.map((todoItem) =>
      <Todo key={todoItem.id}
            item={todoItem}
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
        <Button color="success" onClick={this.clearCompleted} disabled={this.state.disableClear}>Clear</Button>
        {itemsToDisplay}
      </div>
    )
  }
}

// Individual Todo's
class Todo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isComplete: this.props.item.isComplete
    }
  }

  toggleClick = () => {
    this.props.toggle(this.props.item)
    this.props.checkCompleted()
    this.setState((prevState) => ({
      isComplete: !prevState.isComplete
    }))
  }
  

  render() {
    const { task, completeBy, isComplete } = this.props.item
    return (
      <div> 
        <span> {task} by {completeBy}</span>
        <input type="checkbox" 
                checked={isComplete}
                onChange={this.toggleClick} />
      </div>
    )
  }
}


export default TodoList