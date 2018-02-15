import React, { Component } from 'react'

class TodoList extends Component {
  render() {
    const tasks = this.props.todoList
    let todoItems = tasks.map((todoItem) =>
      <Todo key={todoItem.id}
                item={todoItem}
                toggle={this.props.toggleComplete} />
    )
    return (
      <div>
        {todoItems}
      </div>
    )
  }
}

class Todo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isComplete: this.props.item.isComplete
    }
  }

  toggleClick = () => {
    this.props.toggle(this.props.item)
    this.setState((prevState) => ({
      isComplete: !prevState.isComplete
    }))
  }
  

  render() {
    const {task, isComplete, completeBy} = this.props.item
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