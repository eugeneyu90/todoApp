import React, { Component } from 'react'
// import logo from './logo.svg'
import './App.css'
import TodoAddBar from './TodoAddBar.js'
import TodoList from './TodoList.js'
import getToday from './getToday.js'


class App extends Component {
  constructor() {
    super()
    this.state = {
      todoList: [
        { id: 1, task: 'Install Todo App', completeBy: getToday(), isComplete: false, isCleared: false },
        { id: 2, task: 'Finish Assignment 5', completeBy: getToday(), isComplete: false, isCleared: false }
      ]
    }
  }

  addToList = task => { //handleNewTodo???
    // let updatedList = this.state.todoList
    // updatedList.push(task)
    this.setState({
      //todoList: updatedList
      todoList: this.state.todoList.concat(task) // Using concat to clean code. 
    })
  }

  toggleComplete = item => { //handleCompleted???
    let updatedList = this.state.todoList
    let index = updatedList.indexOf((item))
    updatedList[index].isComplete = !updatedList[index].isComplete
    this.setState({
      todoList: updatedList
    })
  }

  setCleared = item => { //handleCleared???
    let updatedList = this.state.todoList
    let index = updatedList.indexOf((item))
    updatedList[index].isCleared = true
    this.setState({
      todoList: updatedList
    })
  }

  changeTask = item => {

  }

  render() {
    const {todoList} = this.state
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">To Do App</h1>
        </header>
        <TodoAddBar lastID={todoList[todoList.length-1].id} addToList={this.addToList} />
        <TodoList todoList={todoList}
                  toggleComplete={this.toggleComplete}
                  setCleared={this.setCleared} />
      </div>
    )
  }
}

export default App;
