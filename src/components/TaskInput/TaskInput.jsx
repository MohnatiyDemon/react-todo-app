import PropTypes from 'prop-types'
import React from 'react'
import './TaskInput.css'

class TaskInput extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onInputChange: PropTypes.func.isRequired,
  }
  render() {
    const { value, onInputChange } = this.props
    return (
      <input
        className="new-todo"
        name="text"
        type="text"
        placeholder="What needs to be done?"
        value={value}
        onChange={onInputChange}
        required
        minLength="1"
      ></input>
    )
  }
}

export default TaskInput
