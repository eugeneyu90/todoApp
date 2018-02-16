import React, { Component } from 'react'
import { Button, ButtonGroup, InputGroup, InputGroupAddon, InputGroupText, Input, Badge, ButtonToolbar } from 'reactstrap'
// import 'font-awesome/css/font-awesome.min.css'


// TodoList + filter capabilities
class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // When no tasks are checked
      disableClear: this.props.todoList.every((item) => { return item.isComplete === false}),
      viewSelected: 'Active',
    }
  }

  clearCompleted = () => {
    // Goes through each item in todoList using map function and if item is checked as completed -> run setCleared function.
    this.props.todoList.map(item => (item.isComplete === true) ? this.props.setCleared(item) : console.log(`Todo ID: ${item.id} was not cleared.`) )
    this.setState({ 
      disableClear: true,
    })
  }

  onRadioBtnClick = (view) => {
    this.setState({
      viewSelected: view
    })
  }

  render() {
    const { todoList } = this.props
    const { viewSelected } = this.state
    let selectedList
    // Filter list into new array to be mapped
    viewSelected === 'Active' &&
      (selectedList = todoList.filter((item) => { return item.isCleared === false }))
    
    viewSelected === 'Completed' &&
      (selectedList = todoList.filter((item) => { return item.isCleared === true }))

    viewSelected === 'All' && 
      (selectedList = todoList) 
    
    const disableClear = selectedList.every((item) => { return item.isComplete === false || item.isCleared === true })
    const activeNum = todoList.reduce((acc, cur) => { return acc + !cur.isCleared }, 0)
    const completedNum = todoList.reduce((acc, cur) => { return acc + cur.isComplete }, 0)
    const itemsToDisplay = selectedList.map((item) => 
      <Todo key={item.id}
            item={item}
            toggle={this.props.toggleComplete}
            checkCompleted={this.checkCompleted} />
    )
    const styles = {
      inlineBlock: {
        display: 'inline-block'
      }
    }
    return <div>
        <ButtonToolbar>
          <ButtonGroup className={'btn-group-justified'} style={styles.inlineBlock}>
            <Button href="#" color="primary" onClick={() => this.onRadioBtnClick('Active')} active={viewSelected === 'Active'}>
              Active <Badge color="secondary">{activeNum}</Badge>
            </Button>
            <Button href="#" color="primary" onClick={() => this.onRadioBtnClick('Completed')} active={viewSelected === 'Completed'}>
              Completed <Badge color="secondary">{completedNum}</Badge>
            </Button>
            <Button href="#" color="primary" onClick={() => this.onRadioBtnClick('All')} active={viewSelected === 'All'}>
              All <Badge color="secondary">{todoList.length}</Badge>
            </Button>
            <Button href="#" color="success" onClick={this.clearCompleted} disabled={disableClear || viewSelected === 'Completed'}>
              Clear Completed
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
        {itemsToDisplay}
      </div>
  }
}

// Individual Todo's
class Todo extends Component {

  toggleClick = () => {
    this.props.toggle(this.props.item)
  }

  render() {
    const { task, completeBy, isComplete, isCleared } = this.props.item
    const styles = {
      noGreyOut: {
        backgroundColor: 'white'
      },
      completed: {
        textDecoration: 'line-through',
        color: 'grey'
      }
    }
    // Conditional Rendering 
    const showClearMeMessage = isComplete && !isCleared ? 'Clear Me' : null
    const showLineThrough = isComplete ? styles.completed : null  
    // Include readOnly attribute with no change in styling
    return (
      <div>
        <InputGroup >
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <Input addon type="checkbox" checked={isComplete} onChange={this.toggleClick} />
            </InputGroupText>
          </InputGroupAddon>
          <Input readOnly={true} style={{...styles.noGreyOut, ...showLineThrough}} type="text" value={`${task} by ${completeBy}`} />
          <InputGroupAddon addonType="append">{showClearMeMessage}</InputGroupAddon>
          <Button><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span></Button>
        </InputGroup>
      </div>
    )
      // <span>
      //   {task} by {completeBy}
      // </span>
      // <input type="checkbox" checked={isComplete} onChange={this.toggleClick} />
  }
}


export default TodoList