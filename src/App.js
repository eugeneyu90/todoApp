import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Todo from './Todo.js'
import TodoList from './TodoList.js'


class App extends Component {
  constructor() {
    super()
    this.state = {
      todoList: []
    }
  }

  addToList = task => {
    let toBeUpdatedList = this.state.todoList
    toBeUpdatedList.push(task)

    this.setState({
      todoList: toBeUpdatedList
    })
  }

  toggleComplete = checkBoxToggle => {
    
  }


  // updateIsComplete = index => {
  //   let toBeUpdatedList = this.state.todoList
  //   this.setState(prevState => ({
  //     toBeUpdatedList[index].isComplete: !prevState.isComplete
  //   }))
  // }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">To Do App</h1>
        </header>
        <Todo addNewTask={this.addToList} />
        <TodoList listArray={this.state.todoList}
                  toggleComplete={this.toggleComplete} />
      </div>
    )
  }
}

export default App;
