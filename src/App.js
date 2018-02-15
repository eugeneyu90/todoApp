import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Todo from './Todo.js'
import TodoList from './TodoList.js'

const d = new Date()
const today = `${d.getMonth()}-${d.getDay()}-${d.getFullYear()}`
console.log(today)

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
        <Todo totalTodos={this.state.todoList.length} addToList={this.addToList} />
        <TodoList todoList={this.state.todoList}
                  toggleComplete={this.toggleComplete} />
      </div>
    )
  }
}

export default App;
