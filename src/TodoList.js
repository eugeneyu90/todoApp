import React, { Component } from 'react'

class TodoList extends Component {
  render() {
    const tasks = this.props.listArray
    let todoItems = tasks.map((todoItem) =>
      <TodoItem key={todoItem.task.toString()}
                item={todoItem}
                // task={todoItem.task}
                // checkBoxStatus={todoItem.isComplete}
                toggle={this.props.toggleComplete} />
        // <p>  {todoItem.task} <input type="checkbox" checked={todoItem.isComplete} onChange={this.updateCompletion} />
        // </p>
    )
    return (
      <div>
        {todoItems}
      </div>
    )
  }
}

class TodoItem extends Component {
  constructor(props) {
    super(props)
    const item = this.props.item
    this.state = {
      task: item.task,
      isComplete: item.isComplete,
      completeBy: item.completeBy
    }
  }

  toggleClick = (event) => {
    this.props.toggle()
    this.setState((prevState) => ({
      isComplete: !prevState.isComplete
    }))
  }
  

  render() {
    return (
      <div> 
        <span> {this.state.task} </span>
        <input type="checkbox" 
                checked={this.state.isComplete}
                onChange={this.toggleClick} />
      </div>
    )
  }
}


export default TodoList