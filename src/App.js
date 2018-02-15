import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import TodoAddBar from './TodoAddBar.js'
import TodoList from './TodoList.js'

const d = new Date()
var month = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December'
}
const today = `${month[d.getMonth()]} ${d.getDay()}, ${d.getFullYear()}`

// class TodoApp extends Component {
//   constructor() {
//     super()
//     const { todoList, addToList } = this.props
//   }
//   render() {
//     let {allTasks} = this.props
//     return (
//       <div>
//         <Todo addToList={this.addToList} />
//         <TodoList todoList={this.todoList}
//                   toggleComplete={this.toggleComplete} />
//       </div>
//     )
//   }
// }



class App extends Component {
  constructor() {
    super()
    this.state = {
      todoList: [
        { id: 1, task: 'Install Todo App', completeBy: today, isComplete: false }
      ]
    }
  }

  addToList = task => {
    let toBeUpdatedList = this.state.todoList
    toBeUpdatedList.push(task)
    this.setState({
      todoList: toBeUpdatedList
    })
  }

  toggleComplete = item => {
    let toBeUpdatedList = this.state.todoList
    let index = toBeUpdatedList.indexOf((item))
    toBeUpdatedList[index].isComplete = !toBeUpdatedList[index].isComplete
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
                  toggleComplete={this.toggleComplete} />
      </div>
    )
  }
}

export default App;
