import PropTypes from 'prop-types'
import React from 'react'
import Header from '../Header/Header'
import TaskInput from '../TaskInput/TaskInput'
import './NewTaskForm.css'

export default class NewTaskForm extends React.Component {
  state = {
    task: '',
    minutes: '',
    seconds: '',
  }

  onInputChange = (event) => {
    this.setState({ task: event.target.value })
  }

  onMinutesChange = (e) => {
    const value = e.target.value
    this.setState({ minutes: value === '' ? 0 : value })
  }

  onSecondsChange = (e) => {
    const value = e.target.value
    this.setState({ seconds: value === '' ? 0 : value })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { task, minutes, seconds } = this.state

    if (!task.trim()) {
      return
    }
    this.props.onItemAdded(task, minutes, seconds)
    this.setState({ task: '', minutes: '', seconds: '' })
  }

  static propTypes = {
    onItemAdded: PropTypes.func.isRequired,
  }

  render() {
    const { task, minutes, seconds } = this.state
    return (
      <form className="header new-todo-form" onSubmit={this.onSubmit}>
        <Header />
        <TaskInput
          value={task}
          minutes={minutes}
          seconds={seconds}
          onInputChange={this.onInputChange}
          onMinutesChange={this.onMinutesChange}
          onSecondsChange={this.onSecondsChange}
        />
        <button type="submit"></button>
      </form>
    )
  }
}
