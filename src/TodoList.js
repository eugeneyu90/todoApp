import React, { Component } from 'react'

// TodoList + filter capabilities
class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // When no tasks are checked
      disableClear: this.props.todoList.every((item) => { return item.isComplete === false }),
      viewOnlyActive: true,
      viewOnlyCompleteCleared: false,
      viewAll: false,
      displayedList: this.props.todoList
    }
  }

  clearCompleted = () => {
    this.props.todoList.map(item => (item.isComplete === true) ? this.props.toggleCleared(item) : console.log(`Todo ID: ${item.id} was not checked.`) )
    this.setState({ 
      disableClear: true,
    })
    // this.updatedDisplayedList()
  }

  checkCompleted = () => {
    this.setState({
      disableClear: this.props.todoList.every((item) => { return item.isComplete === false })
    }) 
  }

  // updatedDisplayedList = () => {
  //   if(this.state.viewOnlyActive) {
  //     this.setState({
  //       displayedList: this.props.todoList.filter((item) => { return item.isCleared === false })
  //     })
  //   } else if(this.state.viewOnlyCompleteCleared) {
  //     this.setState({
  //       displayedList: this.props.todoList.filter((item) => { return item.isCleared === true })
  //     })
  //   } else if (this.state.viewAll) {
  //     this.setState({
  //       displayedList: this.props.todoList
  //     })
  //   }
  // }

  render() {
    const allTasks = this.props.todoList
    const activeList = allTasks.filter((item) => { return item.isCleared === false })
    // const clearedList = allTasks.filter((item) => { item.isCleared === true })
    // const itemsToDisplay = this.state.displayedList.map((todoItem) =>
    const itemsToDisplay = activeList.map((todoItem) =>
      <Todo key={todoItem.id}
            item={todoItem}
            toggle={this.props.toggleComplete}
            checkCompleted={this.checkCompleted} />
    )
    return (
      <div>
        <button type="button" onClick={this.clearCompleted} disabled={this.state.disableClear}>Clear</button>
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