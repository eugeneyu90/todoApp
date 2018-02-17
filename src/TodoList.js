import React, { Component } from 'react'
import { Button, ButtonGroup, InputGroup, InputGroupAddon, InputGroupText, Input, Badge, ButtonToolbar, Tooltip } from 'reactstrap'


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
    this.props.todoList.map(item => (item.isComplete === true) ? this.props.setCleared(item) : null)
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
    (selectedList = todoList.filter((item) => { return item.isCleared === true || item.isComplete === true }))    

    viewSelected === 'All' && 
      (selectedList = todoList) 
    
    const disableClear = selectedList.every((item) => { return item.isComplete === false || item.isCleared === true })
    const activeNum = todoList.reduce((acc, cur) => { return acc + !cur.isCleared }, 0)
    const completedNum = todoList.reduce((acc, cur) => { return acc + (cur.isComplete && cur.isCleared) }, 0)
    // const completedNum = todoList.reduce((acc, cur) => { return acc + cur.isComplete}, 0)
    const itemsToDisplay = selectedList.map((item) => 
      <Todo key={item.id}
            item={item}
            toggle={this.props.toggleComplete}
            checkCompleted={this.checkCompleted}
            updateTask={this.props.updateTask} />
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
  constructor(props) {
    super(props)
    this.state = {
      // showClearHint: (this.props.item.isComplete && !this.props.item.isCleared)
      editOn: false,
      task: this.props.item.task
    }
  }

  toggleClick = () => {
    this.props.toggle(this.props.item)
    // this.setState({
    //   showClearHint: (this.props.item.isComplete && !this.props.item.isCleared)
    // })
  }

  enableEdit = () => {
    this.setState({
      editOn: !this.state.editOn
    })
  }

  updateTask = (event) => {
    this.setState({
      task: event.target.value
    })
    this.props.updateTask(this.props.item, event.target.value)
  }

  render() {
    const { id, isComplete, isCleared } = this.props.item
    const styles = {
      // Include readOnly attribute with no change in styling
      noGreyOut: {
        backgroundColor: 'white'
      },
      alignTextBottom: {
        verticalAlign: 'bottom',
        textAlign: 'bottom'
      },
      clearHint: {
        color: 'darkblue',
        backgroundColor: 'lightblue',

      },
      completed: {
        textDecoration: 'line-through',
        color: 'grey'
      },
      clearableTooltipOffset: {
        marginRight: 25,
        verticalAlign: 'bottom'
      },
      canEdit: {
        color: 'black',
        backgroundColor: '#7bdcb5'
      },
      cannotEdit: {
        color: 'darkgray'
      },
      transparentButton: {
        backgroundColor: 'transparent',
        borderColor: 'transparent' 
      },
      checked: {
        color: 'lightgreen'
      },
      unchecked: {
        color: 'grey'
      }
    }
    // Conditional Rendering 
    // const showClearMeMessage = isComplete && !isCleared ? 'Clear Me' : false
    const showLineThrough = isComplete ? styles.completed : false 
    const editOrNot = this.state.editOn ? styles.canEdit : styles.cannotEdit
    const showClearHint = isComplete && !isCleared

    return (
      <div>
        <InputGroup>
          <Button style={styles.transparentButton} type="button" onClick={this.toggleClick}>
            <span className="glyphicon glyphicon-ok" style={isComplete ? styles.checked : styles.unchecked} aria-hidden="true"></span>
          </Button>
          <Input id={`item${id}`} readOnly={!this.state.editOn} style={{...styles.noGreyOut, ...showLineThrough, ...editOrNot}} type="text" value={this.state.task} onChange={this.updateTask}/>
          <Tooltip style={styles.clearableTooltipOffset} placement="left" isOpen={showClearHint} target={`item${id}`}>
            Clearable
          </Tooltip>
          <Button style={styles.transparentButton} onClick={this.enableEdit}>
            <span className="glyphicon glyphicon-pencil" style={this.state.editOn ? styles.checked : styles.unchecked} aria-hidden="true" ></span>
          </Button>
        </InputGroup>
      </div>
    )
  }
}


export default TodoList