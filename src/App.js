import React, { Component } from 'react'
// import logo from './logo.svg'
import './App.css'
import logo from './todo.svg'
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

  updateTask = (item, newTask) => {
    let updatedList = this.state.todoList
    let index = updatedList.indexOf((item))
    updatedList[index].task = newTask
    this.setState({
      todoList: updatedList
    })
  }

  render() {
    const styles = {
      logo: {
        padding: 5,
        width: 40,
        height: 40
      },
      banner: {
        backgroundColor: 'rgb(0,191,255)'
      }
    }
    const {todoList} = this.state
    return (
      <div className="App">
        <header style={styles.banner}>
          <img src={logo} style={styles.logo} alt="logo" />
        </header>
        <TodoAddBar lastID={todoList[todoList.length-1].id} addToList={this.addToList} />
        <TodoList todoList={todoList}
                  toggleComplete={this.toggleComplete}
                  setCleared={this.setCleared}
                  updateTask={this.updateTask} />
      </div>
    )
  }
}

export default App;
