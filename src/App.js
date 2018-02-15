import React, { Component } from 'react'
// import logo from './logo.svg'
import './App.css'
import TodoAddBar from './TodoAddBar.js'
import TodoList from './TodoList.js'
import { Button } from 'reactstrap'
import getToday from './getToday.js'

class App extends Component {
  constructor() {
    super()
    this.state = {
      todoList: [
        { id: 1, task: 'Install Todo App', completeBy: getToday(), isComplete: false, isCleared: true },
        { id: 2, task: 'Finish Assignment 5', completeBy: getToday(), isComplete: false, isCleared: false }
      ]
    }
  }

  addToList = task => { //handleNewTodo???
    let toBeUpdatedList = this.state.todoList
    toBeUpdatedList.push(task)
    this.setState({
      todoList: toBeUpdatedList
    })
  }

  toggleComplete = item => { //handleCompleted???
    let toBeUpdatedList = this.state.todoList
    let index = toBeUpdatedList.indexOf((item))
    toBeUpdatedList[index].isComplete = !toBeUpdatedList[index].isComplete
    this.setState({
      todoList: toBeUpdatedList
    })
  }

  setCleared = item => { //handleCleared???
    let toBeUpdatedList = this.state.todoList
    let index = toBeUpdatedList.indexOf((item))
    toBeUpdatedList[index].isCleared = true
    this.setState({
      todoList: toBeUpdatedList
    })
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
          <h1 className="App-title">To Do App</h1>
        </header>
        <TodoAddBar totalTodos={this.state.todoList.length} addToList={this.addToList} />
        <TodoList todoList={this.state.todoList}
                  toggleComplete={this.toggleComplete}
                  setCleared={this.setCleared} />
      </div>
    )
  }
}

export default App;
