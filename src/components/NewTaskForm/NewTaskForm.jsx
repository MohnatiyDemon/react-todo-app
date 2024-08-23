import PropTypes from 'prop-types'
import React from 'react'
import Header from '../Header/Header'
import TaskInput from '../TaskInput/TaskInput'
import './NewTaskForm.css'

export default class NewTaskForm extends React.Component {
  state = {
    task: '',
  }

  onInputChange = (event) => {
    this.setState({ task: event.target.value })
  }

  onKeyDown = (event) => {
    const { task } = this.state
    if (event.key === 'Enter' && task.trim()) {
      event.preventDefault()
      this.props.onItemAdded(task)
      this.setState({ task: '' })
    }
  }
  static propTypes = {
    onItemAdded: PropTypes.func.isRequired,
  }

  render() {
    return (
      <form className="header" onSubmit={(e) => e.preventDefault()}>
        <Header />
        <TaskInput value={this.state.task} onInputChange={this.onInputChange} onKeyDown={this.onKeyDown} />
      </form>
    )
  }
}
