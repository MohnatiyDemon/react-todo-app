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

  onSubmit = (event) => {
    event.preventDefault()
    const { task } = this.state

    if (task.trim()) {
      this.props.onItemAdded(task)
      this.setState({ task: '' })
    }
  }
  static propTypes = {
    onItemAdded: PropTypes.func.isRequired,
  }

  render() {
    return (
      <form className="header" onSubmit={this.onSubmit}>
        <Header />
        <TaskInput value={this.state.task} onInputChange={this.onInputChange} />
      </form>
    )
  }
}
