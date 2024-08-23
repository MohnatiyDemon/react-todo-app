import PropTypes from 'prop-types'
import React from 'react'
import './TaskInput.css'

class TaskInput extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onInputChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func.isRequired,
  }
  render() {
    const { value, onInputChange, onKeyDown } = this.props
    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={value}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
      ></input>
    )
  }
}

export default TaskInput
